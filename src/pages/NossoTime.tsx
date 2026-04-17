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
import heroImage from "@/assets/tecnicos.jpeg";
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
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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
                <div className="flex items-center justify-center mb-4" aria-hidden="true">
                  <div className="gradient-primary p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="glass overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Photo & Name Header */}
                    <div className="gradient-primary p-6 text-center">
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={`Foto de ${member.name}`}
                          width={96}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-foreground/30 shadow-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-24 h-24 rounded-full mx-auto mb-4 bg-primary-foreground/20 flex items-center justify-center ${member.photo_url ? 'hidden' : ''}`}>
                        <Users className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary-foreground/80 font-medium">
                        {member.position}
                      </p>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 space-y-4">
                      {member.area && (
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Departamento</p>
                            <p className="font-medium text-foreground">{member.area}</p>
                          </div>
                        </div>
                      )}
                      
                      {member.experience && (
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Experiência</p>
                            <p className="font-medium text-foreground">{member.experience}</p>
                          </div>
                        </div>
                      )}

                      {member.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {member.description}
                        </p>
                      )}

                      {member.certifications && member.certifications.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Certificações</p>
                          <div className="flex flex-wrap gap-1.5">
                            {member.certifications.map((cert, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1 text-accent" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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