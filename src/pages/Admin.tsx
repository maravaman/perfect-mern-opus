import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2 } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Check if user is admin
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleData?.role === 'admin') {
      setIsAdmin(true);
      fetchAllData();
    } else {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }

    setLoading(false);
  };

  const fetchAllData = async () => {
    const [servicesRes, portfolioRes, reviewsRes, packagesRes, coursesRes] = await Promise.all([
      supabase.from('services').select('*').order('display_order'),
      supabase.from('portfolio_items').select('*').order('display_order'),
      supabase.from('reviews').select('*').order('display_order'),
      supabase.from('packages').select('*').order('display_order'),
      supabase.from('courses').select('*').order('display_order')
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (portfolioRes.data) setPortfolioItems(portfolioRes.data);
    if (reviewsRes.data) setReviews(reviewsRes.data);
    if (packagesRes.data) setPackages(packagesRes.data);
    if (coursesRes.data) setCourses(coursesRes.data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSave = async (table: string) => {
    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from(table as any)
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast.success("Updated successfully");
      } else {
        const { error } = await supabase
          .from(table as any)
          .insert([formData]);
        
        if (error) throw error;
        toast.success("Created successfully");
      }

      setEditingItem(null);
      setFormData({});
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success("Deleted successfully");
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Services</h2>
                <Button onClick={() => { setEditingItem({}); setFormData({ active: true }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>

              {editingItem && (
                <Card className="p-6 mb-6 bg-blue-50">
                  <h3 className="text-lg font-semibold mb-4">{editingItem.id ? 'Edit Service' : 'New Service'}</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Number</Label>
                      <Input
                        value={formData.number || ''}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        placeholder="01"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Display Order</Label>
                      <Input
                        type="number"
                        value={formData.display_order || ''}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSave('services')}>Save</Button>
                      <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{service.number} - {service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Order: {service.display_order} | {service.active ? '✓ Active' : '✗ Inactive'}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditingItem(service); setFormData(service); }}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete('services', service.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Similar tabs for Portfolio, Reviews, Packages, Courses */}
          <TabsContent value="portfolio">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Portfolio Items</h2>
              <p className="text-muted-foreground">Portfolio management coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>
              <p className="text-muted-foreground">Reviews management coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Pricing Packages</h2>
              <p className="text-muted-foreground">Packages management coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Courses</h2>
              <p className="text-muted-foreground">Courses management coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
