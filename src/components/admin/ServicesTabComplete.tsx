import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

export default function ServicesTabComplete() {
  const [services, setServices] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order');

    if (error) {
      toast.error('Failed to load services');
      return;
    }

    setServices(data || []);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, 'services');
      setFormData({ ...formData, image_url: url });
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload image');
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
          .from('services')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button onClick={() => { setEditingItem({}); setFormData({ active: true, display_order: 0 }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {editingItem && (
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem.id ? 'Edit Service' : 'New Service'}
          </h3>
          <div className="grid gap-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Web Development"
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="web-development"
              />
            </div>

            <div>
              <Label>Short Description</Label>
              <Input
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief description"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed description of the service"
              />
            </div>

            <div>
              <Label>Icon (Lucide icon name)</Label>
              <Input
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Code"
              />
            </div>

            <div>
              <Label>Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-gray-600">Uploading...</span>}
              </div>
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>

            <div>
              <Label>Category</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Development"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order || ''}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active ?? true}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Service</Button>
              <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 flex gap-4">
                {service.image_url && (
                  <img src={service.image_url} alt={service.title} className="w-20 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.slug}</p>
                  <p className="text-muted-foreground mt-1">{service.short_description || service.description?.substring(0, 100)}...</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Order: {service.display_order}</span>
                    <span>{service.active ? '✓ Active' : '✗ Inactive'}</span>
                    {service.category && <span>Category: {service.category}</span>}
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
        ))}

        {services.length === 0 && !editingItem && (
          <Card className="p-8 text-center text-gray-500">
            No services yet. Click "Add Service" to create your first service.
          </Card>
        )}
      </div>
    </div>
  );
}
