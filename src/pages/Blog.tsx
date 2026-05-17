import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">Blog</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Conhecimento sobre{" "}
              <span className="text-gradient">Controle de Pragas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Artigos informativos sobre prevenção, controle e dicas para manter seu ambiente livre de pragas.
            </p>
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
