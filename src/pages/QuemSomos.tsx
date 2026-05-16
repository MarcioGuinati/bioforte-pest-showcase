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
  BadgeCheck,
  Rocket,
  TrendingUp,
  Sparkles,
  Trophy,
  Building2
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
    description: "Início das atividades focando em dedetização residencial, atendendo as primeiras famílias da região.",
    icon: Rocket,
    highlight: "O começo de uma jornada"
  },
  {
    year: "2012",
    title: "Expansão Comercial",
    description: "Ampliação para o mercado comercial e industrial, conquistando grandes clientes e expandindo a equipe técnica.",
    icon: Building2,
    highlight: "+200 novos clientes"
  },
  {
    year: "2016",
    title: "Certificações",
    description: "Conquista de certificações ANVISA, CETESB e licenças ambientais que consolidaram nossa credibilidade.",
    icon: BadgeCheck,
    highlight: "5 certificações conquistadas"
  },
  {
    year: "2020",
    title: "Inovação Sustentável",
    description: "Implementação de tecnologias sustentáveis e produtos ecológicos, alinhando eficácia com responsabilidade ambiental.",
    icon: Leaf,
    highlight: "100% produtos eco-friendly"
  },
  {
    year: "2024",
    title: "Liderança Regional",
    description: "Reconhecimento como líder regional em controle de pragas, com presença em 5 cidades e mais de 5.000 clientes atendidos.",
    icon: Trophy,
    highlight: "Líder de mercado"
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

import SEO from "@/components/SEO";

const QuemSomos = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO 
        title="Quem Somos" 
        description="Conheça a história da Bioforte, líder em controle de pragas com mais de 15 anos de experiência e compromisso com a saúde e o meio ambiente."
        canonical="/quem-somos"
      />

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
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 hover-glow">
              <Sparkles className="h-3 w-3 mr-1" />
              Nossa História
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Trajetória de <span className="text-gradient">crescimento</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mais de 15 anos de evolução constante, sempre buscando excelência e inovação
              para proteger nossos clientes e o meio ambiente.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            {[
              { value: "15+", label: "Anos de história", icon: Clock },
              { value: "5K+", label: "Clientes atendidos", icon: Users },
              { value: "5", label: "Cidades atendidas", icon: MapPin },
              { value: "98%", label: "Satisfação", icon: Heart }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="glass-strong rounded-xl p-4 text-center hover-lift group animate-scale-bounce"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Modern Alternating Timeline */}
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical Line - Desktop */}
            <div 
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary opacity-30 rounded-full"
              aria-hidden="true"
            />
            {/* Vertical Line - Mobile */}
            <div 
              className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30 rounded-full"
              aria-hidden="true"
            />

            <div className="space-y-12 md:space-y-16">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className={`relative flex items-center gap-6 md:gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } animate-fade-in-up`}
                    style={{animationDelay: `${index * 0.15}s`}}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <Card className="glass-strong hover-lift group border-2 border-transparent hover:border-primary/30 transition-all duration-500">
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                            <Badge className="gradient-animated text-primary-foreground border-0 px-3 py-1 text-base font-bold">
                              {item.year}
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground transition-colors">
                            {item.description}
                          </p>
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary ${isLeft ? 'md:ml-auto' : ''}`}>
                            <TrendingUp className="h-3.5 w-3.5" />
                            {item.highlight}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                      <div className="relative">
                        <div className="absolute inset-0 gradient-animated rounded-full blur-md opacity-60 animate-pulse" aria-hidden="true" />
                        <div className="relative gradient-animated p-3 md:p-4 rounded-full border-4 border-background shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block flex-1" aria-hidden="true" />
                  </div>
                );
              })}
            </div>

            {/* End marker */}
            <div className="flex justify-center mt-12 md:mt-16">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-60 animate-pulse" aria-hidden="true" />
                <div className="relative bg-primary p-4 rounded-full border-4 border-background shadow-xl">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
            <p className="text-center mt-4 text-muted-foreground italic">
              E a jornada continua...
            </p>
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
