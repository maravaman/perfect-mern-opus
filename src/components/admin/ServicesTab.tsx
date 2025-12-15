import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, Loader2, Upload, X, Code, TrendingUp, FileText, Smartphone, Globe, Palette, Users, ShoppingCart, GraduationCap, Megaphone } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Service categories with their icons
const SERVICE_CATEGORIES = [
  { value: "App & Software Development", label: "App & Software Development", icon: Code },
  { value: "Digital Marketing", label: "Digital Marketing", icon: TrendingUp },
  { value: "Business Certificates", label: "Business Certificates", icon: FileText },
  { value: "Web Development", label: "Web Development", icon: Globe },
  { value: "Design Services", label: "Design Services", icon: Palette },
  { value: "Social Media", label: "Social Media", icon: Users },
  { value: "E-commerce", label: "E-commerce", icon: ShoppingCart },
  { value: "Training & Courses", label: "Training & Courses", icon: GraduationCap },
  { value: "Advertising", label: "Advertising", icon: Megaphone },
  { value: "Mobile Apps", label: "Mobile Apps", icon: Smartphone },
  // Legacy categories from existing data
  { value: "Development", label: "Development", icon: Code },
  { value: "Marketing", label: "Marketing", icon: TrendingUp },
  { value: "Design", label: "Design", icon: Palette },
];

export function ServicesTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    number: "",
    icon: "",
    active: true,
    display_order: 0,
  });

  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("category", { ascending: true })
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(data)
          .eq("id", editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(editingService ? "Service updated" : "Service created");
      setIsOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error("Failed to save service");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('knight21-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('knight21-uploads')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, icon: publicUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      number: "",
      icon: "",
      active: true,
      display_order: 0,
    });
    setEditingService(null);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || "",
      category: service.category || "",
      number: service.number || "",
      icon: service.icon || "",
      active: service.active,
      display_order: service.display_order || 0,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    saveMutation.mutate(formData);
  };

  // Group services by category
  const groupedServices = services?.reduce((acc: any, service) => {
    const cat = service.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {}) || {};

  const filteredServices = selectedCategoryFilter === "all" 
    ? services 
    : services?.filter(s => s.category === selectedCategoryFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold font-poppins">Manage Services</h2>
          <p className="text-sm text-muted-foreground">
            {services?.length || 0} services across {Object.keys(groupedServices).length} categories
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-white mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {SERVICE_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Service Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g., SEO Optimization"
                    required
                  />
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the service"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Service Number</Label>
                    <Input
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      placeholder="E.g., 01"
                    />
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Icon/Image</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="Icon name or image URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('service-upload')?.click()}
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    </Button>
                    <input
                      id="service-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {formData.icon && formData.icon.startsWith('http') && (
                    <div className="mt-2 relative inline-block">
                      <img src={formData.icon} alt="Preview" className="h-20 w-20 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => setFormData({ ...formData, icon: "" })}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : "Save Service"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {SERVICE_CATEGORIES.slice(0, 5).map(cat => {
          const count = groupedServices[cat.value]?.length || 0;
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.value}
              className={`p-3 cursor-pointer transition-all hover:shadow-md ${selectedCategoryFilter === cat.value ? 'ring-2 ring-primary bg-primary/5' : 'bg-white'}`}
              onClick={() => setSelectedCategoryFilter(cat.value === selectedCategoryFilter ? 'all' : cat.value)}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs font-medium truncate">{cat.label.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">{count} services</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-mono text-sm">{service.number || '-'}</TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {service.category || 'Uncategorized'}
                  </Badge>
                </TableCell>
                <TableCell>{service.active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Delete this service?")) {
                          deleteMutation.mutate(service.id);
                        }
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!filteredServices?.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
