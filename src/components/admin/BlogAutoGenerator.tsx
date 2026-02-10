import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Sparkles,
  Loader2,
  Clock,
  Calendar,
  Check,
  X,
  Eye,
  Send,
  Trash2,
  RefreshCw,
  Settings,
  Plus,
  Minus,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DAYS_OF_WEEK = [
  { key: "monday", label: "Segunda-feira" },
  { key: "tuesday", label: "Terça-feira" },
  { key: "wednesday", label: "Quarta-feira" },
  { key: "thursday", label: "Quinta-feira" },
  { key: "friday", label: "Sexta-feira" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
];

interface ScheduleConfig {
  enabled: boolean;
  frequency: "hourly" | "daily" | "weekly";
  topics_by_day: Record<string, string[]>;
  updated_at?: Date;
}

interface AutoDraft {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_suggestion?: string;
  topic: string;
  status: "pending" | "published" | "rejected";
  created_at: Date;
  day_of_week: string;
}

const DEFAULT_CONFIG: ScheduleConfig = {
  enabled: false,
  frequency: "daily",
  topics_by_day: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
};

interface BlogAutoGeneratorProps {
  currentUserEmail: string | null;
  currentUserName: string | null;
}

const SCHEDULED_HOUR_BRT = 6; // 06:00 horário de Brasília

function getBrazilDate(): Date {
  const now = new Date();
  const brazilOffset = -3 * 60;
  return new Date(now.getTime() + (brazilOffset + now.getTimezoneOffset()) * 60000);
}

function getTodayDateKey(): string {
  const brt = getBrazilDate();
  return `${brt.getFullYear()}-${String(brt.getMonth() + 1).padStart(2, '0')}-${String(brt.getDate()).padStart(2, '0')}`;
}

const DAYS_MAP: Record<number, string> = {
  0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday",
  4: "thursday", 5: "friday", 6: "saturday",
};

export function BlogAutoGenerator({ currentUserEmail, currentUserName }: BlogAutoGeneratorProps) {
  const queryClient = useQueryClient();
  const [config, setConfig] = useState<ScheduleConfig>(DEFAULT_CONFIG);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingManual, setIsGeneratingManual] = useState(false);
  const [newTopicInputs, setNewTopicInputs] = useState<Record<string, string>>({});
  const [autoGenStatus, setAutoGenStatus] = useState<string | null>(null);

  // Load config from Firestore
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configDoc = await getDoc(doc(db, "blog_schedule_config", "main"));
        if (configDoc.exists()) {
          const data = configDoc.data();
          setConfig({
            enabled: data.enabled ?? false,
            frequency: data.frequency ?? "daily",
            topics_by_day: data.topics_by_day ?? DEFAULT_CONFIG.topics_by_day,
            updated_at: data.updated_at?.toDate(),
          });
        }
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };
    loadConfig();
  }, []);

  // Auto-generation check: runs on load, triggers if 06:00 BRT passed and today not yet generated
  useEffect(() => {
    const checkAndAutoGenerate = async () => {
      try {
        const configDoc = await getDoc(doc(db, "blog_schedule_config", "main"));
        if (!configDoc.exists()) return;
        const data = configDoc.data();
        if (!data.enabled) return;

        const brt = getBrazilDate();
        if (brt.getHours() < SCHEDULED_HOUR_BRT) return; // Too early

        const todayKey = getTodayDateKey();
        const lastRunDoc = await getDoc(doc(db, "blog_schedule_config", "last_run"));
        if (lastRunDoc.exists() && lastRunDoc.data().date === todayKey) return; // Already ran today

        const dayKey = DAYS_MAP[brt.getDay()];
        const topicsByDay = data.topics_by_day || {};
        const todayTopics = topicsByDay[dayKey] || [];
        if (todayTopics.length === 0) return;

        const topic = todayTopics[Math.floor(Math.random() * todayTopics.length)];
        setAutoGenStatus(`Gerando automaticamente sobre "${topic}"...`);

        // Call edge function to generate
        const { data: result, error } = await supabase.functions.invoke("auto-generate-blog");

        if (error) {
          console.error("Auto-gen error:", error);
          setAutoGenStatus("Erro na geração automática");
          return;
        }

        // Mark today as done
        await setDoc(doc(db, "blog_schedule_config", "last_run"), {
          date: todayKey,
          topic,
          generated_at: Timestamp.now(),
        });

        queryClient.invalidateQueries({ queryKey: ["blog-auto-drafts"] });
        setAutoGenStatus(`✅ Gerado: "${result?.title || topic}"`);
        toast.success("Conteúdo do dia gerado automaticamente!");
      } catch (error) {
        console.error("Auto-generate check error:", error);
        setAutoGenStatus(null);
      }
    };

    checkAndAutoGenerate();
  }, [queryClient]);

  // Load drafts from Firestore
  const { data: drafts, isLoading: isLoadingDrafts } = useQuery({
    queryKey: ["blog-auto-drafts"],
    queryFn: async () => {
      const draftsRef = collection(db, "blog_auto_drafts");
      const q = query(draftsRef, orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        created_at: d.data().created_at?.toDate() || new Date(),
      })) as AutoDraft[];
    },
  });

  const saveConfig = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "blog_schedule_config", "main"), {
        ...config,
        updated_at: Timestamp.now(),
      });
      toast.success("Configuração salva com sucesso!");
    } catch (error) {
      console.error("Error saving config:", error);
      toast.error("Erro ao salvar configuração");
    } finally {
      setIsSaving(false);
    }
  };

  const addTopic = (day: string) => {
    const topic = newTopicInputs[day]?.trim();
    if (!topic) return;

    setConfig((prev) => ({
      ...prev,
      topics_by_day: {
        ...prev.topics_by_day,
        [day]: [...(prev.topics_by_day[day] || []), topic],
      },
    }));
    setNewTopicInputs((prev) => ({ ...prev, [day]: "" }));
  };

  const removeTopic = (day: string, index: number) => {
    setConfig((prev) => ({
      ...prev,
      topics_by_day: {
        ...prev.topics_by_day,
        [day]: prev.topics_by_day[day].filter((_, i) => i !== index),
      },
    }));
  };

  const generateDraftNow = async (topic: string, dayKey: string) => {
    setIsGeneratingManual(true);
    try {
      const prompt = `Escreva um artigo completo e detalhado sobre: ${topic}. \
O artigo deve ser relevante para o contexto de controle de pragas e dedetização.\nInclua dicas práticas, informações sobre prevenção e quando procurar ajuda profissional.\nSugira também uma descrição de imagem de capa ideal para o artigo.`;

      const { data, error } = await supabase.functions.invoke("generate-blog-content", {
        body: { prompt },
      });

      if (error) throw error;

      // Save draft to Firestore
      await addDoc(collection(db, "blog_auto_drafts"), {
        title: data.title || "Rascunho Gerado",
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover_image_suggestion: data.cover_image_suggestion || `Imagem sobre ${topic}`,
        topic,
        status: "pending",
        day_of_week: dayKey,
        created_at: Timestamp.now(),
      });

      queryClient.invalidateQueries({ queryKey: ["blog-auto-drafts"] });
      toast.success("Rascunho gerado com sucesso!");
    } catch (error) {
      console.error("Error generating draft:", error);
      toast.error("Erro ao gerar rascunho. Tente novamente.");
    } finally {
      setIsGeneratingManual(false);
    }
  };

  const publishDraft = async (draft: AutoDraft) => {
    try {
      const generateSlug = (text: string) =>
        text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50) +
        "-" +
        Date.now().toString(36);

      // Create blog post in Firestore
      await addDoc(collection(db, "blog_posts"), {
        title: draft.title,
        slug: generateSlug(draft.title),
        excerpt: draft.excerpt,
        content: draft.content,
        cover_image_url: draft.cover_image_url || null,
        published: true,
        author_email: currentUserEmail,
        author_name: currentUserName,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      // Update draft status
      await updateDoc(doc(db, "blog_auto_drafts", draft.id), {
        status: "published",
      });

      queryClient.invalidateQueries({ queryKey: ["blog-auto-drafts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post publicado com sucesso!");
    } catch (error) {
      console.error("Error publishing draft:", error);
      toast.error("Erro ao publicar rascunho");
    }
  };

  const rejectDraft = async (draftId: string) => {
    try {
      await updateDoc(doc(db, "blog_auto_drafts", draftId), {
        status: "rejected",
      });
      queryClient.invalidateQueries({ queryKey: ["blog-auto-drafts"] });
      toast.success("Rascunho rejeitado");
    } catch (error) {
      toast.error("Erro ao rejeitar rascunho");
    }
  };

  const deleteDraft = async (draftId: string) => {
    try {
      await deleteDoc(doc(db, "blog_auto_drafts", draftId));
      queryClient.invalidateQueries({ queryKey: ["blog-auto-drafts"] });
      toast.success("Rascunho excluído");
    } catch (error) {
      toast.error("Erro ao excluir rascunho");
    }
  };

  const pendingDrafts = drafts?.filter((d) => d.status === "pending") || [];
  const processedDrafts = drafts?.filter((d) => d.status !== "pending") || [];

  return (
    <div className="space-y-6">
      {/* Auto-generation status */}
      {autoGenStatus && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-3">
            {autoGenStatus.startsWith("✅") ? (
              <Check className="w-5 h-5 text-primary" />
            ) : autoGenStatus.startsWith("Erro") ? (
              <X className="w-5 h-5 text-destructive" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">{autoGenStatus}</p>
              <p className="text-xs text-muted-foreground">
                Agendamento automático diário às 06:00 (horário de Brasília)
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Config Section */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuração da Automação
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure a rotina de geração automática de conteúdo por IA
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="automation-enabled" className="text-sm text-muted-foreground">
                {config.enabled ? "Ativo" : "Inativo"}
              </Label>
              <Switch
                id="automation-enabled"
                checked={config.enabled}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, enabled: checked }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Frequency */}
          <div className="space-y-2">
            <Label className="text-foreground">Frequência de Geração</Label>
            <Select
              value={config.frequency}
              onValueChange={(value: "hourly" | "daily" | "weekly") =>
                setConfig((prev) => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger className="w-full max-w-xs bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    A cada hora
                  </div>
                </SelectItem>
                <SelectItem value="daily">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Diariamente
                  </div>
                </SelectItem>
                <SelectItem value="weekly">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Semanalmente
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-border" />

          {/* Topics by Day */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-semibold">Temas por Dia da Semana</Label>
            <p className="text-sm text-muted-foreground">
              Defina os temas que a IA deve abordar em cada dia. Você pode adicionar múltiplos temas por dia.
            </p>

            <div className="grid gap-4">
              {DAYS_OF_WEEK.map(({ key, label }) => (
                <Card key={key} className="border-border bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{label}</h4>
                      <Badge variant="outline" className="text-xs">
                        {config.topics_by_day[key]?.length || 0} tema(s)
                      </Badge>
                    </div>

                    {/* Existing topics */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(config.topics_by_day[key] || []).map((topic, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {topic}
                          <button
                            onClick={() => removeTopic(key, idx)}
                            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    {/* Add topic input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: Barata, Escorpião, Dengue..."
                        value={newTopicInputs[key] || ""}
                        onChange={(e) =>
                          setNewTopicInputs((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTopic(key);
                          }
                        }}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addTopic(key)}
                        className="shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      {(config.topics_by_day[key]?.length || 0) > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const topics = config.topics_by_day[key] || [];
                            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
                            generateDraftNow(randomTopic, key);
                          }}
                          disabled={isGeneratingManual}
                          className="shrink-0"
                        >
                          {isGeneratingManual ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-1" />
                              Gerar
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          <Button onClick={saveConfig} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Salvar Configuração
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pending Drafts */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Rascunhos Pendentes
            {pendingDrafts.length > 0 && (
              <Badge className="ml-2">{pendingDrafts.length}</Badge>
            )}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Revise e publique os conteúdos gerados automaticamente pela IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingDrafts ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : pendingDrafts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>Nenhum rascunho pendente.</p>
              <p className="text-sm mt-1">
                Configure os temas acima e clique em "Gerar" para criar rascunhos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingDrafts.map((draft) => (
                <Card key={draft.id} className="border-border bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {DAYS_OF_WEEK.find((d) => d.key === draft.day_of_week)?.label || draft.day_of_week}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {draft.topic}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">{draft.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{draft.excerpt}</p>
                        <p className="text-xs text-muted-foreground">
                          Gerado em {format(draft.created_at, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                        {draft.cover_image_suggestion && (
                          <p className="text-xs text-muted-foreground mt-1">
                            📷 Sugestão de imagem: {draft.cover_image_suggestion}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => publishDraft(draft)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Publicar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectDraft(draft.id)}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Rejeitar
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir rascunho?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteDraft(draft.id)}>
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    {/* Preview content */}
                    <details className="mt-3">
                      <summary className="text-sm text-primary cursor-pointer flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Pré-visualizar conteúdo
                      </summary>
                      <div className="mt-2 p-3 bg-background rounded-md border border-border text-sm max-h-60 overflow-y-auto whitespace-pre-wrap">
                        {draft.content}
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* History */}
      {processedDrafts.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {processedDrafts.slice(0, 10).map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/20"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge
                      variant={draft.status === "published" ? "default" : "destructive"}
                      className="text-xs shrink-0"
                    >
                      {draft.status === "published" ? "Publicado" : "Rejeitado"}
                    </Badge>
                    <span className="text-sm text-foreground truncate">{draft.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {format(draft.created_at, "dd/MM", { locale: ptBR })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
