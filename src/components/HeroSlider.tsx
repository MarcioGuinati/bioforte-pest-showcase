import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shield, Users, Award, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import images as ES6 modules for better bundling
import slide06 from "@/assets/01.webp";
import slide04 from "@/assets/04.webp";
import slide07 from "@/assets/02.webp";
import companyBuilding from "@/assets/03.webp";

const slides = [
  {
    id: 1,
    title: "Líder em Controle de Pragas",
    subtitle: "Proteção Profissional para seu Ambiente",
    description: "Mais de 30 anos de experiência oferecendo soluções eficazes e seguras para controle de pragas urbanas.",
    image: slide06,
    cta: "Solicitar Orçamento",
    ctaLink: "https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas."
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
    image: slide04,
    cta: "Sobre a Bioforte",
    ctaLink: "/quem-somos"
  },
  {
    id: 4,
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
    description: "Certificação Anvisa"
  },
  {
    icon: Clock,
    title: "Garantia comprovada",
    description: "Garantia total dos serviços"
  }
];

// Preload all images immediately on module load
const preloadedImages: HTMLImageElement[] = [];
slides.forEach((slide, index) => {
  const img = new Image();
  img.src = slide.image;
  if (index === 0) {
    img.fetchPriority = "high";
  }
  preloadedImages.push(img);
});

const HeroSlider = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Check if first image is loaded
  useEffect(() => {
    if (preloadedImages[0].complete) {
      setFirstImageLoaded(true);
    } else {
      preloadedImages[0].onload = () => setFirstImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      aria-roledescription="carrossel"
      aria-label="Apresentação da Bioforte Controle de Pragas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0" aria-live="polite">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
              }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} de ${slides.length}: ${slide.title}`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10" />
            {/* Show placeholder until first image loads */}
            {index === 0 && !firstImageLoaded && (
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            )}
            <img
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={1080}
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${index === 0 && !firstImageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
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
              <span className="text-gradient">{slides[currentSlide].title}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {slides[currentSlide].ctaLink.startsWith('http') ? (
              <a href={slides[currentSlide].ctaLink} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="font-semibold pulse-ring group">
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </a>
            ) : (
              <Link to={slides[currentSlide].ctaLink}>
                <Button variant="hero" size="lg" className="font-semibold pulse-ring group">
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg" className="font-semibold hover-glow" asChild>
              <a href="tel:+551637230808" aria-label="Ligar para (16) 3723-0808">
                (16) 3723-0808
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Diferenciais da Bioforte">
            {features.map((feature, index) => (
              <div
                key={index}
                role="listitem"
                className="flex flex-col items-center text-center p-4 glass-strong rounded-lg hover-lift group"
              >
                <div className="gradient-animated p-3 rounded-full mb-3" aria-hidden="true">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{feature.title}</h2>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4" aria-label="Navegação do carrossel">
        <button
          onClick={prevSlide}
          className="p-3 glass-strong rounded-full hover:bg-primary/20 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex gap-1" role="tablist" aria-label="Indicadores de slide">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              <span
                className={`h-3 rounded-full transition-all ${index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/50 w-3 hover:bg-primary/60"
                  }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 glass-strong rounded-full hover:bg-primary/20 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </section>
  );
});

HeroSlider.displayName = "HeroSlider";

export default HeroSlider;
