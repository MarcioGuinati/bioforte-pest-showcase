import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shield, Users, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroSpecialist from "@/assets/hero-specialist.jpg";
import companyBuilding from "@/assets/company-building.jpg";
import equipment from "@/assets/equipment.jpg";

const slides = [
  {
    id: 1,
    title: "Líder em Controle de Pragas",
    subtitle: "Proteção Profissional para seu Ambiente",
    description: "Mais de 15 anos de experiência oferecendo soluções eficazes e seguras para controle de pragas urbanas.",
    image: heroSpecialist,
    cta: "Solicitar Orçamento",
    ctaLink: "/contato"
  },
  {
    id: 2,
    title: "Tecnologia de Ponta",
    subtitle: "Equipamentos Modernos e Seguros",
    description: "Utilizamos os equipamentos mais avançados do mercado para garantir eficiência máxima no controle.",
    image: equipment,
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
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full min-h-[90vh] flex items-center">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to={slides[currentSlide].ctaLink}>
              <Button variant="hero" size="lg" className="font-semibold">
                {slides[currentSlide].cta}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="font-semibold">
              (11) 99999-9999
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 glass rounded-lg hover-lift">
                <div className="gradient-primary p-3 rounded-full mb-3">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="p-2 glass rounded-full hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "bg-primary w-8" 
                  : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 glass rounded-full hover:bg-primary/20 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;