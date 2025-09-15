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
              <div key={index} className="text-center animate-scale-in">
                <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Soluções Completas em
              <span className="text-primary"> Controle de Pragas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos serviços especializados com tecnologia de ponta e 
              profissionais certificados para garantir a segurança do seu ambiente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift glass border-0 animate-scale-in">
                <CardContent className="p-6 text-center">
                  <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-primary" />
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
              <Button variant="hero" size="lg" className="font-semibold">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="outline" className="mb-4">Sobre a Bioforte</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Experiência e Confiabilidade em 
                <span className="text-primary"> Controle de Pragas</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
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
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/quem-somos">
                <Button variant="hero" size="lg" className="font-semibold">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="gradient-card p-8 rounded-2xl animate-scale-in">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-2xl">ISO 9001</div>
                    <div className="text-xs text-muted-foreground">Certificada</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-2xl">100%</div>
                    <div className="text-xs text-muted-foreground">Seguro</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-2xl">5000+</div>
                    <div className="text-xs text-muted-foreground">Clientes</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-2xl">24/7</div>
                    <div className="text-xs text-muted-foreground">Suporte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4">Depoimentos</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              O que nossos 
              <span className="text-primary"> clientes dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift glass border-0 animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Precisa de Controle de Pragas?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Entre em contato conosco e receba um orçamento personalizado. 
              Atendemos em toda a região metropolitana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button variant="secondary" size="lg" className="font-semibold">
                  Solicitar Orçamento Grátis
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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