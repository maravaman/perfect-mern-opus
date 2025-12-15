import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Search, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  author_name: string;
  author_email: string;
  published: boolean | null;
  created_at: string;
  updated_at: string;
}

export function BlogsTabNew() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    author_name: "",
    author_email: "",
    published: false,
  });

  useEffect(() => {
    fetchBlogs();

    const blogsChannel = supabase
      .channel('blog-posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchBlogs)
      .subscribe();

    return () => {
      supabase.removeChannel(blogsChannel);
    };
  }, []);

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
    setLoading(false);
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

    if (!formData.author_name.trim() || !formData.author_email.trim()) {
      toast.error("Author name and email are required");
      return;
    }

    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || null,
        image_url: formData.image_url || null,
        category: formData.category || null,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt || null,
        author_name: formData.author_name,
        author_email: formData.author_email,
        published: formData.published,
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
      tags: blog.tags?.join(", ") || "",
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      author_name: blog.author_name,
      author_email: blog.author_email,
      published: blog.published || false,
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
      author_name: "",
      author_email: "",
      published: false,
    });
    setEditingBlog(null);
    setIsEditing(false);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
    <div className="space-y-6">
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
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog title"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Author Name *</Label>
                  <Input
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Author Email *</Label>
                  <Input
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Technology, Marketing, etc."
                  />
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
                {formData.image_url && (
                  <div className="mb-2">
                    <img src={formData.image_url} alt="Preview" className="h-32 w-full object-cover rounded" />
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
                <Label>Published</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="flex">
              {blog.image_url && (
                <img src={blog.image_url} alt={blog.title} className="w-40 h-32 object-cover" />
              )}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {blog.author_name} • {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    {blog.excerpt && (
                      <p className="text-sm mt-1 line-clamp-2">{blog.excerpt}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {blog.category && <Badge variant="secondary">{blog.category}</Badge>}
                      {blog.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(blog)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredBlogs.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            No blogs found. Click "New Blog" to create your first blog post.
          </Card>
        )}
      </div>
    </div>
  );
}
