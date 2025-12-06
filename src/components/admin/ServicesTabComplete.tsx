import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Code, Smartphone, TrendingUp, Palette, Video, Globe, Search, Settings, Briefcase } from 'lucide-react';

const SERVICE_CATEGORIES = [
  { value: 'Web Development', label: 'Web Development', icon: Code },
  { value: 'App Development', label: 'App Development', icon: Smartphone },
  { value: 'Digital Marketing', label: 'Digital Marketing', icon: TrendingUp },
  { value: 'Graphic Design', label: 'Graphic Design', icon: Palette },
  { value: 'Video Production', label: 'Video Production', icon: Video },
  { value: 'SEO Services', label: 'SEO Services', icon: Search },
  { value: 'Social Media', label: 'Social Media', icon: Globe },
  { value: 'Consulting', label: 'Consulting', icon: Briefcase },
  { value: 'Maintenance', label: 'Maintenance & Support', icon: Settings },
];

const ICON_OPTIONS = [
  { value: 'Code', label: 'Code' },
  { value: 'Smartphone', label: 'Smartphone' },
  { value: 'TrendingUp', label: 'Trending Up' },
  { value: 'Palette', label: 'Palette' },
  { value: 'Video', label: 'Video' },
  { value: 'Search', label: 'Search' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Settings', label: 'Settings' },
  { value: 'Briefcase', label: 'Briefcase' },
  { value: 'Mail', label: 'Mail' },
  { value: 'Image', label: 'Image' },
  { value: 'FileText', label: 'File Text' },
  { value: 'Users', label: 'Users' },
  { value: 'ShoppingCart', label: 'Shopping Cart' },
  { value: 'Megaphone', label: 'Megaphone' },
  { value: 'BarChart', label: 'Bar Chart' },
  { value: 'Layers', label: 'Layers' },
  { value: 'Zap', label: 'Zap' },
];

export default function ServicesTabComplete() {
  const [services, setServices] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to load services');
      return;
    }

    setServices(data || []);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.category) {
      toast.error('Please fill in required fields (title and category)');
      return;
    }

    try {
      const saveData = {
        title: formData.title,
        description: formData.description || null,
        icon: formData.icon || null,
        category: formData.category,
        number: formData.number || null,
        active: formData.active ?? true,
        display_order: formData.display_order || 0,
      };

      if (editingItem?.id) {
        const { error } = await supabase
          .from('services')
          .update(saveData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([saveData]);

        if (error) throw error;
        toast.success('Service created successfully');
      }

      setEditingItem(null);
      setFormData({});
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Group services by category
  const groupedServices = services.reduce((acc: any, service) => {
    const cat = service.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const categories = Object.keys(groupedServices);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => { setEditingItem({}); setFormData({ active: true, display_order: 0, category: 'Web Development' }); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Category Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {SERVICE_CATEGORIES.map(cat => {
          const count = groupedServices[cat.value]?.length || 0;
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.value} 
              className={`p-3 cursor-pointer transition-all hover:shadow-md ${selectedCategory === cat.value ? 'ring-2 ring-primary bg-primary/5' : 'bg-white'}`}
              onClick={() => setSelectedCategory(cat.value === selectedCategory ? 'all' : cat.value)}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{count} services</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {editingItem && (
        <Card className="p-6 bg-blue-50 border-2 border-primary/20">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem.id ? 'Edit Service' : 'Add New Service'}
          </h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {SERVICE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Icon</Label>
                <Select 
                  value={formData.icon || ''} 
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {ICON_OPTIONS.map(icon => (
                      <SelectItem key={icon.value} value={icon.value}>{icon.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Service Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Custom Website Development"
                className="bg-white"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed description of the service"
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Number (optional)</Label>
                <Input
                  value={formData.number || ''}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="01"
                  className="bg-white"
                />
              </div>

              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active ?? true}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="active">Active (visible on website)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingItem.id ? 'Update Service' : 'Create Service'}
              </Button>
              <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const categoryInfo = SERVICE_CATEGORIES.find(c => c.value === service.category);
            const CategoryIcon = categoryInfo?.icon || Briefcase;
            return (
              <Card key={service.id} className="p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1 flex gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.active ? 'bg-primary/10' : 'bg-gray-100'}`}>
                      <CategoryIcon className={`w-6 h-6 ${service.active ? 'text-primary' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {service.number && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{service.number}</span>}
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        {!service.active && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Inactive</span>}
                      </div>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{service.description}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{service.category}</span>
                        {service.icon && <span className="text-xs text-gray-500">Icon: {service.icon}</span>}
                        <span className="text-xs text-gray-500">Order: {service.display_order}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => { setEditingItem(service); setFormData(service); }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center text-gray-500">
            {selectedCategory === 'all' 
              ? 'No services yet. Click "Add Service" to create your first service.'
              : `No services in ${selectedCategory}. Add one using the button above.`
            }
          </Card>
        )}
      </div>
    </div>
  );
}
