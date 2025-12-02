import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function SiteSettingsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Feature Coming Soon
          </CardTitle>
          <CardDescription>
            Site settings management will be available in a future update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This feature will allow you to configure:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
            <li>Site display name and branding</li>
            <li>Logo and favicon</li>
            <li>Theme colors and background</li>
            <li>SEO meta tags</li>
            <li>Google Analytics integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
