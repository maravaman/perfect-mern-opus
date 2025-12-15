import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ExternalLink, Image, Globe, Palette, Video, FileText, Layout } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

// Shared sub-categories for all portfolio types
const SHARED_SUB_CATEGORIES = [
  'E-commerce', 'Education', 'Restaurant', 'Real Estate', 'Healthcare', 
  'Fashion', 'Technology', 'Corporate', 'Portfolio', 'Entertainment',
  'Finance', 'Travel', 'Sports', 'Food & Beverage', 'Automotive', 'Other'
];

// Main portfolio categories with their required fields
const PORTFOLIO_CATEGORIES = [
  { 
    value: 'Websites', 
    label: 'Websites', 
    icon: Globe,
    subCategories: SHARED_SUB_CATEGORIES,
    fields: {
      title: { label: 'Website Title', placeholder: 'E.g., Fashion Store Website', required: true },
      project_url: { label: 'Live Website URL', placeholder: 'https://example.com', required: true },
      description: { label: 'Short Description', placeholder: 'Brief description of the website', required: false },
      client_name: { label: 'Client Name', placeholder: 'Client or Business Name', required: false },
      image_url: { label: 'Website Screenshot', required: true },
    }
  },
  { 
    value: 'Logos', 
    label: 'Logos', 
    icon: Palette,
    subCategories: SHARED_SUB_CATEGORIES,
    fields: {
      title: { label: 'Logo Title', placeholder: 'E.g., Tech Startup Logo', required: true },
      client_name: { label: 'Client/Brand Name', placeholder: 'Brand or Company Name', required: true },
      description: { label: 'Design Notes', placeholder: 'Brief notes about the design', required: false },
      image_url: { label: 'Logo Image', required: true },
    }
  },
  { 
    value: 'Videos', 
    label: 'Videos', 
    icon: Video,
    subCategories: SHARED_SUB_CATEGORIES,
    fields: {
      title: { label: 'Video Title', placeholder: 'E.g., Product Launch Video', required: true },
      project_url: { label: 'Video URL (YouTube/Vimeo)', placeholder: 'https://youtube.com/watch?v=...', required: true },
      client_name: { label: 'Client Name', placeholder: 'Client or Brand Name', required: false },
      description: { label: 'Video Description', placeholder: 'Brief description of the video', required: false },
      image_url: { label: 'Thumbnail Image (Optional)', required: false },
    }
  },
  { 
    value: 'Posters', 
    label: 'Posters', 
    icon: FileText,
    subCategories: SHARED_SUB_CATEGORIES,
    fields: {
      title: { label: 'Poster Title', placeholder: 'E.g., Summer Sale Poster', required: true },
      client_name: { label: 'Client Name', placeholder: 'Client or Brand Name', required: false },
      description: { label: 'Design Brief', placeholder: 'Brief about the poster design', required: false },
      image_url: { label: 'Poster Image', required: true },
    }
  },
  { 
    value: 'Results', 
    label: 'Results', 
    icon: Layout,
    subCategories: SHARED_SUB_CATEGORIES,
    fields: {
      title: { label: 'Campaign/Project Name', placeholder: 'E.g., SEO Campaign for XYZ', required: true },
      description: { label: 'Key Result/Metric', placeholder: 'E.g., +250% Traffic Increase', required: true },
      client_name: { label: 'Client Name', placeholder: 'Client or Company Name', required: true },
      image_url: { label: 'Result Screenshot/Graph', required: true },
    }
  },
];

interface FieldConfig {
  label: string;
  placeholder?: string;
  required: boolean;
}

