import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

export default function CoursesTabComplete() {
  const [courses, setCourses] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('display_order');

    if (error) {
      toast.error('Failed to load courses');
      return;
    }

    setCourses(data || []);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, 'courses');
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
          .from('courses')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Course updated successfully');
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([formData]);

        if (error) throw error;
        toast.success('Course created successfully');
      }

      setEditingItem(null);
      setFormData({});
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error} = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses Management</h2>
        <Button onClick={() => { setEditingItem({}); setFormData({ active: true, level: 'beginner', display_order: 0 }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {editingItem && (
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem.id ? 'Edit Course' : 'New Course'}
          </h3>
          <div className="grid gap-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Complete Web Development Course"
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="complete-web-development"
              />
            </div>

            <div>
              <Label>Short Description</Label>
              <Input
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Learn web development from scratch"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed course description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Instructor</Label>
                <Input
                  value={formData.instructor || ''}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="12 weeks"
                />
              </div>
            </div>

            <div>
              <Label>Level</Label>
              <Select
                value={formData.level || 'beginner'}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Image</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="299.99"
                />
              </div>

              <div>
                <Label>Discount Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.discount_price || ''}
                  onChange={(e) => setFormData({ ...formData, discount_price: parseFloat(e.target.value) })}
                  placeholder="199.99"
                />
              </div>
            </div>

            <div>
              <Label>Enrollment Link</Label>
              <Input
                value={formData.enrollment_link || ''}
                onChange={(e) => setFormData({ ...formData, enrollment_link: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Development"
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
              <Button onClick={handleSave}>Save Course</Button>
              <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 flex gap-4">
                {course.image_url && (
                  <img src={course.image_url} alt={course.title} className="w-20 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.slug}</p>
                  <p className="text-muted-foreground mt-1">{course.short_description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Level: {course.level}</span>
                    {course.duration && <span>Duration: {course.duration}</span>}
                    {course.price && <span>Price: ${course.price}</span>}
                    <span>{course.active ? '✓ Active' : '✗ Inactive'}</span>
                    {course.featured && <span>⭐ Featured</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setEditingItem(course); setFormData(course); }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {courses.length === 0 && !editingItem && (
          <Card className="p-8 text-center text-gray-500">
            No courses yet. Click "Add Course" to create your first course.
          </Card>
        )}
      </div>
    </div>
  );
}
