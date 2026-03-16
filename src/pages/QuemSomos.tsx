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
  Heart,
  HelpCircle,
  MapPin,
  Clock,
  PawPrint,
  DollarSign,
  BadgeCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import companyBuilding from "@/assets/company-building.jpg";

const values = [
  {
    icon: Shield,
    title: "Honestidade",
    description: "Transparência e ética em todos os nossos processos e relações."
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Perícia técnica e excelência na prestação de cada serviço."
  },
  {
    icon: Leaf,
    title: "Respeito",
    description: "Cuidado ao próximo e ao meio ambiente em tudo que fazemos."
  },
  {
    icon: Heart,
    title: "Servir",
    description: "Encantamento e satisfação plena do cliente como propósito."
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
    description: "Conquista de certificações e licenças ambientais"
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

const certifications = [
  "NR 06, 10, 18, 26, 33 e 35",
  "Licença Sanitária",
  "Certificação ANVISA",
  "CETESB",
  "CRBio (Conselho Regional de Biologia)"
];

const faqs = [
  {
    question: "Quanto custa um serviço de dedetização?",
    answer: "O preço varia conforme o tipo de praga, tamanho do local e nível de infestação. Nossos serviços iniciam a partir de R$ 450,00.",
    icon: DollarSign
  },
  {
    question: "Quanto tempo demora o atendimento?",
    answer: "Em média, o serviço leva cerca de 1h30 para imóveis residenciais ou comerciais de até 300m². O tempo pode variar de acordo com o tamanho do espaço e a complexidade do serviço.",
    icon: Clock
  },
  {
    question: "Os produtos são seguros para pets?",
    answer: "Sim. Utilizamos produtos regulamentados e seguros. É fundamental apenas seguir o protocolo de segurança que enviamos antes da aplicação, garantindo total proteção para pessoas e animais.",
    icon: PawPrint
  },
  {
    question: "Vocês oferecem garantia?",
    answer: "Sim. Todos os nossos serviços possuem garantia conforme o tipo de tratamento realizado. A garantia e as condições são informadas no momento da contratação.",
    icon: BadgeCheck
  },
  {
    question: "É necessário sair de casa durante o serviço?",
    answer: "Depende da metodologia aplicada. Alguns tratamentos exigem que o local fique vazio por um período determinado, enquanto outros permitem permanência parcial. Orientamos tudo previamente para sua segurança.",
    icon: Shield
  },
  {
    question: "Atendem em quais regiões?",
    answer: "Atendemos: Região Metropolitana de Ribeirão Preto, Franca e região e Sul de Minas Gerais.",
    icon: MapPin
  }
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={companyBuilding}
            alt="Bioforte"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
          <div className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}} />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-in hover-glow">Sobre a Bioforte</Badge>
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
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" style={{animationDelay: "3s"}} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.1s"}}>
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Encantar e oferecer satisfação plena aos clientes, através dos melhores 
                  serviços de controle de pragas e saneamento ambiental, devolvendo a eles 
                  sua saúde, tranquilidade e bem-estar.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.2s"}}>
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Ser a empresa líder em soluções de controle de pragas e saneamento 
                  ambiental no Brasil, reconhecida pela excelência, inovação e compromisso 
                  com a saúde e o meio ambiente.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.3s"}}>
              <CardContent className="p-8 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Nossos Valores</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  Honestidade, encantamento e satisfação plena do cliente, qualidade, 
                  perícia, integridade, servir, respeito e cuidado ao próximo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-56 h-56 bg-accent rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">O que nos move</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              É servir a comunidade com excelência em
              <span className="text-gradient"> saneamento ambiental</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 hover-glow">Nossa História</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Trajetória de <span className="text-gradient">crescimento</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-6 hover-lift group animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex-shrink-0">
                    <div className="gradient-animated p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
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
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">Certificações</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Qualidade <span className="text-gradient">comprovada</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass-strong text-center hover-lift group animate-scale-bounce" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="gradient-animated p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="faq-heading">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">
              <HelpCircle className="h-3 w-3 mr-1" />
              Perguntas Frequentes
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" id="faq-heading">
              Dúvidas <span className="text-gradient">frequentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`} 
                  className="glass-strong rounded-lg px-6 border-none animate-scale-bounce"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors py-5">
                    <div className="flex items-center gap-3">
                      <faq.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Conheça nosso time de especialistas
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-blur-in">
            Profissionais altamente qualificados e certificados para atender 
            suas necessidades com excelência.
          </p>
          <Link to="/nosso-time">
            <Button variant="secondary" size="lg" className="font-semibold pulse-ring hover-shine">
              Ver Nosso Time
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuemSomos;
