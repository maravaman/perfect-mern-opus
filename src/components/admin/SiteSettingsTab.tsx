import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save, RefreshCw } from "lucide-react";

export function SiteSettingsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    id: "",
    display_name: "Knight21",
    logo_url: "",
    favicon_url: "",
    theme_color: "#0066cc",
    background_type: "gradient",
    background_value: "from-background to-secondary/20",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    google_analytics_id: ""
  });

  useEffect(() => {
    fetchSettings();

    // site_settings table doesn't exist
  }, []);

  const fetchSettings = async () => {
    try {
      // site_settings table doesn't exist in schema
      toast.info('Site settings feature not yet configured');
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // site_settings table doesn't exist in schema
      toast.error('Site settings feature not yet configured - database table missing');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <div className="flex gap-2">
          <Button onClick={fetchSettings} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Configure site name and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={settings.display_name}
                onChange={(e) => setSettings({ ...settings, display_name: e.target.value })}
                placeholder="Knight21"
              />
            </div>
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={settings.logo_url || ""}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="favicon_url">Favicon URL</Label>
              <Input
                id="favicon_url"
                value={settings.favicon_url || ""}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize colors and background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme_color">Theme Color</Label>
              <div className="flex gap-2">
                <Input
                  id="theme_color"
                  type="color"
                  value={settings.theme_color}
                  onChange={(e) => setSettings({ ...settings, theme_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.theme_color}
                  onChange={(e) => setSettings({ ...settings, theme_color: e.target.value })}
                  placeholder="#0066cc"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="background_type">Background Type</Label>
              <Select
                value={settings.background_type}
                onValueChange={(value) => setSettings({ ...settings, background_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid Color</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="background_value">Background Value</Label>
              <Input
                id="background_value"
                value={settings.background_value}
                onChange={(e) => setSettings({ ...settings, background_value: e.target.value })}
                placeholder="from-background to-secondary/20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tailwind gradient classes or image URL
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Meta tags for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={settings.meta_title || ""}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                placeholder="Knight21 - Digital Solutions"
              />
            </div>
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={settings.meta_description || ""}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                placeholder="Professional digital services..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="meta_keywords">Meta Keywords</Label>
              <Input
                id="meta_keywords"
                value={settings.meta_keywords || ""}
                onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                placeholder="web development, digital marketing"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Google Analytics integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={settings.google_analytics_id || ""}
                onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Google Analytics Measurement ID
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
