import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
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
import { Plus, Pencil, Trash2, Loader2, Briefcase, MapPin } from "lucide-react";

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
  modality?: string;
  active?: boolean;
}

export const JobsManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [modality, setModality] = useState("");

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Job[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (job: Omit<Job, "id">) => {
      await addDoc(collection(db, "jobs"), {
        ...job,
        active: true,
        created_at: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success("Vaga criada com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Erro ao criar vaga"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...job }: Job) => {
      await updateDoc(doc(db, "jobs", id), {
        ...job,
        updated_at: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success("Vaga atualizada com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Erro ao atualizar vaga"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "jobs", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success("Vaga removida com sucesso!");
    },
    onError: () => toast.error("Erro ao remover vaga"),
  });

  const resetForm = () => {
    setTitle("");
    setType("");
    setLocation("");
    setExperience("");
    setDescription("");
    setRequirements("");
    setModality("");
    setEditingJob(null);
  };

  const handleOpenDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setTitle(job.title);
      setType(job.type);
      setLocation(job.location);
      setExperience(job.experience);
      setDescription(job.description);
      setRequirements(job.requirements?.join("\n") || "");
      setModality(job.modality || "");
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!title.trim() || !location.trim()) {
      toast.error("Título e localização são obrigatórios");
      return;
    }

    const jobData = {
      title,
      type,
      location,
      experience,
      description,
      requirements: requirements.split("\n").map(r => r.trim()).filter(Boolean),
      modality,
    };

    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, ...jobData });
    } else {
      createMutation.mutate(jobData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Vagas</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Vaga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Editar Vaga" : "Nova Vaga"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Título da Vaga *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Técnico em Controle de Pragas" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Contrato</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Modalidade</Label>
                  <Select value={modality} onValueChange={setModality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Remoto">Remoto</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Localização *</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: Ribeirão Preto - SP" />
                </div>
                <div className="space-y-2">
                  <Label>Experiência</Label>
                  <Input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Ex: 2-3 anos" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3}
                  placeholder="Descrição da vaga e responsabilidades..."
                />
              </div>

              <div className="space-y-2">
                <Label>Requisitos (um por linha)</Label>
                <Textarea 
                  value={requirements} 
                  onChange={(e) => setRequirements(e.target.value)} 
                  rows={4}
                  placeholder="Ensino médio completo&#10;Experiência com atendimento ao cliente&#10;CNH categoria B"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button 
                onClick={handleSubmit} 
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingJob ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {jobs?.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma vaga cadastrada</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs?.map((job) => (
            <Card key={job.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      {job.type && <Badge variant="outline">{job.type}</Badge>}
                      {job.modality && <Badge variant="secondary">{job.modality}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleOpenDialog(job)}>
                      <Pencil className="w-3 h-3 mr-1" /> Editar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 mr-1" /> Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir vaga?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMutation.mutate(job.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              {job.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
