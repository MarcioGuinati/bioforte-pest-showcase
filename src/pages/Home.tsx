import HeroSlider from "@/components/HeroSlider";
import UnitsMap from "@/components/UnitsMap";
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
  { number: "15+", label: "Anos de Experiência", icon: Award },
  { number: "5000+", label: "Clientes Atendidos", icon: Users },
  { number: "98%", label: "Satisfação", icon: Star },
  { number: "24/7", label: "Suporte", icon: Clock }
];

const googleReviews = [
  {
    name: "Marcos Lima",
    content: "Excelente atendimento! Profissionais muito capacitados e atenciosos. Resolveram meu problema de cupins rapidamente.",
    rating: 5,
    date: "há 2 semanas"
  },
  {
    name: "Fernanda Oliveira",
    content: "Serviço de qualidade! Equipe pontual e muito profissional. Super recomendo a Bioforte.",
    rating: 5,
    date: "há 1 mês"
  },
  {
    name: "Carlos Eduardo",
    content: "Já é a terceira vez que contrato e sempre fico satisfeito. Atendimento excelente e resultados garantidos!",
    rating: 5,
    date: "há 1 mês"
  },
  {
    name: "Patricia Santos",
    content: "Muito satisfeita com o serviço! Eliminaram as baratas do meu apartamento. Recomendo!",
    rating: 5,
    date: "há 2 meses"
  },
  {
    name: "Roberto Silva",
    content: "Empresa séria e comprometida. Fizeram um ótimo trabalho de desratização na minha empresa.",
    rating: 5,
    date: "há 3 meses"
  },
  {
    name: "Ana Paula Costa",
    content: "Atendimento nota 10! Resolveram o problema de formigas que eu tinha há anos. Muito obrigada!",
    rating: 5,
    date: "há 3 meses"
  }
];

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-float">
                <div className="mb-4 inline-block">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium text-sm lg:text-base">
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="servicos">
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
              <Card key={index} className={`glass-strong animate-scale-in animate-stagger-${(index % 4) + 1} hover-glow group`}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle" aria-hidden="true">
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" id="sobre">
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

      {/* Google Reviews Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary rounded-full blur-3xl animate-float" style={{animationDelay: "3s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <Badge variant="outline" className="animate-bounce-slow">Avaliações do Google</Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" id="depoimentos">
              O que nossos 
              <span className="text-gradient"> clientes dizem</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="font-bold text-lg">4.9</span>
              <span className="text-muted-foreground">• 127 avaliações</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <Card key={index} className={`glass-strong animate-scale-bounce animate-stagger-${(index % 4) + 1} hover-glow group`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-primary transition-colors">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    "{review.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg" 
              className="font-semibold hover-glow group"
              asChild
            >
              <a 
                href="https://www.google.com/search?q=bioforte+franca+sp#lrd=0x94b0a639a8f9621b:0xc8932e522adf24b9,1,,,," 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Ver todas as avaliações no Google
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Units Map */}
      <UnitsMap />

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{animationDelay: "1s"}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-zoom-in" id="contato-cta">
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
                asChild
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-glow"
              >
                <a href="tel:+5516974007842" aria-label="Ligar para (16) 97400-7842">
                  (16) 97400-7842
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;