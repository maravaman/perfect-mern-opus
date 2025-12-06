import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string | null;
  category: string | null;
  active: boolean | null;
  display_order: number | null;
}

const JOB_CATEGORIES = [
  "Marketing",
  "Development",
  "Design",
  "Content",
  "Sales",
  "Operations",
  "HR",
  "Finance",
  "General",
];

const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Full Time / Part Time",
  "Full Time / Freelance",
  "Freelance",
  "Contract",
  "Internship",
];

export function CareerOpeningsTab() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Full Time",
    location: "",
    experience: "",
    description: "",
    category: "General",
    active: true,
  });

  const { data: jobOpenings, isLoading } = useQuery({
    queryKey: ["job-openings-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as JobOpening[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const maxOrder = jobOpenings?.reduce((max, j) => Math.max(max, j.display_order || 0), 0) || 0;
      const { error } = await supabase.from("job_openings").insert({
        ...data,
        display_order: maxOrder + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-openings-admin"] });
      toast.success("Job opening created successfully");
      resetForm();
    },
    onError: () => toast.error("Failed to create job opening"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("job_openings").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-openings-admin"] });
      toast.success("Job opening updated successfully");
      resetForm();
    },
    onError: () => toast.error("Failed to update job opening"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_openings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-openings-admin"] });
      toast.success("Job opening deleted successfully");
    },
    onError: () => toast.error("Failed to delete job opening"),
  });

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Full Time",
      location: "",
      experience: "",
      description: "",
      category: "General",
      active: true,
    });
    setEditingJob(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (job: JobOpening) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      type: job.type,
      location: job.location,
      experience: job.experience,
      description: job.description || "",
      category: job.category || "General",
      active: job.active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const groupedJobs = jobOpenings?.reduce((acc, job) => {
    const category = job.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(job);
    return acc;
  }, {} as Record<string, JobOpening[]>);

  if (isLoading) {
    return <div className="text-center py-8">Loading job openings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Career Openings</h2>
          <p className="text-muted-foreground">Manage job openings displayed on the Career page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Job Opening
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job Opening" : "Add New Job Opening"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Digital Marketing Executive"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Hyderabad / Remote"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience Required *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 1-3 years"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and requirements..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="active">Active (visible on Career page)</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingJob ? "Update" : "Create"} Job Opening
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!jobOpenings?.length ? (
        <Card className="p-8 text-center">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No job openings yet. Add your first job opening!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedJobs || {}).map(([category, jobs]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} className={`p-4 ${!job.active ? "opacity-60" : ""}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          {!job.active && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">Inactive</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {job.type}
                          </span>
                          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                            {job.location}
                          </span>
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                            {job.experience}
                          </span>
                        </div>
                        {job.description && (
                          <p className="text-sm text-muted-foreground">{job.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Delete this job opening?")) {
                              deleteMutation.mutate(job.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
