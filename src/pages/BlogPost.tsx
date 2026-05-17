import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft, Share2, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { useBlogAnalytics } from "@/hooks/useBlogAnalytics";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: Date;
  updated_at: Date;
  author_email: string | null;
  author_name: string | null;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { trackView } = useBlogAnalytics();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(
        postsRef,
        where("slug", "==", slug),
        where("published", "==", true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        throw new Error("Post not found");
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate() || new Date(),
        updated_at: doc.data().updated_at?.toDate() || new Date(),
      } as BlogPost;
    },
    enabled: !!slug,
  });

  // Track view when post loads
  useEffect(() => {
    if (post) {
      trackView(post.id, post.slug, post.title);
    }
  }, [post, trackView]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Blog
          </Link>

          <Badge variant="outline" className="mb-4">Blog</Badge>
          
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(post.created_at, "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </span>
            </div>
            {post.author_name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="container mx-auto px-4 max-w-4xl -mt-4">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-xl font-semibold mb-4">Precisa de ajuda com pragas?</h3>
          <p className="text-muted-foreground mb-6">
            A Bioforte está pronta para ajudar você a manter seu ambiente livre de pragas.
          </p>
          <Button asChild variant="hero">
            <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">Solicitar Orçamento</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
