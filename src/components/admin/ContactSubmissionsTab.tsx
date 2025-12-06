import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactSubmissionsTab() {
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["contact-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .not("subject", "like", "Career Application:%")
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
      queryClient.invalidateQueries({ queryKey: ["contact-inquiries"] });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const exportToCSV = () => {
    if (!submissions || submissions.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Subject", "Message", "Status", "Date"];
    const csvRows = [
      headers.join(","),
      ...submissions.map(s => [
        `"${s.name?.replace(/"/g, '""') || ''}"`,
        `"${s.email?.replace(/"/g, '""') || ''}"`,
        `"${s.phone?.replace(/"/g, '""') || 'N/A'}"`,
        `"${s.subject?.replace(/"/g, '""') || ''}"`,
        `"${s.message?.replace(/"/g, '""').replace(/\n/g, ' ') || ''}"`,
        `"${s.status || 'new'}"`,
        `"${s.created_at ? new Date(s.created_at).toLocaleDateString() : ''}"`
      ].join(","))
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`);
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contact Inquiries</h2>
          <p className="text-muted-foreground text-sm">{submissions?.length || 0} total submissions</p>
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
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.phone || "N/A"}</TableCell>
                <TableCell>{submission.subject}</TableCell>
                <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                <TableCell>
                  <Select
                    value={submission.status || 'new'}
                    onValueChange={(value) => updateStatusMutation.mutate({ id: submission.id, status: value })}
                  >
                    <SelectTrigger className="w-24 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(submission.created_at!).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
            {!submissions?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No inquiries yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}