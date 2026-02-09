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
import { Trash2, Loader2, MessageSquare, Mail, Phone, Eye, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  urgency?: string;
  property?: string;
  area?: string;
  problem?: string;
  message?: string;
  createdAt?: { toDate: () => Date };
}

const urgencyColors: Record<string, string> = {
  baixa: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  media: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  alta: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  emergencia: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

const urgencyLabels: Record<string, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  emergencia: "Emergência",
};

export const ContactsManager = () => {
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "contacts", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      toast.success("Contato removido!");
    },
    onError: () => toast.error("Erro ao remover contato"),
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
          <h2 className="text-2xl font-bold text-foreground">Contatos</h2>
          <p className="text-sm text-muted-foreground">
            {contacts?.length || 0} contato(s) recebido(s)
          </p>
        </div>
      </div>

      {contacts?.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum contato recebido</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts?.map((contact) => (
            <Card key={contact.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      {contact.urgency && (
                        <Badge className={urgencyColors[contact.urgency] || ""}>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {urgencyLabels[contact.urgency] || contact.urgency}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {contact.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {contact.phone}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {contact.service && (
                        <Badge variant="outline">{contact.service}</Badge>
                      )}
                      {contact.problem && (
                        <Badge variant="secondary">{contact.problem}</Badge>
                      )}
                    </div>
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
                          <DialogTitle>Detalhes do Contato</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Nome</label>
                            <p className="text-foreground">{contact.name}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                              <p className="text-foreground">{contact.email}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                              <p className="text-foreground">{contact.phone}</p>
                            </div>
                          </div>
                          {contact.service && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Serviço</label>
                              <p className="text-foreground">{contact.service}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            {contact.urgency && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Urgência</label>
                                <p className="text-foreground">{urgencyLabels[contact.urgency] || contact.urgency}</p>
                              </div>
                            )}
                            {contact.property && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Tipo de Imóvel</label>
                                <p className="text-foreground">{contact.property}</p>
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {contact.area && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Área (m²)</label>
                                <p className="text-foreground">{contact.area}</p>
                              </div>
                            )}
                            {contact.problem && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Tipo de Praga</label>
                                <p className="text-foreground">{contact.problem}</p>
                              </div>
                            )}
                          </div>
                          {contact.message && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
                              <p className="text-foreground whitespace-pre-wrap">{contact.message}</p>
                            </div>
                          )}
                          {contact.createdAt && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Data</label>
                              <p className="text-foreground">
                                {format(contact.createdAt.toDate(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
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
                          <AlertDialogTitle>Excluir contato?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMutation.mutate(contact.id)}>
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
                  {contact.property && <span>{contact.property}</span>}
                  {contact.area && <span>{contact.area} m²</span>}
                  {contact.createdAt && (
                    <span>
                      {format(contact.createdAt.toDate(), "dd/MM/yyyy HH:mm", { locale: ptBR })}
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
