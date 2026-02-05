import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shield, Users, Award, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSpecialist from "@/assets/hero-specialist.jpg";
import companyBuilding from "@/assets/company-building.jpg";
import slide01 from "@/assets/SLIDE 01.png";
import slide02 from "@/assets/SLIDE 02.png";
import slide03 from "@/assets/SLIDE 03.png";
import slide04 from "@/assets/SLIDE 04.png";
import slide05 from "@/assets/SLIDE 05.png";
import slide06 from "@/assets/038f9b42-2503-4e8d-afa4-9bd64e7ef10b.jpg";
import slide07 from "@/assets/d0398b49-0224-4067-af90-a1f2c4a6c0db.jpg";
import equipment from "@/assets/equipment.jpg";

const slides = [
  {
    id: 1,
    title: "Líder em Controle de Pragas",
    subtitle: "Proteção Profissional para seu Ambiente",
    description: "Mais de 15 anos de experiência oferecendo soluções eficazes e seguras para controle de pragas urbanas.",
    image: slide06,
    cta: "Solicitar Orçamento",
    ctaLink: "/contato"
  },
  {
    id: 2,
    title: "Tecnologia de Ponta",
    subtitle: "Equipamentos Modernos e Seguros",
    description: "Utilizamos os equipamentos mais avançados do mercado para garantir eficiência máxima no controle.",
    image: slide07,
    cta: "Conheça Nossos Serviços",
    ctaLink: "/area-atuacao"
  },
  {
    id: 3,
    title: "Empresa Certificada",
    subtitle: "Confiança e Qualidade Comprovadas",
    description: "Certificações técnicas e ambientais que garantem a excelência dos nossos serviços.",
    image: companyBuilding,
    cta: "Sobre a Bioforte",
    ctaLink: "/quem-somos"
  }
];

const features = [
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Produtos aprovados pela ANVISA"
  },
  {
    icon: Users,
    title: "Equipe Especializada", 
    description: "Profissionais certificados"
  },
  {
    icon: Award,
    title: "Qualidade Certificada",
    description: "ISO 9001 e licenças ambientais"
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description: "Suporte completo sempre"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10" />
            <img
              src={slide.image}
              alt={`${slide.title} - ${slide.description}`}
              className="w-full h-full object-cover object-center parallax"
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}}></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full min-h-[90vh] flex items-center">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-bounce-slow hover-glow">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-zoom-in">
              <span className="text-shimmer" aria-label={slides[currentSlide].title}>{slides[currentSlide].title}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-blur-in">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to={slides[currentSlide].ctaLink}>
              <Button variant="hero" size="lg" className="font-semibold hover-shine pulse-ring animate-glow group">
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="font-semibold hover-glow animate-float">
              <a href="tel:+5516974007842" className="flex items-center">
                (16) 97400-7842
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col items-center text-center p-4 glass-strong rounded-lg hover-lift animate-scale-bounce animate-stagger-${index + 1} group effect-3d-hover`}>
                <div className="gradient-animated p-3 rounded-full mb-3 group-hover:animate-wiggle" aria-hidden="true">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4" role="group" aria-label="Controles do carrossel de slides">
        <button
          onClick={prevSlide}
          className="p-3 glass-strong rounded-full hover:bg-primary/20 transition-colors hover-glow animate-pulse-slow min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Indicadores de slide">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover-glow ${
                index === currentSlide 
                  ? "animate-glow" 
                  : ""
              }`}
            >
              <span className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "bg-primary w-8" 
                  : "bg-muted-foreground/40 w-2 hover:bg-primary/60"
              }`} />
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 glass-strong rounded-full hover:bg-primary/20 transition-colors hover-glow animate-pulse-slow min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;