import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Search, Upload, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  author_email: string;
  category: string;
  tags: string[];
  image_url: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
  created_at: string;
}

export function BlogsTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author_name: "",
    author_email: "",
    category: "",
    tags: "",
    image_url: "",
    meta_title: "",
    meta_description: "",
    published: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          post.author_name.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
      setFilteredPosts(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch blog posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      newErrors.content = "Content is required";
    }

    if (!formData.author_name.trim()) {
      newErrors.author_name = "Author name is required";
    }

    if (!formData.author_email.trim()) {
      newErrors.author_email = "Author email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.author_email)) {
      newErrors.author_email = "Please enter a valid email address";
    }

    if (formData.meta_title && formData.meta_title.length > 60) {
      newErrors.meta_title = "Meta title should be under 60 characters for best SEO";
    }

    if (formData.meta_description && formData.meta_description.length > 160) {
      newErrors.meta_description = "Meta description should be under 160 characters for best SEO";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("knight21-uploads")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("knight21-uploads")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt,
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);

        if (error) throw error;
        toast.success("Blog post updated successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        toast.success("Blog post created successfully");
      }

      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error("Failed to save blog post");
      console.error(error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      author_name: post.author_name,
      author_email: post.author_email,
      category: post.category || "",
      tags: post.tags?.join(", ") || "",
      image_url: post.image_url || "",
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      published: post.published,
    });
    setImagePreview(post.image_url || "");
    setIsEditing(true);
    setErrors({});
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Blog post deleted successfully");
      fetchPosts();
    } catch (error: any) {
      toast.error("Failed to delete blog post");
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author_name: "",
      author_email: "",
      category: "",
      tags: "",
      image_url: "",
      meta_title: "",
      meta_description: "",
      published: true,
    });
    setEditingPost(null);
    setIsEditing(false);
    setImagePreview("");
    setErrors({});
  };

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground mt-1">Create and manage your blog posts</p>
        </div>
        <Button onClick={() => setIsEditing(true)} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, category, author, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Blog Form */}
      {isEditing && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">
                  {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                </CardTitle>
                <CardDescription>
                  Fill in all the details below to publish your blog post
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base">
                  Blog Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setErrors({ ...errors, title: "" });
                  }}
                  placeholder="Enter an engaging blog title"
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              {/* Category and Tags */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-base">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Digital Marketing, SEO, Web Design"
                  />
                </div>
                <div>
                  <Label htmlFor="tags" className="text-base">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="seo, marketing, social-media (comma-separated)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </div>

              {/* Feature Image Upload */}
              <div>
                <Label className="text-base">Feature Image</Label>
                <div className="mt-2 space-y-3">
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImagePreview("");
                          setFormData({ ...formData, image_url: "" });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <>Uploading...</>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </>
                      )}
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Max size: 5MB. Recommended: 1200x630px for best results
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt" className="text-base">Excerpt / Summary</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary that appears in blog listings"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <Label htmlFor="content" className="text-base">
                  Content <span className="text-destructive">*</span>
                </Label>
                <div className={`mt-2 ${errors.content ? "border-2 border-destructive rounded-md" : ""}`}>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => {
                      setFormData({ ...formData, content: value });
                      setErrors({ ...errors, content: "" });
                    }}
                    modules={quillModules}
                    className="bg-background"
                    placeholder="Write your blog content here..."
                  />
                </div>
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">{errors.content}</p>
                )}
              </div>

              {/* Author Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author_name" className="text-base">
                    Author Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => {
                      setFormData({ ...formData, author_name: e.target.value });
                      setErrors({ ...errors, author_name: "" });
                    }}
                    placeholder="John Doe"
                    className={errors.author_name ? "border-destructive" : ""}
                  />
                  {errors.author_name && (
                    <p className="text-sm text-destructive mt-1">{errors.author_name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="author_email" className="text-base">
                    Author Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => {
                      setFormData({ ...formData, author_email: e.target.value });
                      setErrors({ ...errors, author_email: "" });
                    }}
                    placeholder="john@example.com"
                    className={errors.author_email ? "border-destructive" : ""}
                  />
                  {errors.author_email && (
                    <p className="text-sm text-destructive mt-1">{errors.author_email}</p>
                  )}
                </div>
              </div>

              {/* SEO Fields */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  SEO Settings
                </h3>
                <div>
                  <Label htmlFor="meta_title" className="text-base">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => {
                      setFormData({ ...formData, meta_title: e.target.value });
                      setErrors({ ...errors, meta_title: "" });
                    }}
                    placeholder="SEO-optimized title (defaults to blog title)"
                    maxLength={60}
                    className={errors.meta_title ? "border-destructive" : ""}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.meta_title && (
                      <p className="text-sm text-destructive">{errors.meta_title}</p>
                    )}
                    <p className="text-xs text-muted-foreground ml-auto">
                      {formData.meta_title.length}/60 characters
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="meta_description" className="text-base">Meta Description</Label>
                  <Input
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => {
                      setFormData({ ...formData, meta_description: e.target.value });
                      setErrors({ ...errors, meta_description: "" });
                    }}
                    placeholder="SEO description (defaults to excerpt)"
                    maxLength={160}
                    className={errors.meta_description ? "border-destructive" : ""}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.meta_description && (
                      <p className="text-sm text-destructive">{errors.meta_description}</p>
                    )}
                    <p className="text-xs text-muted-foreground ml-auto">
                      {formData.meta_description.length}/160 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <div>
                  <Label htmlFor="published" className="text-base cursor-pointer">
                    Publish Status
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.published
                      ? "This post will be visible to everyone"
                      : "This post will be saved as a draft"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts Grid */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No blog posts found</p>
              <p className="text-sm">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first blog post to get started"}
              </p>
            </div>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail */}
                  {post.image_url && (
                    <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>

                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        By <span className="font-medium">{post.author_name}</span>
                      </span>
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}