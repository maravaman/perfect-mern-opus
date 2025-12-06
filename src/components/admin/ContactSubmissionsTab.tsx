import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Filter } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  "General Inquiry": "bg-gray-100 text-gray-700",
  "Course Enrollment": "bg-blue-100 text-blue-700",
  "Website Development": "bg-purple-100 text-purple-700",
  "Digital Marketing Services": "bg-pink-100 text-pink-700",
  "App Development": "bg-green-100 text-green-700",
  "CA / Business Services": "bg-orange-100 text-orange-700",
  "Partnership / Collaboration": "bg-cyan-100 text-cyan-700",
  "Support / Help": "bg-red-100 text-red-700",
  "Contact Form Submission": "bg-gray-100 text-gray-700",
};

export function ContactSubmissionsTab() {
  const queryClient = useQueryClient();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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

  // Get unique categories for filter
  const categories = Array.from(new Set(submissions?.map(s => s.subject) || []));
  
  // Filter submissions by category
  const filteredSubmissions = categoryFilter === "all" 
    ? submissions 
    : submissions?.filter(s => s.subject === categoryFilter);

  const exportToCSV = () => {
    if (!filteredSubmissions || filteredSubmissions.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Category", "Message", "Status", "Date"];
    const csvRows = [
      headers.join(","),
      ...filteredSubmissions.map(s => [
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Contact Inquiries</h2>
          <p className="text-muted-foreground text-sm">
            {filteredSubmissions?.length || 0} of {submissions?.length || 0} submissions
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.slice(0, 6).map((cat) => {
          const count = submissions?.filter(s => s.subject === cat).length || 0;
          const colorClass = categoryColors[cat] || "bg-gray-100 text-gray-700";
          return (
            <Card 
              key={cat} 
              className={`p-3 cursor-pointer transition-all hover:shadow-md ${categoryFilter === cat ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setCategoryFilter(categoryFilter === cat ? "all" : cat)}
            >
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground truncate">{cat}</p>
            </Card>
          );
        })}
      </div>
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions?.map((submission) => {
              const colorClass = categoryColors[submission.subject] || "bg-gray-100 text-gray-700";
              return (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone || "N/A"}</TableCell>
                  <TableCell>
                    <Badge className={`${colorClass} border-0`}>
                      {submission.subject}
                    </Badge>
                  </TableCell>
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
              );
            })}
            {!filteredSubmissions?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No inquiries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}