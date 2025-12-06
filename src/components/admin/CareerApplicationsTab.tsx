import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Loader2, ExternalLink, Download } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function CareerApplicationsTab() {
  const queryClient = useQueryClient();

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

  const exportToCSV = () => {
    if (!applications || applications.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Position", "Experience", "Cover Letter", "Resume URL", "Status", "Date"];
    const csvRows = [
      headers.join(","),
      ...applications.map(app => {
        const parsed = parseMessage(app.message);
        return [
          `"${app.name?.replace(/"/g, '""') || ''}"`,
          `"${app.email?.replace(/"/g, '""') || ''}"`,
          `"${app.phone?.replace(/"/g, '""') || 'N/A'}"`,
          `"${(parsed.position || app.subject.replace('Career Application:', '').trim()).replace(/"/g, '""')}"`,
          `"${parsed.experience?.replace(/"/g, '""') || 'N/A'}"`,
          `"${parsed.coverLetter?.replace(/"/g, '""').replace(/\n/g, ' ') || ''}"`,
          `"${parsed.resumeUrl || 'N/A'}"`,
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
    toast.success("Exported successfully!");
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
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>
      
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
                      <a 
                        href={parsed.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
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
                              <a 
                                href={parsed.resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Download Resume
                              </a>
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