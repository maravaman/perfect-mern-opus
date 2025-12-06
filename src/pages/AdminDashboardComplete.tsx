import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Shield } from 'lucide-react';
import ServicesTabComplete from '@/components/admin/ServicesTabComplete';
import CoursesTabComplete from '@/components/admin/CoursesTabComplete';
import PortfolioTabComplete from '@/components/admin/PortfolioTabComplete';
import { BlogsTabNew } from '@/components/admin/BlogsTabNew';
import { ToolsTab } from '@/components/admin/ToolsTab';
import { SiteSettingsTab } from '@/components/admin/SiteSettingsTab';
import { PricingPlansTab } from '@/components/admin/PricingPlansTab';
import { ContactSubmissionsTab } from '@/components/admin/ContactSubmissionsTab';
import { ReviewsTab } from '@/components/admin/ReviewsTab';
import { CareerApplicationsTab } from '@/components/admin/CareerApplicationsTab';
import { CareerOpeningsTab } from '@/components/admin/CareerOpeningsTab';

export default function AdminDashboardComplete() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Knight21 Admin</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.email}</p>
              </div>
            </div>
            <Button onClick={signOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-8 h-auto">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SiteSettingsTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTabComplete />
          </TabsContent>

          <TabsContent value="courses">
            <CoursesTabComplete />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioTabComplete />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogsTabNew />
          </TabsContent>

          <TabsContent value="tools">
            <ToolsTab />
          </TabsContent>

          <TabsContent value="clients">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingPlansTab />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissionsTab />
          </TabsContent>

          <TabsContent value="careers">
            <div className="space-y-8">
              <CareerOpeningsTab />
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold mb-4">Job Applications</h3>
                <CareerApplicationsTab />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
