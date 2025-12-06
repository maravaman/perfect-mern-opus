import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ContactSubmissionsTab } from "@/components/admin/ContactSubmissionsTab";
import { CoursesTab } from "@/components/admin/CoursesTab";
import { ServicesTab } from "@/components/admin/ServicesTab";
import { PricingPlansTab } from "@/components/admin/PricingPlansTab";
import { ToolsTab } from "@/components/admin/ToolsTab";
import { PortfolioTab } from "@/components/admin/PortfolioTab";
import { BlogsTabNew } from "@/components/admin/BlogsTabNew";
import { AppDevelopmentTab } from "@/components/admin/AppDevelopmentTab";
import { WebApplicationsTab } from "@/components/admin/WebApplicationsTab";
import { SiteSettingsTab } from "@/components/admin/SiteSettingsTab";
import { TrustedClientsTab } from "@/components/admin/TrustedClientsTab";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roleError || roleData?.role !== 'admin') {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-hero pattern-dots">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-poppins text-gradient">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="glass-card p-6">
          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-11 gap-1">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="web">Web Apps</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <SiteSettingsTab />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactSubmissionsTab />
            </TabsContent>

            <TabsContent value="courses">
              <CoursesTab />
            </TabsContent>

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="portfolio">
              <PortfolioTab />
            </TabsContent>

            <TabsContent value="pricing">
              <PricingPlansTab />
            </TabsContent>

            <TabsContent value="tools">
              <ToolsTab />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogsTabNew />
            </TabsContent>

            <TabsContent value="clients">
              <TrustedClientsTab />
            </TabsContent>

            <TabsContent value="apps">
              <AppDevelopmentTab />
            </TabsContent>

            <TabsContent value="web">
              <WebApplicationsTab />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
