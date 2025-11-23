import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Search, Upload, Folder, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  active: boolean;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  author_name: string;
  author_email: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function BlogsTabNew() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", description: "" });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    published: false,
  });

  useEffect(() => {
    fetchData();

    const blogsChannel = supabase
      .channel('blogs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchBlogs)
      .subscribe();

    return () => {
      supabase.removeChannel(blogsChannel);
    };
  }, []);

  const fetchData = async () => {
    await fetchBlogs();
    setLoading(false);
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    } else {
      setBlogs(data || []);
    }
  };

  const fetchCategories = async () => {
    // Categories table doesn't exist in schema - removed
    setCategories([]);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("knight21-uploads")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("knight21-uploads")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const slug = formData.slug || generateSlug(formData.title);

      const blogData = {
        title: formData.title,
        slug,
        content: formData.content,
        excerpt: formData.excerpt || null,
        feature_image: formData.feature_image || null,
        category_id: formData.category_id || null,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt || null,
        author_id: user?.id || null,
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blog_posts")
          .update(blogData)
          .eq("id", editingBlog.id);

        if (error) throw error;
        toast.success("Blog updated successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([blogData]);

        if (error) throw error;
        toast.success("Blog created successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to save blog");
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      image_url: blog.image_url || "",
      category: blog.category || "",
      tags: blog.tags.join(", "),
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      published: blog.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ published })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Blog ${published ? 'published' : 'unpublished'}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      category: "",
      tags: "",
      meta_title: "",
      meta_description: "",
      published: false,
    });
    setEditingBlog(null);
    setIsEditing(false);
  };

  const handleCategorySubmit = async () => {
    toast.error("Categories feature not available - table doesn't exist");
    return;
  };

  const handleDeleteCategory = async (id: string) => {
    toast.error("Categories feature not available - table doesn't exist");
    return;
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <Tabs defaultValue="blogs" className="space-y-6">
      <TabsList>
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="blogs" className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Blog Management</h2>
            <p className="text-sm text-muted-foreground">Create and manage blog posts with SEO</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Blog
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isEditing && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                    placeholder="Blog title"
                  />
                </div>

                <div>
                  <Label>Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <Input
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="seo, marketing, design"
                    />
                  </div>
                </div>

                <div>
                  <Label>Feature Image</Label>
                  {formData.feature_image && (
                    <div className="mb-2">
                      <img src={formData.feature_image} alt="Preview" className="h-32 w-full object-cover rounded" />
                    </div>
                  )}
                  <Button type="button" variant="outline" onClick={() => document.getElementById("blog-image")?.click()} disabled={uploadingImage}>
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </Button>
                  <Input id="blog-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                <div>
                  <Label>Excerpt</Label>
                  <Input
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary"
                  />
                </div>

                <div>
                  <Label>Content *</Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    modules={quillModules}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="SEO title"
                      maxLength={60}
                    />
                  </div>

                  <div>
                    <Label>Meta Description</Label>
                    <Input
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="SEO description"
                      maxLength={160}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label>Publish immediately</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingBlog ? "Update" : "Create"}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {blog.feature_image && (
                    <img src={blog.feature_image} alt={blog.title} className="w-32 h-32 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{blog.title}</h3>
                      <Badge variant={blog.published ? "default" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    {blog.excerpt && <p className="text-sm text-muted-foreground mt-2">{blog.excerpt}</p>}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {blog.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleTogglePublished(blog.id, !blog.published)}>
                        {blog.published ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                        {blog.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="categories" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Blog Categories</h2>
          <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", slug: "", description: "" }); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Name *</Label>
                  <Input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={categoryForm.slug} onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCategorySubmit}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.slug}</p>
                  {cat.description && <p className="text-sm mt-1">{cat.description}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, slug: cat.slug, description: cat.description || "" }); setCategoryDialogOpen(true); }}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
