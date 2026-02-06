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
      <section className="py-20 bg-primary relative overflow-hidden" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Nossos Números</h2>
        <div className="container mx-auto px-4 relative">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-lift" role="listitem">
                <dt className="sr-only">{stat.label}</dt>
                <div className="mb-4 inline-block" aria-hidden="true">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 group-hover:bg-white/20 transition-all">
                    <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>
                <dd className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {stat.number}
                </dd>
                <dd className="text-white/90 font-medium text-sm lg:text-base">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="services-heading">
              Soluções Completas em
              <span className="text-gradient"> Controle de Pragas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos serviços especializados com tecnologia de ponta e 
              profissionais certificados para garantir a segurança do seu ambiente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {services.map((service, index) => (
              <Card key={index} className="glass-strong hover-glow group" role="listitem">
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2" aria-label={`Características do serviço ${service.title}`}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/area-atuacao">
              <Button variant="hero" size="lg" className="font-semibold pulse-ring">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="outline" className="mb-4">Sobre a Bioforte</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" id="about-heading">
                Experiência e Confiabilidade em 
                <span className="text-gradient"> Controle de Pragas</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A Bioforte é especialista em controle integrado de pragas urbanas, 
                oferecendo soluções personalizadas para residências, comércios e indústrias. 
                Nossa missão é proteger a saúde e o bem-estar dos nossos clientes através 
                de serviços de alta qualidade.
              </p>
              
              <ul className="space-y-4 mb-8" aria-label="Diferenciais da Bioforte">
                {[
                  "Profissionais certificados e treinados",
                  "Produtos aprovados pela ANVISA",
                  "Técnicas modernas e sustentáveis", 
                  "Atendimento personalizado"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/quem-somos">
                <Button variant="hero" size="lg" className="font-semibold pulse-ring group">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl hover-lift">
                <dl className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                    <dt className="sr-only">Certificação</dt>
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dd className="font-bold text-2xl text-gradient">ISO 9001</dd>
                    <dd className="text-xs text-muted-foreground">Certificada</dd>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                    <dt className="sr-only">Segurança</dt>
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dd className="font-bold text-2xl text-gradient">100%</dd>
                    <dd className="text-xs text-muted-foreground">Seguro</dd>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                    <dt className="sr-only">Clientes atendidos</dt>
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dd className="font-bold text-2xl text-gradient">5000+</dd>
                    <dd className="text-xs text-muted-foreground">Clientes</dd>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                    <dt className="sr-only">Suporte</dt>
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dd className="font-bold text-2xl text-gradient">24/7</dd>
                    <dd className="text-xs text-muted-foreground">Suporte</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="reviews-heading">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true" role="img">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <Badge variant="outline">Avaliações do Google</Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" id="reviews-heading">
              O que nossos 
              <span className="text-gradient"> clientes dizem</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2" aria-label="Avaliação média: 4.9 de 5 estrelas com 127 avaliações">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <span className="font-bold text-lg">4.9</span>
              <span className="text-muted-foreground">• 127 avaliações</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Avaliações de clientes">
            {googleReviews.map((review, index) => (
              <Card key={index} className="glass-strong hover-glow group" role="listitem">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
                      aria-hidden="true"
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex mb-3" aria-label={`Avaliação: ${review.rating} de 5 estrelas`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground text-sm">
                    "{review.content}"
                  </blockquote>
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
                aria-label="Ver todas as avaliações no Google (abre em nova aba)"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Ver todas as avaliações no Google
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Units Map */}
      <UnitsMap />

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6" id="cta-heading">
              Precisa de Controle de Pragas?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Entre em contato conosco e receba um orçamento personalizado. 
              Atendemos em toda a região metropolitana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button variant="secondary" size="lg" className="font-semibold pulse-ring group">
                  Solicitar Orçamento Grátis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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