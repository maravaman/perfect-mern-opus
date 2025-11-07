import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ContactSubmissionsTab } from "@/components/admin/ContactSubmissionsTab";
import { CoursesTab } from "@/components/admin/CoursesTab";
import { ServicesTab } from "@/components/admin/ServicesTab";
import { PricingPlansTab } from "@/components/admin/PricingPlansTab";
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
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              <ContactSubmissionsTab />
            </TabsContent>

            <TabsContent value="courses">
              <CoursesTab />
            </TabsContent>

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="pricing">
              <PricingPlansTab />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
