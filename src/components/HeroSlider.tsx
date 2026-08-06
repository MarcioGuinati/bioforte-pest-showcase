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

// We removed the synchronous JS preloading here to unblock the main thread.
// The first image (01.webp) is now preloaded via <link rel="preload"> in index.html instead.

const HeroSlider = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 640
  );

  // Detect mobile breakpoint reactively
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // On mobile: no autoplay — always show first slide
  const displaySlide = isMobile ? 0 : currentSlide;

  useEffect(() => {
    if (isPaused || isMobile) return;

    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, isMobile, nextSlide]);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="carrossel"
      aria-label="Apresentação da Bioforte Controle de Pragas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background slides — on mobile only slide 0 is shown */}
      <div className="absolute inset-0" aria-live="polite">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === displaySlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} de ${slides.length}: ${slide.title}`}
            aria-hidden={index !== displaySlide}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Content — natural flow, not constrained to viewport height */}
      <div className="relative z-20 container mx-auto px-4 pt-24 pb-8 sm:pt-28 lg:pt-0 lg:min-h-[90vh] lg:flex lg:items-center">
        <div className="max-w-2xl animate-fade-in w-full">
          {/* Subtitle badge */}
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {slides[displaySlide].subtitle}
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            <span className="text-gradient">{slides[displaySlide].title}</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            {slides[displaySlide].description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            {slides[displaySlide].ctaLink.startsWith('http') ? (
              <a href={slides[displaySlide].ctaLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="font-semibold pulse-ring group w-full sm:w-auto">
                  {slides[displaySlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </a>
            ) : (
              <Link to={slides[displaySlide].ctaLink} className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="font-semibold pulse-ring group w-full sm:w-auto">
                  {slides[displaySlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg" className="font-semibold hover-glow w-full sm:w-auto" asChild>
              <a href="tel:+551637230808" aria-label="Ligar para (16) 3723-0808">
                (16) 3723-0808
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" role="list" aria-label="Diferenciais da Bioforte">
            {features.map((feature, index) => (
              <div
                key={index}
                role="listitem"
                className="flex flex-col items-center text-center p-3 sm:p-4 glass-strong rounded-lg hover-lift group"
              >
                <div className="gradient-animated p-2.5 sm:p-3 rounded-full mb-2 sm:mb-3" aria-hidden="true">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h2 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-primary transition-colors leading-tight">
                  {feature.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-tight hidden sm:block">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Carousel Navigation — hidden on mobile, visible on sm+ */}
          <nav className="hidden sm:flex items-center justify-center gap-4 mt-6 pb-6" aria-label="Navegação do carrossel">
            <button
              onClick={prevSlide}
              className="p-2.5 glass-strong rounded-full hover:bg-primary/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                  aria-selected={index === displaySlide}
                  aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all ${
                      index === displaySlide
                        ? "bg-primary w-7"
                        : "bg-muted-foreground/50 w-2.5 hover:bg-primary/60"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2.5 glass-strong rounded-full hover:bg-primary/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
});

HeroSlider.displayName = "HeroSlider";

export default HeroSlider;
