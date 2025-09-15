import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Zap, 
  Leaf, 
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Dedetização Residencial",
    description: "Proteção completa para sua casa e família",
    icon: Shield,
    features: ["Cockroaches", "Formigas", "Mosquitos", "Aranhas"]
  },
  {
    title: "Controle Comercial",
    description: "Soluções para empresas e estabelecimentos",
    icon: Users,
    features: ["Restaurantes", "Hotéis", "Escritórios", "Indústrias"]
  },
  {
    title: "Desratização",
    description: "Eliminação segura de roedores",
    icon: Zap,
    features: ["Ratos", "Camundongos", "Controle preventivo", "Monitoramento"]
  },
  {
    title: "Controle Ecológico",
    description: "Métodos sustentáveis e seguros",
    icon: Leaf,
    features: ["Produtos ecológicos", "Baixo impacto", "Pet friendly", "Sustentável"]
  }
];

const stats = [
  { number: "15+", label: "Anos de Experiência" },
  { number: "5000+", label: "Clientes Atendidos" },
  { number: "98%", label: "Satisfação" },
  { number: "24/7", label: "Suporte" }
];

const testimonials = [
  {
    name: "Maria Silva",
    role: "Dona de Casa",
    content: "Excelente serviço! Resolveram o problema de formigas em casa de forma definitiva.",
    rating: 5
  },
  {
    name: "João Santos", 
    role: "Empresário",
    content: "Profissionais muito competentes. Recomendo para qualquer empresa.",
    rating: 5
  },
  {
    name: "Ana Costa",
    role: "Gerente de Hotel",
    content: "Parceria de anos. Sempre pontuais e eficazes no controle.",
    rating: 5
  }
];

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-bounce hover-float">
                <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2 text-shimmer">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 animate-bounce-slow">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Soluções Completas em
              <span className="text-gradient"> Controle de Pragas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos serviços especializados com tecnologia de ponta e 
              profissionais certificados para garantir a segurança do seu ambiente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`hover-lift glass-strong border-0 animate-scale-in animate-stagger-${(index % 4) + 1} hover-glow group`}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-xs hover:text-primary transition-colors">
                        <CheckCircle className="h-3 w-3 text-primary animate-pulse-slow" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/area-atuacao">
              <Button variant="hero" size="lg" className="font-semibold hover-shine pulse-ring animate-glow">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge variant="outline" className="mb-4 hover-glow">Sobre a Bioforte</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Experiência e Confiabilidade em 
                <span className="text-gradient"> Controle de Pragas</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed animate-blur-in">
                A Bioforte é especialista em controle integrado de pragas urbanas, 
                oferecendo soluções personalizadas para residências, comércios e indústrias. 
                Nossa missão é proteger a saúde e o bem-estar dos nossos clientes através 
                de serviços de alta qualidade.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Profissionais certificados e treinados",
                  "Produtos aprovados pela ANVISA",
                  "Técnicas modernas e sustentáveis", 
                  "Atendimento personalizado"
                ].map((item, index) => (
                  <div key={index} className={`flex items-center gap-3 animate-slide-in-right animate-stagger-${index + 1}`}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 hover-scale" />
                    <span className="hover:text-primary transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/quem-somos">
                <Button variant="hero" size="lg" className="font-semibold hover-shine pulse-ring group">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-slide-in-left">
              <div className="gradient-card p-8 rounded-2xl animate-scale-bounce hover-tilt effect-3d">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-background rounded-lg hover-lift hover-glow">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2 animate-bounce-slow" />
                    <div className="font-bold text-2xl text-gradient">ISO 9001</div>
                    <div className="text-xs text-muted-foreground">Certificada</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg hover-lift hover-glow">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse-slow" />
                    <div className="font-bold text-2xl text-gradient">100%</div>
                    <div className="text-xs text-muted-foreground">Seguro</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg hover-lift hover-glow">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2 animate-float" />
                    <div className="font-bold text-2xl text-gradient">5000+</div>
                    <div className="text-xs text-muted-foreground">Clientes</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg hover-lift hover-glow">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2 animate-rotate" />
                    <div className="font-bold text-2xl text-gradient">24/7</div>
                    <div className="text-xs text-muted-foreground">Suporte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary rounded-full blur-3xl animate-float" style={{animationDelay: "3s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 animate-bounce-slow">Depoimentos</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              O que nossos 
              <span className="text-gradient"> clientes dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`hover-lift glass-strong border-0 animate-scale-bounce animate-stagger-${index + 1} hover-glow group effect-3d-hover`}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current animate-pulse-slow hover-scale" style={{animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic group-hover:text-foreground transition-colors">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{animationDelay: "1s"}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-zoom-in">
              Precisa de Controle de Pragas?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 animate-blur-in">
              Entre em contato conosco e receba um orçamento personalizado. 
              Atendemos em toda a região metropolitana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button variant="secondary" size="lg" className="font-semibold hover-shine pulse-ring animate-glow group">
                  Solicitar Orçamento Grátis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-glow"
              >
                (11) 99999-9999
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;