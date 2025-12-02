import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Settings, Globe, Palette, Search } from "lucide-react";

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
          <p className="text-sm text-muted-foreground">Configure your website settings and SEO</p>
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
