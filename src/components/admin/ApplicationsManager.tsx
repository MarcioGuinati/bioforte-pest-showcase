import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Loader2, FileText, Mail, Phone, Briefcase, GraduationCap, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position?: string;
  experience?: string;
  education?: string;
  message?: string;
  createdAt?: { toDate: () => Date };
}

export const ApplicationsManager = () => {
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Application[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "applications", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      toast.success("Candidatura removida!");
    },
    onError: () => toast.error("Erro ao remover candidatura"),
  });

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
        <div>
          <h2 className="text-2xl font-bold text-foreground">Candidaturas</h2>
          <p className="text-sm text-muted-foreground">
            {applications?.length || 0} candidatura(s) recebida(s)
          </p>
        </div>
      </div>

      {applications?.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma candidatura recebida</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications?.map((app) => (
            <Card key={app.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {app.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {app.phone}
                      </span>
                    </div>
                    {app.position && (
                      <Badge variant="outline" className="mt-2">
                        <Briefcase className="w-3 h-3 mr-1" /> {app.position}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" /> Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg bg-card border-border">
                        <DialogHeader>
                          <DialogTitle>Detalhes da Candidatura</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Nome</label>
                            <p className="text-foreground">{app.name}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                              <p className="text-foreground">{app.email}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                              <p className="text-foreground">{app.phone}</p>
                            </div>
                          </div>
                          {app.position && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Vaga de Interesse</label>
                              <p className="text-foreground">{app.position}</p>
                            </div>
                          )}
                          {app.experience && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Experiência</label>
                              <p className="text-foreground">{app.experience}</p>
                            </div>
                          )}
                          {app.education && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Escolaridade</label>
                              <p className="text-foreground">{app.education}</p>
                            </div>
                          )}
                          {app.message && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
                              <p className="text-foreground whitespace-pre-wrap">{app.message}</p>
                            </div>
                          )}
                          {app.createdAt && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Data</label>
                              <p className="text-foreground">
                                {format(app.createdAt.toDate(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir candidatura?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMutation.mutate(app.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {app.experience && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {app.experience}
                    </span>
                  )}
                  {app.education && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> {app.education}
                    </span>
                  )}
                  {app.createdAt && (
                    <span>
                      {format(app.createdAt.toDate(), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
