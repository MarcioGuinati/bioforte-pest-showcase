import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  Award, 
  Shield, 
  TrendingUp,
  Heart,
  CheckCircle,
  Upload,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Loader2
} from "lucide-react";
import heroImage from "@/assets/equipment.jpg";

const benefits = [
  {
    icon: DollarSign,
    title: "Salário Competitivo",
    description: "Remuneração acima do mercado e participação nos resultados"
  },
  {
    icon: GraduationCap,
    title: "Desenvolvimento",
    description: "Cursos, certificações e treinamentos contínuos"
  },
  {
    icon: Heart,
    title: "Plano de Saúde",
    description: "Assistência médica e odontológica para você e família"
  },
  {
    icon: Clock,
    title: "Horário Flexível",
    description: "Flexibilidade para equilibrar vida pessoal e profissional"
  },
  {
    icon: TrendingUp,
    title: "Crescimento",
    description: "Plano de carreira estruturado e oportunidades internas"
  },
  {
    icon: Users,
    title: "Ambiente Colaborativo",
    description: "Equipe unida e ambiente de trabalho saudável"
  }
];

interface Job {
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
  modality?: string;
}

const TrabalheConosco = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    message: ""
  });
  const [openPositions, setOpenPositions] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobs");
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobsList = jobsSnapshot.docs.map(doc => doc.data() as Job);
        setOpenPositions(jobsList);
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
        toast({
          title: "Erro ao carregar vagas",
          description: "Não foi possível carregar as vagas disponíveis.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: formData.position || null,
            experience: formData.experience || null,
            education: formData.education || null,
            message: formData.message || null
          }
        ]);

      if (error) throw error;

      toast({
        title: "Candidatura Enviada!",
        description: "Recebemos sua candidatura. Entraremos em contato em breve.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        education: "",
        message: ""
      });
    } catch (error) {
      console.error("Erro ao enviar candidatura:", error);
      toast({
        title: "Erro ao enviar candidatura",
        description: "Ocorreu um erro ao enviar sua candidatura. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Trabalhe Conosco"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6">
              Trabalhe Conosco
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Faça Parte da
              <br />
              <span className="text-primary"> Nossa Equipe</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in">
              Junte-se a uma empresa líder no mercado de controle de pragas. 
              Oferecemos excelentes oportunidades de crescimento e desenvolvimento profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Por que Bioforte?</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Benefícios e <span className="text-primary">oportunidades</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Valorizamos nossos colaboradores e investimos no seu crescimento 
              pessoal e profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6 text-center">
                  <div className="gradient-primary p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Vagas Abertas</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Oportunidades <span className="text-primary">disponíveis</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : openPositions.length === 0 ? (
              <Card className="glass">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No momento não há vagas disponíveis. Envie sua candidatura mesmo assim!
                  </p>
                </CardContent>
              </Card>
            ) : (
              openPositions.map((position, index) => (
                <Card key={index} className="glass overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Position Info */}
                    <div className="flex-1 p-8">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold">{position.title}</h3>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.experience}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {position.description}
                      </p>

                      <div>
                        <h4 className="font-semibold mb-3">Requisitos:</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Section */}
                    <div className="lg:w-80 bg-primary/5 p-8 border-l border-primary/20">
                      <h4 className="font-bold text-lg mb-4">Candidatar-se</h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Interessado nesta vaga? Preencha o formulário abaixo 
                        ou envie seu currículo.
                      </p>
                      <div className="space-y-4">
                        <Button variant="hero" className="w-full">
                          Candidatar-se Agora
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Enviar Currículo
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Candidatura</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Envie sua <span className="text-primary">candidatura</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Não encontrou uma vaga específica? Envie seu currículo mesmo assim. 
                Sempre estamos em busca de talentos!
              </p>
            </div>

            <Card className="glass">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Vaga de Interesse</Label>
                      <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma vaga" />
                        </SelectTrigger>
                        <SelectContent>
                          {openPositions.map((position, index) => (
                            <SelectItem key={index} value={position.title}>
                              {position.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="outra">Outra oportunidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Anos de Experiência</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 anos</SelectItem>
                          <SelectItem value="2-5">2-5 anos</SelectItem>
                          <SelectItem value="5-10">5-10 anos</SelectItem>
                          <SelectItem value="10+">Mais de 10 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Escolaridade</Label>
                      <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                          <SelectItem value="medio">Ensino Médio</SelectItem>
                          <SelectItem value="tecnico">Técnico</SelectItem>
                          <SelectItem value="superior">Ensino Superior</SelectItem>
                          <SelectItem value="pos">Pós-graduação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem / Experiências Relevantes</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Conte um pouco sobre sua experiência e por que quer trabalhar conosco..."
                    />
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Anexe seu currículo (PDF, DOC ou DOCX - máx. 5MB)
                    </p>
                    <Button variant="outline" type="button">
                      Escolher Arquivo
                    </Button>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Enviar Candidatura
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Nossa Cultura</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ambiente de <span className="text-primary">crescimento</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Na Bioforte, acreditamos que pessoas felizes fazem o melhor trabalho. 
              Nossa cultura valoriza o desenvolvimento, a inovação e o bem-estar.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Inovação", desc: "Sempre buscamos novas soluções" },
                { title: "Colaboração", desc: "Trabalhamos em equipe" },
                { title: "Qualidade", desc: "Excelência em tudo que fazemos" },
                { title: "Sustentabilidade", desc: "Compromisso com o meio ambiente" }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="gradient-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Venha fazer parte de uma equipe que está transformando o mercado 
            de controle de pragas no Brasil.
          </p>
          <Button variant="secondary" size="lg" className="font-semibold">
            Enviar Candidatura Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TrabalheConosco;