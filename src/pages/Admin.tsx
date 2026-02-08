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
  setDoc,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Settings,
  Key,
  Save,
  FileText,
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

interface Settings {
  openai_api_key: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("posts");

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

  // Settings state
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

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

        // Load settings
        const settingsDoc = await getDoc(doc(db, "settings", "openai"));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          setOpenaiApiKey(data.api_key || "");
        }
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
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir post");
    },
  });

  const saveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, "settings", "openai"), {
        api_key: openaiApiKey,
        updated_at: Timestamp.now(),
      });
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Por favor, insira um prompt");
      return;
    }

    // Check if API key is configured
    const settingsDoc = await getDoc(doc(db, "settings", "openai"));
    const apiKey = settingsDoc.exists() ? settingsDoc.data().api_key : null;

    if (!apiKey) {
      toast.error("Configure sua API Key do ChatGPT nas configurações");
      setActiveTab("settings");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Você é um especialista em controle de pragas e escreve artigos de blog para a empresa Bioforte Controle de Pragas e Ambiental. 
            
Suas respostas devem ser em português brasileiro e no formato JSON com a seguinte estrutura:
{
  "title": "Título do artigo",
  "excerpt": "Resumo curto do artigo (máximo 200 caracteres)",
  "content": "Conteúdo completo do artigo em formato markdown"
}

O conteúdo deve ser informativo, profissional e educativo, focando em:
- Prevenção de pragas
- Métodos de controle
- Saúde e segurança
- Dicas práticas para residências e empresas

Use formatação markdown no content: títulos (##), listas, negrito, etc.`
            },
            {
              role: "user",
              content: aiPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error("API Key inválida. Verifique nas configurações.");
        }
        throw new Error(errorData.error?.message || "Erro ao gerar conteúdo");
      }

      const data = await response.json();
      const messageContent = data.choices?.[0]?.message?.content;

      if (!messageContent) {
        throw new Error("Nenhum conteúdo recebido da IA");
      }

      // Try to parse the JSON response
      let parsedContent;
      try {
        const cleanContent = messageContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedContent = JSON.parse(cleanContent);
      } catch {
        parsedContent = {
          title: "Artigo Gerado",
          excerpt: messageContent.substring(0, 200),
          content: messageContent
        };
      }

      setTitle(parsedContent.title || "");
      setExcerpt(parsedContent.excerpt || "");
      setContent(parsedContent.content || "");
      
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
        slug: "",
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
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Bioforte" className="h-10" />
            <div>
              <h1 className="text-lg font-semibold text-white">Painel Administrativo</h1>
              <p className="text-sm text-slate-400">Gerenciamento do Blog</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUserEmail && (
              <span className="text-sm text-slate-400 hidden md:block">
                {currentUserEmail}
              </span>
            )}
            <Button variant="outline" onClick={handleLogout} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 border-slate-700 mb-6">
            <TabsTrigger value="posts" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Posts do Blog</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingPost ? "Editar Post" : "Novo Post"}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                      {editingPost
                        ? "Edite as informações do post"
                        : "Crie um novo post para o blog. Você pode usar o ChatGPT para gerar o conteúdo."}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* AI Section */}
                    <Card className="border-dashed border-slate-600 bg-slate-700/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2 text-white">
                          <Sparkles className="w-4 h-4 text-green-500" />
                          Gerar com ChatGPT
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Textarea
                          placeholder="Ex: Escreva um artigo sobre como prevenir infestação de baratas em cozinhas industriais"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          rows={2}
                          className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={generateWithAI}
                          disabled={isGenerating}
                          className="w-full bg-slate-600 hover:bg-slate-500 text-white"
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

                    <Separator className="bg-slate-700" />

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-200">Título *</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Título do artigo"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt" className="text-slate-200">Resumo</Label>
                        <Textarea
                          id="excerpt"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Breve descrição do artigo"
                          rows={2}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content" className="text-slate-200">Conteúdo * (Markdown suportado)</Label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Conteúdo completo do artigo..."
                          rows={10}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverImageUrl" className="text-slate-200">URL da Imagem de Capa</Label>
                        <Input
                          id="coverImageUrl"
                          value={coverImageUrl}
                          onChange={(e) => setCoverImageUrl(e.target.value)}
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                        {coverImageUrl && (
                          <div className="mt-2 rounded-lg overflow-hidden border border-slate-600">
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

                      <div className="flex items-center justify-between rounded-lg border border-slate-600 p-4 bg-slate-700/50">
                        <div className="space-y-0.5">
                          <Label className="text-slate-200">Publicar</Label>
                          <p className="text-sm text-slate-400">
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
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
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
                  <Card key={i} className="animate-pulse bg-slate-800 border-slate-700">
                    <div className="h-40 bg-slate-700" />
                    <CardHeader>
                      <div className="h-5 bg-slate-700 rounded w-3/4" />
                      <div className="h-4 bg-slate-700 rounded w-1/2 mt-2" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden bg-slate-800 border-slate-700">
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
                        <CardTitle className="text-base line-clamp-2 text-white">
                          {post.title}
                        </CardTitle>
                        <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600" : "bg-slate-600"}>
                          {post.published ? (
                            <Eye className="w-3 h-3 mr-1" />
                          ) : (
                            <EyeOff className="w-3 h-3 mr-1" />
                          )}
                          {post.published ? "Publicado" : "Rascunho"}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {format(post.created_at, "dd/MM/yyyy", { locale: ptBR })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {post.excerpt && (
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                          onClick={() => handleOpenDialog(post)}
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Excluir post?</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-400">
                                Esta ação não pode ser desfeita. O post será permanentemente excluído.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deletePostMutation.mutate(post.id)}
                                className="bg-red-600 hover:bg-red-700"
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
              <Card className="text-center py-12 bg-slate-800 border-slate-700">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Nenhum post criado</h3>
                  <p className="text-slate-400 mb-4">
                    Comece criando seu primeiro post para o blog
                  </p>
                  <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-green-500" />
                  Configurações do ChatGPT
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure sua API Key do OpenAI para gerar conteúdo com inteligência artificial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-slate-200">API Key do OpenAI</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={openaiApiKey}
                        onChange={(e) => setOpenaiApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={saveSettings}
                      disabled={isSavingSettings}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSavingSettings ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Obtenha sua API Key em{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      platform.openai.com/api-keys
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
