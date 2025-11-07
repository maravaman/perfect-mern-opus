import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminSetup() {
  const [userId, setUserId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      setUserId(session.user.id);
      
      // Check if already admin
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      setIsAdmin(!!roleData);
    }
    
    setLoading(false);
  };

  const sqlQuery = `INSERT INTO user_roles (user_id, role)
VALUES ('${userId}', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    toast.success("SQL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero pattern-dots">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero pattern-dots p-4">
        <Card className="glass-card p-8 max-w-2xl w-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-poppins text-gradient mb-4">
              You're Already an Admin!
            </h1>
            <p className="text-muted-foreground mb-6">
              You have admin access to manage all content.
            </p>
            <Button 
              onClick={() => window.location.href = '/admin/dashboard'}
              size="lg"
              className="w-full"
            >
              Go to Admin Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero pattern-dots p-4">
        <Card className="glass-card p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold font-poppins text-gradient mb-4">
            Admin Setup
          </h1>
          <p className="text-muted-foreground mb-6">
            Please <a href="/auth" className="text-primary hover:underline">sign in</a> first to set up admin access.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero pattern-dots p-4">
      <Card className="glass-card p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold font-poppins text-gradient mb-4">
          Admin Setup Instructions
        </h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your User ID:</h2>
            <code className="block bg-muted p-3 rounded text-sm break-all">
              {userId}
            </code>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Steps to Become Admin:</h2>
            
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Copy the SQL query below (click Copy SQL button)</li>
              <li>Open Lovable editor and click <strong className="text-foreground">Cloud</strong> tab in the top navigation</li>
              <li>Navigate to <strong className="text-foreground">Database → Tables</strong></li>
              <li>Click the <strong className="text-foreground">SQL</strong> button in the top right</li>
              <li>Paste the SQL query and click <strong className="text-foreground">Run</strong></li>
              <li>Return here and click "Check Again" - you'll be an admin!</li>
            </ol>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">SQL Query:</h2>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy SQL
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              <code>{sqlQuery}</code>
            </pre>
          </div>

          <div className="pt-2">
            <Button
              onClick={checkUser}
              variant="outline"
              className="w-full"
            >
              I've Run the SQL - Check Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