interface CategoryFields {
  title?: FieldConfig;
  project_url?: FieldConfig;
  description?: FieldConfig;
  client_name?: FieldConfig;
  image_url?: FieldConfig;
}

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

  const handleCategoryChange = (category: string) => {
    setFormData({ 
      ...formData, 
      category,
      sub_category: '' // Reset sub-category when main category changes
    });
  };

  const getCategoryConfig = (category: string) => {
    return PORTFOLIO_CATEGORIES.find(c => c.value === category);
  };

  const getSubCategories = (category: string) => {
    const cat = getCategoryConfig(category);
    return cat?.subCategories || [];
  };

  const getFields = (category: string): CategoryFields => {
    const cat = getCategoryConfig(category);
    return (cat?.fields || {}) as CategoryFields;
  };

  const validateForm = () => {
    const fields = getFields(formData.category);
    for (const [key, config] of Object.entries(fields)) {
      if ((config as any).required && !formData[key]) {
        toast.error(`Please fill in ${(config as any).label}`);
        return false;
      }
    }
    if (!formData.sub_category) {
      toast.error('Please select a sub-category');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (!validateForm()) return;

    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({
            title: formData.title,
            category: formData.category,
            sub_category: formData.sub_category || null,
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
            sub_category: formData.sub_category || null,
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

  const currentFields = getFields(formData.category);

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
          <Button onClick={() => { setEditingItem({}); setFormData({ active: true, display_order: 0 }); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Category Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
          
          {/* Step 1: Select Category */}
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-semibold">1. Select Category *</Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="bg-white mt-2">
                    <SelectValue placeholder="Choose a category first" />
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

              {formData.category && (
                <div>
                  <Label className="text-base font-semibold">2. Select Sub-Category *</Label>
                  <Select 
                    value={formData.sub_category || ''} 
                    onValueChange={(value) => setFormData({ ...formData, sub_category: value })}
                  >
                    <SelectTrigger className="bg-white mt-2">
                      <SelectValue placeholder="Choose sub-category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {getSubCategories(formData.category).map(subCat => (
                        <SelectItem key={subCat} value={subCat}>
                          {subCat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Dynamic Fields based on Category */}
            {formData.category && (
              <>
                <div className="border-t pt-4 mt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Fill in the details for your {formData.category.toLowerCase()} project:
                  </p>
                </div>

                {/* Title Field */}
                {currentFields.title && (
                  <div>
                    <Label>{(currentFields.title as any).label} {(currentFields.title as any).required && '*'}</Label>
                    <Input
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={(currentFields.title as any).placeholder}
                      className="bg-white mt-1"
                    />
                  </div>
                )}

                {/* URL Field - Only for Websites and Videos */}
                {currentFields.project_url && (
                  <div>
                    <Label>{(currentFields.project_url as any).label} {(currentFields.project_url as any).required && '*'}</Label>
                    <Input
                      value={formData.project_url || ''}
                      onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      placeholder={(currentFields.project_url as any).placeholder}
                      className="bg-white mt-1"
                    />
                    {formData.category === 'Videos' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Paste YouTube or Vimeo URL for embedded playback
                      </p>
                    )}
                  </div>
                )}

                {/* Client Name Field */}
                {currentFields.client_name && (
                  <div>
                    <Label>{(currentFields.client_name as any).label} {(currentFields.client_name as any).required && '*'}</Label>
                    <Input
                      value={formData.client_name || ''}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder={(currentFields.client_name as any).placeholder}
                      className="bg-white mt-1"
                    />
                  </div>
                )}

                {/* Description Field */}
                {currentFields.description && (
                  <div>
                    <Label>{(currentFields.description as any).label} {(currentFields.description as any).required && '*'}</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      placeholder={(currentFields.description as any).placeholder}
                      className="bg-white mt-1"
                    />
                    {formData.category === 'Results' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        This will be displayed as the main metric (e.g., "+250% Traffic")
                      </p>
                    )}
                  </div>
                )}

                {/* Image Upload Field */}
                {currentFields.image_url && (
                  <div>
                    <Label>{(currentFields.image_url as any).label} {(currentFields.image_url as any).required && '*'}</Label>
                    <div className="flex items-center gap-4 mt-1">
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
                )}

                {/* Additional Settings */}
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={formData.display_order || 0}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="bg-white mt-1"
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
              </>
            )}

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={!formData.category}>
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
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{item.category}</span>
                    {item.sub_category && (
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">{item.sub_category}</span>
                    )}
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