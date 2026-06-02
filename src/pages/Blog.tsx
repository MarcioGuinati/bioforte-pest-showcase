import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight, Brain, Cpu, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useBlogAnalytics } from "@/hooks/useBlogAnalytics";
import blogHero from "@/assets/blog-hero.png";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: Date;
  author_email: string | null;
  author_name: string | null;
}

const Blog = () => {
  const { trackClick } = useBlogAnalytics();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(
        postsRef,
        where("published", "==", true)
      );
      
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate() || new Date(),
      })) as BlogPost[];
      
      // Sort by created_at descending on client side
      return postsData.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    },
  });

  // Log for debugging
  console.log("Blog posts:", posts, "Error:", error);

  const handlePostClick = (post: BlogPost) => {
    trackClick(post.id, post.slug, post.title);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section — Centro de Inteligência Bioforte */}
      <section className="relative min-h-[480px] lg:min-h-[560px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={blogHero}
            alt="Centro de Inteligência Bioforte"
            width="1920"
            height="600"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Animated tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22c55e" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
          {/* Animated green orbs */}
          <div className="absolute top-12 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-8 right-10 w-40 h-40 bg-accent/15 rounded-full blur-2xl animate-float" style={{animationDelay: "1.5s"}} />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary bg-primary/10 hover-glow animate-fade-in">
              <Brain className="h-3 w-3 mr-1.5" />
              Centro de Inteligência Bioforte
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
              Blog{" "}
              <span className="text-gradient">Bioforte</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-blur-in max-w-2xl">
              Conteúdo técnico, prevenção inteligente e informação que protege.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-10 animate-fade-in" style={{animationDelay: "0.4s"}}>
              {[
                { icon: Brain, label: "Conteúdo técnico" },
                { icon: Cpu, label: "Inovação científica" },
                { icon: BarChart3, label: "Dados e análises" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  onClick={() => handlePostClick(post)}
                >
                  <Card className="overflow-hidden h-full group">
                    {post.cover_image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          width="400"
                          height="200"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {format(post.created_at, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                        </span>
                        {post.author_name && (
                          <span className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {post.author_name}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler mais <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum artigo publicado</h3>
              <p className="text-muted-foreground">
                Em breve novos conteúdos serão publicados aqui.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
