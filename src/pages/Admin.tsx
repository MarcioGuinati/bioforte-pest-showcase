import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDoc,
  Timestamp 
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logoImage from "@/assets/logo-bioforte.png";

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
}

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [published, setPublished] = useState(false);

  // AI state
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        navigate("/admin/login");
        return;
      }

      try {
        // Check if user has admin role
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        
        if (!adminDoc.exists() || !adminDoc.data()?.isAdmin) {
          await signOut(auth);
          navigate("/admin/login");
          return;
        }

        setCurrentUserEmail(user.email);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        await signOut(auth);
        navigate("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(postsRef, orderBy("created_at", "desc"));
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate() || new Date(),
        updated_at: doc.data().updated_at?.toDate() || new Date(),
      })) as BlogPost[];
    },
    enabled: isAuthenticated,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50) + "-" + Date.now().toString(36);
  };

  const createPostMutation = useMutation({
    mutationFn: async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
      const postsRef = collection(db, "blog_posts");
      const now = Timestamp.now();
      
      const docRef = await addDoc(postsRef, {
        ...post,
        slug: generateSlug(post.title),
        author_email: currentUserEmail,
        created_at: now,
        updated_at: now,
      });
      
      return { id: docRef.id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post criado com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao criar post");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, ...post }: Partial<BlogPost> & { id: string }) => {
      const postRef = doc(db, "blog_posts", id);
      await updateDoc(postRef, {
        ...post,
        updated_at: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post atualizado com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar post");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const postRef = doc(db, "blog_posts", id);
      await deleteDoc(postRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir post");
    },
  });

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Por favor, insira um prompt");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt: aiPrompt }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar conteúdo");
      }

      const data = await response.json();

      setTitle(data.title || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
      
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao gerar conteúdo com IA");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImageUrl("");
    setPublished(false);
    setAiPrompt("");
    setEditingPost(null);
  };

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setExcerpt(post.excerpt || "");
      setContent(post.content);
      setCoverImageUrl(post.cover_image_url || "");
      setPublished(post.published);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }

    if (editingPost) {
      updatePostMutation.mutate({
        id: editingPost.id,
        title,
        excerpt: excerpt || null,
        content,
        cover_image_url: coverImageUrl || null,
        published,
      });
    } else {
      createPostMutation.mutate({
        title,
        slug: "", // Will be generated in mutation
        excerpt: excerpt || null,
        content,
        cover_image_url: coverImageUrl || null,
        published,
        author_email: currentUserEmail,
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Bioforte" className="h-10" />
            <div>
              <h1 className="text-lg font-semibold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Gerenciamento do Blog</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUserEmail && (
              <span className="text-sm text-muted-foreground hidden md:block">
                {currentUserEmail}
              </span>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Posts do Blog</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? "Editar Post" : "Novo Post"}
                </DialogTitle>
                <DialogDescription>
                  {editingPost
                    ? "Edite as informações do post"
                    : "Crie um novo post para o blog. Você pode usar a IA para gerar o conteúdo."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* AI Section */}
                <Card className="border-dashed">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Gerar com Inteligência Artificial
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      placeholder="Ex: Escreva um artigo sobre como prevenir infestação de baratas em cozinhas industriais"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={generateWithAI}
                      disabled={isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Gerando conteúdo...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Gerar Conteúdo
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Separator />

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Título do artigo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Breve descrição do artigo"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo * (Markdown suportado)</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Conteúdo completo do artigo..."
                      rows={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImageUrl">URL da Imagem de Capa</Label>
                    <Input
                      id="coverImageUrl"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    {coverImageUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={coverImageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Publicar</Label>
                      <p className="text-sm text-muted-foreground">
                        O post ficará visível no site
                      </p>
                    </div>
                    <Switch
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={createPostMutation.isPending || updatePostMutation.isPending}
                >
                  {(createPostMutation.isPending || updatePostMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingPost ? "Salvar" : "Criar Post"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts List */}
        {isLoadingPosts ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-muted" />
                <CardHeader>
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.cover_image_url && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? (
                        <Eye className="w-3 h-3 mr-1" />
                      ) : (
                        <EyeOff className="w-3 h-3 mr-1" />
                      )}
                      {post.published ? "Publicado" : "Rascunho"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="w-3 h-3" />
                    {format(post.created_at, "dd/MM/yyyy", { locale: ptBR })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenDialog(post)}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O post será permanentemente excluído.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deletePostMutation.mutate(post.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Nenhum post criado</h3>
              <p className="text-muted-foreground mb-4">
                Comece criando seu primeiro post para o blog
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Post
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;
