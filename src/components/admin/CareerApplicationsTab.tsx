import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Loader2, Eye, Download, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function CareerApplicationsTab() {
  const queryClient = useQueryClient();
  const [loadingResume, setLoadingResume] = useState<string | null>(null);
  const [resumeViewerUrl, setResumeViewerUrl] = useState<string | null>(null);
  const [resumeViewerOpen, setResumeViewerOpen] = useState(false);
  const [downloadingResumes, setDownloadingResumes] = useState(false);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["career-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .like("subject", "Career Application:%")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career-applications"] });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // Parse the message to extract position, experience, cover letter, and resume URL
  const parseMessage = (message: string) => {
    const lines = message.split('\n');
    let position = '';
    let experience = '';
    let coverLetter = '';
    let resumeUrl = '';

    lines.forEach(line => {
      if (line.startsWith('Position:')) {
        position = line.replace('Position:', '').trim();
      } else if (line.startsWith('Experience:')) {
        experience = line.replace('Experience:', '').trim();
      } else if (line.startsWith('Resume:')) {
        resumeUrl = line.replace('Resume:', '').trim();
      } else if (line.trim() && !line.startsWith('Position:') && !line.startsWith('Experience:') && !line.startsWith('Resume:')) {
        coverLetter += line + '\n';
      }
    });

    return { position, experience, coverLetter: coverLetter.trim(), resumeUrl };
  };

  // Extract file path from storage URL or direct path
  const extractFilePath = (url: string): string | null => {
    try {
      // If it's a full URL, extract the path after the bucket name
      if (url.includes('knight21-uploads/')) {
        const match = url.match(/knight21-uploads\/(.+)$/);
        return match ? match[1] : null;
      }
      // If it's just a file path (e.g., "resumes/filename.pdf"), return as is
      if (url.startsWith('resumes/')) {
        return url;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Get signed URL for secure resume access
  const getSignedUrl = async (resumeUrl: string): Promise<string | null> => {
    const filePath = extractFilePath(resumeUrl);
    if (!filePath) {
      toast.error("Invalid resume URL");
      return null;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.access_token) {
        toast.error("Please log in to view resumes");
        return null;
      }

      const response = await supabase.functions.invoke('get-signed-url', {
        body: { filePath, bucket: 'knight21-uploads' }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to get signed URL');
      }

      return response.data?.signedUrl || null;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      toast.error("Failed to access resume. Please try again.");
      return null;
    }
  };

  // Open resume in embedded viewer
  const handleViewResume = async (resumeUrl: string) => {
    setLoadingResume(resumeUrl);
    try {
      const signedUrl = await getSignedUrl(resumeUrl);
      if (signedUrl) {
        setResumeViewerUrl(signedUrl);
        setResumeViewerOpen(true);
      }
    } finally {
      setLoadingResume(null);
    }
  };

  // Download a single resume using edge function
  const handleDownloadResume = async (resumeUrl: string, applicantName: string) => {
    const filePath = extractFilePath(resumeUrl);
    if (!filePath) {
      toast.error("Invalid resume URL");
      return;
    }

    setLoadingResume(resumeUrl);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.access_token) {
        toast.error("Please log in to download resumes");
        return;
      }

      // Use edge function to download the file directly
      const response = await supabase.functions.invoke('get-signed-url', {
        body: { filePath, bucket: 'knight21-uploads', download: true }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to download resume');
      }

      // The response.data is a Blob when download: true
      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Resume_${applicantName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success("Resume downloaded successfully");
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setLoadingResume(null);
    }
  };

  // Export CSV with embedded resume download links
  const exportToCSV = async () => {
    if (!applications || applications.length === 0) {
      toast.error("No data to export");
      return;
    }

    setDownloadingResumes(true);
    toast.info("Generating CSV with secure resume links...");

    try {
      // Generate signed URLs for all resumes
      const applicationsWithSignedUrls = await Promise.all(
        applications.map(async (app) => {
          const parsed = parseMessage(app.message);
          let signedResumeUrl = 'N/A';
          
          if (parsed.resumeUrl && parsed.resumeUrl !== 'Not provided') {
            const signedUrl = await getSignedUrl(parsed.resumeUrl);
            if (signedUrl) {
              signedResumeUrl = signedUrl;
            }
          }
          
          return { ...app, parsed, signedResumeUrl };
        })
      );

      const headers = ["Name", "Email", "Phone", "Position", "Experience", "Cover Letter", "Resume Download Link", "Status", "Date"];
      const csvRows = [
        headers.join(","),
        ...applicationsWithSignedUrls.map(app => {
          return [
            `"${app.name?.replace(/"/g, '""') || ''}"`,
            `"${app.email?.replace(/"/g, '""') || ''}"`,
            `"${app.phone?.replace(/"/g, '""') || 'N/A'}"`,
            `"${(app.parsed.position || app.subject.replace('Career Application:', '').trim()).replace(/"/g, '""')}"`,
            `"${app.parsed.experience?.replace(/"/g, '""') || 'N/A'}"`,
            `"${app.parsed.coverLetter?.replace(/"/g, '""').replace(/\n/g, ' ') || ''}"`,
            `"${app.signedResumeUrl}"`,
            `"${app.status || 'new'}"`,
            `"${app.created_at ? new Date(app.created_at).toLocaleDateString() : ''}"`
          ].join(",");
        })
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `career_applications_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Exported successfully! Resume links are valid for 1 hour.");
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error("Failed to export CSV");
    } finally {
      setDownloadingResumes(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Career Applications</h2>
          <p className="text-muted-foreground text-sm">{applications?.length || 0} total applications</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2" disabled={downloadingResumes}>
          {downloadingResumes ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export CSV
        </Button>
      </div>
      
      {/* Resume Viewer Dialog */}
      <Dialog open={resumeViewerOpen} onOpenChange={setResumeViewerOpen}>
        <DialogContent className="max-w-5xl h-[85vh] bg-white p-0">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume Viewer
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setResumeViewerOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          <div className="flex-1 h-full p-0">
            {resumeViewerUrl && (
              <iframe
                src={resumeViewerUrl}
                className="w-full h-[calc(85vh-80px)] border-0"
                title="Resume Viewer"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((application) => {
              const parsed = parseMessage(application.message);
              return (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{application.phone || "N/A"}</TableCell>
                  <TableCell>{parsed.position || application.subject.replace('Career Application:', '').trim()}</TableCell>
                  <TableCell>{parsed.experience || "N/A"}</TableCell>
                  <TableCell>
                    {parsed.resumeUrl && parsed.resumeUrl !== 'Not provided' ? (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary"
                          onClick={() => handleViewResume(parsed.resumeUrl)}
                          disabled={loadingResume === parsed.resumeUrl}
                          title="View Resume"
                        >
                          {loadingResume === parsed.resumeUrl ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary"
                          onClick={() => handleDownloadResume(parsed.resumeUrl, application.name)}
                          disabled={loadingResume === parsed.resumeUrl}
                          title="Download Resume"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={application.status || 'new'}
                      onValueChange={(value) => updateStatusMutation.mutate({ id: application.id, status: value })}
                    >
                      <SelectTrigger className={`w-28 ${getStatusBadgeColor(application.status || 'new')}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(application.created_at!).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-white">
                        <DialogHeader>
                          <DialogTitle>Application Details - {application.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                              <p className="font-medium">{application.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Email</p>
                              <p>{application.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Phone</p>
                              <p>{application.phone || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Position Applied</p>
                              <p>{parsed.position || application.subject.replace('Career Application:', '').trim()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Experience</p>
                              <p>{parsed.experience || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Applied On</p>
                              <p>{new Date(application.created_at!).toLocaleString()}</p>
                            </div>
                          </div>
                          
                          {parsed.coverLetter && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Cover Letter / Message</p>
                              <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                                {parsed.coverLetter}
                              </div>
                            </div>
                          )}

                          {parsed.resumeUrl && parsed.resumeUrl !== 'Not provided' && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Resume</p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="inline-flex items-center gap-2"
                                  onClick={() => handleViewResume(parsed.resumeUrl)}
                                  disabled={loadingResume === parsed.resumeUrl}
                                >
                                  {loadingResume === parsed.resumeUrl ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4" />
                                      View Resume
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="inline-flex items-center gap-2"
                                  onClick={() => handleDownloadResume(parsed.resumeUrl, application.name)}
                                  disabled={loadingResume === parsed.resumeUrl}
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
            {!applications?.length && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  No career applications yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}