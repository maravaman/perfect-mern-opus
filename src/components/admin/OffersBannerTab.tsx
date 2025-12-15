import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, Loader2, Eye, EyeOff, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface OfferBanner {
  id: string;
  title: string;
  description: string | null;
  link_url: string | null;
  link_text: string | null;
  background_color: string | null;
  text_color: string | null;
  image_url: string | null;
  active: boolean | null;
  display_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export function OffersBannerTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<OfferBanner | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link_url: "",
    link_text: "Learn More",
    background_color: "#EBFBFF",
    text_color: "#000000",
    image_url: "",
    active: true,
    display_order: 0,
  });

  const queryClient = useQueryClient();

  const { data: banners, isLoading } = useQuery({
    queryKey: ["offers_banner"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers_banner")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as OfferBanner[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingBanner) {
        const { error } = await supabase
          .from("offers_banner")
          .update(data)
          .eq("id", editingBanner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("offers_banner").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers_banner"] });
      toast.success(editingBanner ? "Banner updated" : "Banner created");
      setIsOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error("Failed to save banner");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("offers_banner").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers_banner"] });
      toast.success("Banner deleted");
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from("offers_banner")
        .update({ active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers_banner"] });
      toast.success("Banner status updated");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('knight21-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('knight21-uploads')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
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
      link_url: "",
      link_text: "Learn More",
      background_color: "#EBFBFF",
      text_color: "#000000",
      image_url: "",
      active: true,
      display_order: 0,
    });
    setEditingBanner(null);
  };

  const handleEdit = (banner: OfferBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description || "",
      link_url: banner.link_url || "",
      link_text: banner.link_text || "Learn More",
      background_color: banner.background_color || "#EBFBFF",
      text_color: banner.text_color || "#000000",
      image_url: banner.image_url || "",
      active: banner.active ?? true,
      display_order: banner.display_order || 0,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
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
          <h2 className="text-2xl font-bold font-poppins">Offers Banner</h2>
          <p className="text-sm text-muted-foreground">Manage promotional banners shown on home page above trusted clients</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingBanner ? "Edit Banner" : "Add New Banner"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., 50% OFF on All Services!"
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about the offer"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Link URL</Label>
                  <Input
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="/services or https://..."
                  />
                </div>
                <div>
                  <Label>Link Text</Label>
                  <Input
                    value={formData.link_text}
                    onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                    placeholder="Learn More"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.background_color}
                      onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={formData.background_color}
                      onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.text_color}
                      onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={formData.text_color}
                      onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label>Banner Image</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Image URL or upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('banner-upload')?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                {formData.image_url && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.image_url} alt="Preview" className="h-20 w-auto object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              
              {/* Preview */}
              <div>
                <Label>Preview</Label>
                <div 
                  className="mt-2 p-4 rounded-lg text-center"
                  style={{ 
                    backgroundColor: formData.background_color, 
                    color: formData.text_color 
                  }}
                >
                  <p className="font-semibold">{formData.title || "Your offer title"}</p>
                  {formData.description && <p className="text-sm mt-1">{formData.description}</p>}
                  {formData.link_text && (
                    <span className="text-sm underline mt-2 inline-block">{formData.link_text}</span>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Banner"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners?.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell className="font-medium">{banner.title}</TableCell>
                <TableCell>
                  <div 
                    className="px-3 py-1 rounded text-xs inline-block"
                    style={{ 
                      backgroundColor: banner.background_color || "#EBFBFF", 
                      color: banner.text_color || "#000000" 
                    }}
                  >
                    {banner.title.substring(0, 30)}{banner.title.length > 30 ? '...' : ''}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={banner.active ? "default" : "outline"}
                    onClick={() => toggleActiveMutation.mutate({ id: banner.id, active: !banner.active })}
                  >
                    {banner.active ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                    {banner.active ? "Active" : "Hidden"}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(banner)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Delete this banner?")) {
                          deleteMutation.mutate(banner.id);
                        }
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!banners?.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No banners yet. Create one to display offers on the home page.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}