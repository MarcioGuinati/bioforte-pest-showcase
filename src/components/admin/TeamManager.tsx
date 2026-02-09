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
import { Plus, Pencil, Trash2, Loader2, Users, Image } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  area: string;
  experience: string;
  certifications: string[];
  description: string;
  photo_url?: string;
}

export const TeamManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "team"));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TeamMember[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (member: Omit<TeamMember, "id">) => {
      await addDoc(collection(db, "team"), {
        ...member,
        created_at: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success("Membro adicionado com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Erro ao adicionar membro"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...member }: TeamMember) => {
      await updateDoc(doc(db, "team", id), {
        ...member,
        updated_at: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success("Membro atualizado com sucesso!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Erro ao atualizar membro"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "team", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success("Membro removido com sucesso!");
    },
    onError: () => toast.error("Erro ao remover membro"),
  });

  const resetForm = () => {
    setName("");
    setPosition("");
    setArea("");
    setExperience("");
    setCertifications("");
    setDescription("");
    setPhotoUrl("");
    setEditingMember(null);
  };

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setName(member.name);
      setPosition(member.position);
      setArea(member.area);
      setExperience(member.experience);
      setCertifications(member.certifications?.join(", ") || "");
      setDescription(member.description);
      setPhotoUrl(member.photo_url || "");
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!name.trim() || !position.trim()) {
      toast.error("Nome e cargo são obrigatórios");
      return;
    }

    const memberData = {
      name,
      position,
      area,
      experience,
      certifications: certifications.split(",").map(c => c.trim()).filter(Boolean),
      description,
      photo_url: photoUrl || undefined,
    };

    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, ...memberData });
    } else {
      createMutation.mutate(memberData);
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
        <h2 className="text-2xl font-bold text-foreground">Equipe</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Editar Membro" : "Novo Membro"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Cargo *</Label>
                  <Input value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Área</Label>
                  <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ex: Controle de Pragas" />
                </div>
                <div className="space-y-2">
                  <Label>Experiência</Label>
                  <Input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Ex: 10 anos de experiência" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL da Foto</Label>
                <Input 
                  value={photoUrl} 
                  onChange={(e) => setPhotoUrl(e.target.value)} 
                  placeholder="https://exemplo.com/foto.jpg"
                />
                {photoUrl && (
                  <div className="mt-2 flex items-center gap-3">
                    <img 
                      src={photoUrl} 
                      alt="Preview" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-sm text-muted-foreground">Preview da foto</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Certificações (separadas por vírgula)</Label>
                <Input 
                  value={certifications} 
                  onChange={(e) => setCertifications(e.target.value)} 
                  placeholder="Ex: ANVISA, ISO 9001, Técnico em Pragas"
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3}
                  placeholder="Breve descrição sobre o profissional..."
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
                {editingMember ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {members?.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum membro cadastrado</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members?.map((member) => (
            <Card key={member.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  {member.photo_url ? (
                    <img 
                      src={member.photo_url} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {member.area && (
                  <Badge variant="outline" className="mb-2">{member.area}</Badge>
                )}
                {member.experience && (
                  <p className="text-sm text-muted-foreground mb-3">{member.experience}</p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleOpenDialog(member)}>
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
                        <AlertDialogTitle>Excluir membro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate(member.id)}>
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
      )}
    </div>
  );
};
