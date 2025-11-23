import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

export default function PortfolioTabComplete() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('display_order');

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, 'clients');
      setFormData({ ...formData, client_logo: url });
      toast.success('Logo uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    if (!formData.slug) {
      formData.slug = formData.title.toLowerCase().replace(/\s+/g, '-');
    }

    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Portfolio item updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([formData]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <Button onClick={() => { setEditingItem({}); setFormData({ active: true, display_order: 0 }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {editingItem && (
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem.id ? 'Edit Project' : 'New Project'}
          </h3>
          <div className="grid gap-4">
            <div>
              <Label>Project Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="E-Commerce Website"
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e-commerce-website"
              />
            </div>

            <div>
              <Label>Short Description</Label>
              <Input
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Modern e-commerce solution"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed project description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Client Name</Label>
                <Input
                  value={formData.client_name || ''}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <Label>Project URL</Label>
                <Input
                  value={formData.project_url || ''}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <Label>Client Logo</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-gray-600">Uploading...</span>}
              </div>
              {formData.client_logo && (
                <img src={formData.client_logo} alt="Logo" className="mt-2 w-32 h-32 object-contain bg-gray-100 rounded p-2" />
              )}
            </div>

            <div>
              <Label>Project Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </div>
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Web Development"
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
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active ?? true}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="active">Active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured ?? false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Project</Button>
              <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {portfolio.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 flex gap-4">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-32 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.client_name}</p>
                  <p className="text-muted-foreground mt-1">{item.short_description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    {item.category && <span>Category: {item.category}</span>}
                    <span>Order: {item.display_order}</span>
                    <span>{item.active ? '✓ Active' : '✗ Inactive'}</span>
                    {item.featured && <span>⭐ Featured</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
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
        ))}

        {portfolio.length === 0 && !editingItem && (
          <Card className="p-8 text-center text-gray-500">
            No portfolio items yet. Click "Add Project" to create your first project.
          </Card>
        )}
      </div>
    </div>
  );
}
