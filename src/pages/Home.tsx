import HeroSlider from "@/components/HeroSlider";
import PestsSection from "@/components/PestsSection";
import UnitsMap from "@/components/UnitsMap";
import SealsSection from "@/components/SealsSection";
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
    features: ["Baratas", "Formigas", "Mosquitos", "Aranhas"]
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
    title: "Afastamento de Pombos",
    description: "Métodos sustentáveis e seguros",
    icon: Leaf,
    features: ["Sustentável", "Não letal e não invasivo", "Resultado Garantido", "Baixa manutenção"]
  }
];

const stats = [
  { number: "30+", label: "Anos de Experiência", icon: Award },
  { number: "5000+", label: "Clientes Atendidos", icon: Users },
  { number: "98%", label: "Satisfação", icon: Star },
  { number: "100%", label: "Garantia comprovada", icon: CheckCircle }
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

import SEO from "@/components/SEO";

const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bioforte Controle de Pragas",
    "image": "https://bioforte.com.br/logo.png",
    "@id": "https://bioforte.com.br",
    "url": "https://bioforte.com.br",
    "telephone": "+551637230808",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Major Nicácio, 2045",
      "addressLocality": "Franca",
      "addressRegion": "SP",
      "postalCode": "14401-135",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -20.5372,
      "longitude": -47.4008
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/bioforte",
      "https://www.instagram.com/bioforte"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <main className="overflow-hidden">
      <SEO
        title="Home"
        description="Bioforte: especialista em controle de pragas há 30 anos. Dedetização residencial e comercial com profissionais certificados. Orçamento gratuito!"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Pests Icons Section */}
      <PestsSection />

      {/* Stats Section */}
      <section className="py-20 bg-primary relative overflow-hidden" aria-labelledby="stats-heading">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>
        <h2 id="stats-heading" className="sr-only">Nossos Números</h2>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-lift animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4 inline-block" aria-hidden="true">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/50 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {stat.number}
                </p>
                <p className="text-white/90 font-medium text-sm lg:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="services-heading">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 hover-glow">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="services-heading">
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
              <Card key={index} className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2" aria-label={`Características do serviço ${service.title}`}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-xs group-hover:text-foreground transition-colors">
                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Link to="/area-atuacao">
              <Button variant="hero" size="lg" className="font-semibold pulse-ring hover-shine">
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
                    <dd className="font-bold text-2xl text-gradient">Anvisa</dd>
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
                    <dt className="sr-only">Garantia</dt>
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dd className="font-bold text-2xl text-gradient">100%</dd>
                    <dd className="text-xs text-muted-foreground">Garantia comprovada</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seals/Certifications Section */}
      <SealsSection />

      {/* Google Reviews Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="reviews-heading">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true" role="img">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <Badge variant="outline">Avaliações do Google</Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" id="reviews-heading">
              O que nossos
              <span className="text-gradient"> clientes dizem</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2" role="img" aria-label="Avaliação média: 4.9 de 5 estrelas com 127 avaliações">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <span className="font-bold text-lg">4.9</span>
              <span className="text-muted-foreground">• 127 avaliações</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <Card key={index} className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex mb-3" role="img" aria-label={`Avaliação: ${review.rating} de 5 estrelas`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
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
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
            </p>
            <div className="flex justify-center">
              <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="font-semibold pulse-ring group">
                  Solicitar Orçamento Grátis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;