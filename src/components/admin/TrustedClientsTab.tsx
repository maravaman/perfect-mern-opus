import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function TrustedClientsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trusted Clients</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Feature Coming Soon
          </CardTitle>
          <CardDescription>
            Trusted clients management will be available in a future update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This feature will allow you to manage:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
            <li>Client logos and branding</li>
            <li>Client website links</li>
            <li>Client categories</li>
            <li>Display order with drag and drop</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
