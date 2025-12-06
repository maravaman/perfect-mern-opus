import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ExternalLink, Image, Globe, Smartphone, Palette, Video, FileText, Layout } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

const PORTFOLIO_CATEGORIES = [
  { value: 'Web Development', label: 'Websites', icon: Globe },
  { value: 'App Development', label: 'Mobile Apps', icon: Smartphone },
  { value: 'Graphic Design', label: 'Graphics & Logos', icon: Palette },
  { value: 'Video Production', label: 'Videos', icon: Video },
  { value: 'UI/UX Design', label: 'UI/UX Design', icon: Layout },
  { value: 'Branding', label: 'Branding', icon: FileText },
];

export default function PortfolioTabComplete() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to load portfolio');
      return;
    }

    setPortfolio(data || []);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, 'portfolio');
      setFormData({ ...formData, image_url: url });
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.category) {
      toast.error('Please fill in required fields (title, category)');
      return;
    }

    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({
            title: formData.title,
            category: formData.category,
            description: formData.description || null,
            client_name: formData.client_name || null,
            project_url: formData.project_url || null,
            image_url: formData.image_url || null,
            display_order: formData.display_order || 0,
            active: formData.active ?? true,
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Portfolio item updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([{
            title: formData.title,
            category: formData.category,
            description: formData.description || null,
            client_name: formData.client_name || null,
            project_url: formData.project_url || null,
            image_url: formData.image_url || null,
            display_order: formData.display_order || 0,
            active: formData.active ?? true,
          }]);

        if (error) throw error;
        toast.success('Portfolio item created successfully');
      }

      setEditingItem(null);
      setFormData({});
      fetchPortfolio();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Portfolio item deleted successfully');
      fetchPortfolio();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Group portfolio by category
  const groupedPortfolio = portfolio.reduce((acc: any, item) => {
    const cat = item.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const filteredPortfolio = selectedCategory === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all">All Categories</SelectItem>
              {PORTFOLIO_CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => { setEditingItem({}); setFormData({ active: true, display_order: 0, category: 'Web Development' }); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Category Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {PORTFOLIO_CATEGORIES.map(cat => {
          const count = groupedPortfolio[cat.value]?.length || 0;
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
                  <p className="text-xs text-muted-foreground">{count} items</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {editingItem && (
        <Card className="p-6 bg-blue-50 border-2 border-primary/20">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem.id ? 'Edit Project' : 'Add New Project'}
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
                    {PORTFOLIO_CATEGORIES.map(cat => (
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
                <Label>Client Name</Label>
                <Input
                  value={formData.client_name || ''}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Acme Corp"
                  className="bg-white"
                />
              </div>
            </div>

            <div>
              <Label>Project Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="E-Commerce Website"
                className="bg-white"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the project"
                className="bg-white"
              />
            </div>

            <div>
              <Label>Project URL</Label>
              <Input
                value={formData.project_url || ''}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                placeholder="https://example.com"
                className="bg-white"
              />
            </div>

            <div>
              <Label>Project Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="bg-white"
                />
                {uploading && <span className="text-sm text-gray-600">Uploading...</span>}
              </div>
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 w-full h-48 object-cover rounded border" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="bg-white"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="portfolio-active"
                  checked={formData.active ?? true}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="portfolio-active">Active (visible on website)</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingItem.id ? 'Update Project' : 'Create Project'}
              </Button>
              <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPortfolio.length > 0 ? (
          filteredPortfolio.map((item) => {
            const categoryInfo = PORTFOLIO_CATEGORIES.find(c => c.value === item.category);
            const CategoryIcon = categoryInfo?.icon || Image;
            return (
              <Card key={item.id} className={`overflow-hidden bg-white ${!item.active ? 'opacity-60' : ''}`}>
                <div className="relative aspect-video bg-gray-100">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  {!item.active && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Inactive
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                      {item.client_name && <p className="text-sm text-gray-500">{item.client_name}</p>}
                    </div>
                    <CategoryIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{item.category}</span>
                    <span className="text-xs text-gray-400">Order: {item.display_order}</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    {item.project_url && (
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => { setEditingItem(item); setFormData(item); }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center text-gray-500 col-span-full">
            {selectedCategory === 'all' 
              ? 'No portfolio items yet. Click "Add Project" to create your first project.'
              : `No items in ${selectedCategory}. Add one using the button above.`
            }
          </Card>
        )}
      </div>
    </div>
  );
}
