import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function ServicesTabComplete() {
  const [services, setServices] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

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

  const handleSave = async () => {
    if (!formData.title) {
      toast.error('Please fill in the title');
      return;
    }

    try {
      const saveData = {
        title: formData.title,
        description: formData.description || null,
        icon: formData.icon || null,
        category: formData.category || null,
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
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed description of the service"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon (Lucide icon name)</Label>
                <Input
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Code, Smartphone, TrendingUp"
                />
              </div>

              <div>
                <Label>Number</Label>
                <Input
                  value={formData.number || ''}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="01"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Development, Marketing, Design"
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
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {service.number && <span className="text-sm text-muted-foreground">{service.number}</span>}
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  {service.icon && <span>Icon: {service.icon}</span>}
                  {service.category && <span>Category: {service.category}</span>}
                  <span>Order: {service.display_order}</span>
                  <span>{service.active ? '✓ Active' : '✗ Inactive'}</span>
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