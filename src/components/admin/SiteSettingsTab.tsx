import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save, Settings, Globe, Search, Users, Plus, Edit, Trash, Upload, X } from "lucide-react";

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
}

const DEFAULT_SETTINGS = [
  { key: "site_name", label: "Site Name", placeholder: "Knight 21", type: "text" },
  { key: "site_tagline", label: "Tagline", placeholder: "Digital Marketing Agency", type: "text" },
  { key: "contact_email", label: "Contact Email", placeholder: "info@knight21.com", type: "email" },
  { key: "contact_phone", label: "Contact Phone", placeholder: "+91 1234567890", type: "tel" },
  { key: "address", label: "Address", placeholder: "Your business address", type: "textarea" },
  { key: "meta_title", label: "SEO Meta Title", placeholder: "Knight 21 - Digital Marketing Agency", type: "text" },
  { key: "meta_description", label: "SEO Meta Description", placeholder: "Professional digital marketing services", type: "textarea" },
  { key: "google_analytics_id", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX", type: "text" },
  { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/knight21", type: "url" },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/knight21", type: "url" },
  { key: "twitter_url", label: "Twitter URL", placeholder: "https://twitter.com/knight21", type: "url" },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/knight21", type: "url" },
  { key: "youtube_url", label: "YouTube URL", placeholder: "https://youtube.com/@knight21", type: "url" },
  { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+911234567890", type: "tel" },
];

export function SiteSettingsTab() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Team Members State
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [teamFormData, setTeamFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    rating: "",
    reviews_count: "",
    display_order: 0,
    active: true,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting.value || "";
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  // Team Members Query
  const { data: teamMembers, isLoading: teamLoading } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveTeamMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingMember) {
        const { error } = await supabase
          .from("team_members")
          .update(data)
          .eq("id", editingMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success(editingMember ? "Team member updated" : "Team member added");
      setIsTeamDialogOpen(false);
      resetTeamForm();
    },
    onError: () => {
      toast.error("Failed to save team member");
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success("Team member deleted");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('knight21-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('knight21-uploads')
        .getPublicUrl(filePath);

      setTeamFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const resetTeamForm = () => {
    setTeamFormData({
      name: "",
      role: "",
      bio: "",
      image_url: "",
      rating: "",
      reviews_count: "",
      display_order: 0,
      active: true,
    });
    setEditingMember(null);
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setTeamFormData({
      name: member.name,
      role: member.role || "",
      bio: member.bio || "",
      image_url: member.image_url || "",
      rating: member.rating || "",
      reviews_count: member.reviews_count || "",
      display_order: member.display_order || 0,
      active: member.active,
    });
    setIsTeamDialogOpen(true);
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTeamMutation.mutate(teamFormData);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const setting of DEFAULT_SETTINGS) {
        const value = settings[setting.key] || "";
        
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key: setting.key, value, updated_at: new Date().toISOString() },
            { onConflict: "key" }
          );

        if (error) throw error;
      }
      
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your website settings, SEO, and team</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save All Settings
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Team Members Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
                <CardDescription>Manage team members displayed on About Us page</CardDescription>
              </div>
              <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={resetTeamForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={teamFormData.name}
                          onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label>Role/Title</Label>
                        <Input
                          value={teamFormData.role}
                          onChange={(e) => setTeamFormData({ ...teamFormData, role: e.target.value })}
                          placeholder="e.g. CEO, Head Director"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={teamFormData.bio}
                        onChange={(e) => setTeamFormData({ ...teamFormData, bio: e.target.value })}
                        placeholder="Brief description about the team member"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Rating (e.g. 4.5)</Label>
                        <Input
                          value={teamFormData.rating}
                          onChange={(e) => setTeamFormData({ ...teamFormData, rating: e.target.value })}
                          placeholder="4.5"
                        />
                      </div>
                      <div>
                        <Label>Reviews Count</Label>
                        <Input
                          value={teamFormData.reviews_count}
                          onChange={(e) => setTeamFormData({ ...teamFormData, reviews_count: e.target.value })}
                          placeholder="15k+ Positive Reviews"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Profile Image</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={teamFormData.image_url}
                          onChange={(e) => setTeamFormData({ ...teamFormData, image_url: e.target.value })}
                          placeholder="Image URL"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('team-settings-upload')?.click()}
                          disabled={uploading}
                        >
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        </Button>
                        <input
                          id="team-settings-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      {teamFormData.image_url && (
                        <div className="mt-2 relative inline-block">
                          <img src={teamFormData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded-full" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => setTeamFormData({ ...teamFormData, image_url: "" })}
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
                          value={teamFormData.display_order}
                          onChange={(e) => setTeamFormData({ ...teamFormData, display_order: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Switch
                          checked={teamFormData.active}
                          onCheckedChange={(checked) => setTeamFormData({ ...teamFormData, active: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={saveTeamMutation.isPending}>
                      {saveTeamMutation.isPending ? "Saving..." : "Save Team Member"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {teamLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.rating}</TableCell>
                      <TableCell>{member.active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditMember(member)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTeamMutation.mutate(member.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!teamMembers?.length && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No team members yet. Add your first team member above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic site information and contact details</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {DEFAULT_SETTINGS.slice(0, 5).map((setting) => (
              <div key={setting.key} className={setting.type === "textarea" ? "md:col-span-2" : ""}>
                <Label>{setting.label}</Label>
                {setting.type === "textarea" ? (
                  <Textarea
                    value={settings[setting.key] || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    type={setting.type}
                    value={settings[setting.key] || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {DEFAULT_SETTINGS.slice(5, 8).map((setting) => (
              <div key={setting.key}>
                <Label>{setting.label}</Label>
                {setting.type === "textarea" ? (
                  <Textarea
                    value={settings[setting.key] || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    type={setting.type}
                    value={settings[setting.key] || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Media Links
            </CardTitle>
            <CardDescription>Connect your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {DEFAULT_SETTINGS.slice(8).map((setting) => (
              <div key={setting.key}>
                <Label>{setting.label}</Label>
                <Input
                  type={setting.type}
                  value={settings[setting.key] || ""}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  placeholder={setting.placeholder}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}