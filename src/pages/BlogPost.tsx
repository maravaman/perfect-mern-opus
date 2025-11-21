import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/knight21/Header";
import Footer from "@/components/knight21/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

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
  created_at: string;
  updated_at: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero pattern-dots">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-hero pattern-dots">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pattern-dots">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {post.image_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins text-gradient">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center glass-card p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 font-poppins">
            Want to Learn More?
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore our courses and take your skills to the next level
          </p>
          <Link to="/courses">
            <Button size="lg" className="glow-effect">
              View Our Courses
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
