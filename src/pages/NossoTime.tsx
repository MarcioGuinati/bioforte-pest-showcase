import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  Shield, 
  GraduationCap,
  Clock,
  CheckCircle,
  Star,
  Briefcase,
  Target,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/company-building.jpg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface TeamMember {
  name: string;
  position: string;
  area: string;
  experience: string;
  certifications: string[];
  description: string;
  photo_url?: string;
}

const certifications = [
  {
    title: "Certificações Técnicas",
    items: ["ANVISA", "Ministério da Saúde", "IBAMA", "Corpo de Bombeiros"]
  },
  {
    title: "Qualificações Profissionais", 
    items: ["CREA", "CRQ", "Técnicos Certificados", "Cursos de Especialização"]
  },
  {
    title: "Treinamentos Contínuos",
    items: ["Novas Tecnologias", "Segurança do Trabalho", "Atendimento ao Cliente", "Sustentabilidade"]
  },
  {
    title: "Certificações de Qualidade",
    items: ["ISO 9001", "ISO 14001", "OHSAS 18001", "Selo Verde"]
  }
];

const NossoTime = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const members: TeamMember[] = [];
        querySnapshot.forEach((doc) => {
          members.push(doc.data() as TeamMember);
        });
        setTeamMembers(members);
      } catch (error) {
        console.error("Erro ao buscar membros da equipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Nosso Time"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6">
              Nosso Time
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Especialistas
              <br />
              <span className="text-primary"> Certificados</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in">
              Nossa equipe é formada por profissionais altamente qualificados, 
              com certificações técnicas e anos de experiência no controle de pragas.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "25+", label: "Profissionais" },
              { icon: GraduationCap, number: "100%", label: "Certificados" },
              { icon: Clock, number: "200h", label: "Treinamento/Ano" },
              { icon: Award, number: "50+", label: "Certificações" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="gradient-primary p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Liderança</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Conheça nossos <span className="text-primary">especialistas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profissionais com formação acadêmica sólida e vasta experiência prática 
              no controle integrado de pragas.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 justify-items-center pt-16">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="relative w-[280px]"
                >
                  {/* Lanyard/Cordinha */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
                    {/* Cord going up */}
                    <div className="w-6 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-t-sm" />
                    {/* Metal clip */}
                    <div className="relative">
                      <div className="w-10 h-5 bg-gradient-to-b from-muted to-muted-foreground/30 rounded-sm border border-muted-foreground/40 shadow-md" />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-muted to-muted-foreground/20 rounded-sm" />
                    </div>
                    {/* Hook connecting to badge */}
                    <div className="w-3 h-3 border-2 border-muted-foreground/40 rounded-full bg-muted" />
                  </div>

                  {/* Badge Card */}
                  <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Badge Clip Hole */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-8 h-4 bg-muted rounded-full border-2 border-border shadow-inner" />
                    </div>
                    
                    {/* Header with Logo */}
                    <div className="pt-10 pb-4 px-6 text-center bg-gradient-to-b from-muted/50 to-transparent">
                      <span className="text-primary font-bold text-lg tracking-wide">Bioforte</span>
                      <p className="text-[10px] text-muted-foreground">Controle de Pragas e Ambiental</p>
                    </div>

                  {/* Photo Frame */}
                  <div className="flex justify-center px-6 pb-4">
                    <div className="relative">
                      {/* Green frame corners */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                      
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={member.name}
                          className="w-28 h-28 object-cover bg-muted"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-28 h-28 bg-muted flex items-center justify-center ${member.photo_url ? 'hidden' : ''}`}>
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Name Banner */}
                  <div className="gradient-primary py-3 px-4 text-center">
                    <h3 className="text-lg font-bold text-primary-foreground uppercase tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm font-medium">
                      {member.position}
                    </p>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 space-y-2 bg-card">
                    {member.area && (
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground w-28 flex-shrink-0">Departamento :</span>
                        <span className="font-medium text-foreground">{member.area}</span>
                      </div>
                    )}
                    
                    {member.experience && (
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground w-28 flex-shrink-0">Experiência :</span>
                        <span className="font-medium text-foreground">{member.experience}</span>
                      </div>
                    )}

                    {member.certifications && member.certifications.length > 0 && (
                      <div className="flex items-start text-sm">
                        <span className="text-muted-foreground w-28 flex-shrink-0">Certificações :</span>
                        <span className="font-medium text-foreground">{member.certifications.join(", ")}</span>
                      </div>
                    )}
                  </div>

                    {/* Barcode Footer */}
                    <div className="gradient-primary px-4 py-3">
                      <div className="flex justify-center gap-[2px]">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-primary-foreground/90"
                            style={{ 
                              width: i % 3 === 0 ? '2px' : '1px', 
                              height: '20px' 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Qualificações</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Certificações e <span className="text-primary">treinamentos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Investimos constantemente na capacitação da nossa equipe para 
              garantir serviços de máxima qualidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6">
                  <div className="gradient-primary p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-4 text-center">{cert.title}</h3>
                  <ul className="space-y-2">
                    {cert.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Development */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Desenvolvimento</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Compromisso com a <span className="text-primary">excelência</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Treinamento Contínuo</h3>
                <div className="space-y-4 mb-8">
                  {[
                    "Atualização constante sobre novas tecnologias",
                    "Cursos de segurança e saúde ocupacional",
                    "Capacitação em atendimento ao cliente",
                    "Workshops sobre sustentabilidade",
                    "Certificações técnicas obrigatórias",
                    "Programas de desenvolvimento profissional"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/trabalhe-conosco">
                  <Button variant="hero" size="lg" className="font-semibold">
                    Trabalhe Conosco
                  </Button>
                </Link>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Parcerias Acadêmicas",
                    description: "Colaboração com universidades para pesquisa e desenvolvimento"
                  },
                  {
                    title: "Centro de Treinamento",
                    description: "Instalações próprias para capacitação prática da equipe"
                  },
                  {
                    title: "Programa de Mentoria", 
                    description: "Desenvolvimento de novos profissionais por especialistas sênior"
                  }
                ].map((program, index) => (
                  <Card key={index} className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="gradient-primary p-2 rounded-lg">
                          <Target className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">{program.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {program.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Culture */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Nossa Cultura</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Valores que nos <span className="text-primary">guiam</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nosso time compartilha valores fundamentais que se refletem 
              na qualidade dos nossos serviços.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Segurança Primeiro",
                  description: "Priorizamos a segurança em todos os processos",
                  icon: Shield
                },
                {
                  title: "Excelência Técnica", 
                  description: "Buscamos sempre a perfeição nos resultados",
                  icon: Award
                },
                {
                  title: "Compromisso Total",
                  description: "Dedicação máxima à satisfação do cliente",
                  icon: Users
                }
              ].map((value, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-8 text-center">
                    <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Quer fazer parte do nosso time?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Estamos sempre em busca de profissionais dedicados e comprometidos 
            com a excelência no atendimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trabalhe-conosco">
              <Button variant="secondary" size="lg" className="font-semibold">
                Ver Vagas Disponíveis
              </Button>
            </Link>
            <Link to="/contato">
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Entre em Contato
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NossoTime;