import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Shield, 
  Leaf,
  CheckCircle,
  Target,
  Eye,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import companyBuilding from "@/assets/company-building.jpg";

const values = [
  {
    icon: Shield,
    title: "Segurança",
    description: "Priorizamos a segurança de nossos clientes, colaboradores e meio ambiente em todos os processos."
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos sempre a excelência na prestação de serviços, superando expectativas."
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Comprometidos com práticas sustentáveis e responsabilidade ambiental."
  },
  {
    icon: Heart,
    title: "Cuidado",
    description: "Tratamos cada cliente com cuidado, oferecendo soluções personalizadas."
  }
];

const timeline = [
  {
    year: "2008",
    title: "Fundação",
    description: "Início das atividades focando em dedetização residencial"
  },
  {
    year: "2012",
    title: "Expansão",
    description: "Ampliação para o mercado comercial e industrial"
  },
  {
    year: "2016",
    title: "Certificações",
    description: "Conquista da ISO 9001 e licenças ambientais"
  },
  {
    year: "2020",
    title: "Inovação",
    description: "Implementação de tecnologias sustentáveis"
  },
  {
    year: "2024",
    title: "Liderança",
    description: "Reconhecimento como líder regional em controle de pragas"
  }
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={companyBuilding}
            alt="Bioforte"
            className="w-full h-full object-cover parallax"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-bounce-slow hover-glow">Sobre a Bioforte</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              15 Anos Protegendo
              <span className="text-gradient"> Seu Ambiente</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-blur-in">
              Somos uma empresa especializada em controle integrado de pragas urbanas, 
              comprometida em oferecer soluções eficazes e sustentáveis para proteger 
              a saúde e o bem-estar de nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" style={{animationDelay: "3s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="hover-lift glass-strong border-0 animate-scale-bounce animate-stagger-1 group effect-3d-hover">
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:animate-wiggle">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Proteger a saúde e o bem-estar das pessoas através de soluções 
                  inovadoras e sustentáveis em controle de pragas, sempre priorizando 
                  a segurança e a qualidade.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="hover-lift glass-strong border-0 animate-scale-bounce animate-stagger-2 group effect-3d-hover">
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:animate-wiggle">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Ser reconhecida como a empresa líder em controle de pragas na região, 
                  referência em inovação, sustentabilidade e excelência no atendimento 
                  ao cliente.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="hover-lift glass-strong border-0 animate-scale-bounce animate-stagger-3 group effect-3d-hover">
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:animate-wiggle">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossos Valores</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Integridade, transparência, compromisso com a qualidade, 
                  respeito ao meio ambiente e dedicação total à satisfação 
                  dos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-56 h-56 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 animate-bounce-slow">Nossos Valores</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              O que nos <span className="text-gradient">move</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossos valores fundamentais orientam cada decisão e ação, 
              garantindo serviços de excelência.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`hover-lift glass-strong border-0 animate-scale-bounce animate-stagger-${index + 1} group effect-3d-hover`}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 animate-bounce-slow">Nossa História</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Trajetória de <span className="text-gradient">crescimento</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-start gap-6 animate-slide-in-left animate-stagger-${(index % 4) + 1} hover-lift group`}>
                  <div className="flex-shrink-0">
                    <div className="gradient-animated p-3 rounded-full group-hover:animate-wiggle">
                      <span className="text-primary-foreground font-bold text-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow glass-minimal p-4 rounded-lg hover-glow">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Certificações</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Qualidade <span className="text-primary">comprovada</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "ISO 9001:2015",
              "Licença Sanitária",
              "Certificação ANVISA",
              "Licença Ambiental"
            ].map((cert, index) => (
              <Card key={index} className="hover-lift glass border-0 text-center">
                <CardContent className="p-6">
                  <div className="gradient-primary p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Conheça nosso time de especialistas
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Profissionais altamente qualificados e certificados para atender 
            suas necessidades com excelência.
          </p>
          <Link to="/nosso-time">
            <Button variant="secondary" size="lg" className="font-semibold">
              Ver Nosso Time
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuemSomos;