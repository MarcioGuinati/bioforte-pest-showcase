import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, Shield, Microscope, ChevronRight,
  CheckCircle, ArrowRight, Phone, MapPin, Info,
  Bug, Leaf, Wrench
} from "lucide-react";
import SEO from "@/components/SEO";
import heroImage from "@/assets/biology-hero.jpeg";

export interface PragaData {
  slug: string;
  name: string;
  scientificName: string;
  dangerLevel: "Médio" | "Alto" | "Crítico";
  dangerColor: string; // tailwind classes for the badge
  accentColor: string; // tailwind color for accents e.g. "red"
  heroDescription: string;
  heroHighlight?: string;
  intro: string[];
  locations?: string[];
  prevention: string[];
  control: string[];
  curiosities?: string[];
  icon: string; // emoji or icon name
}

const dangerBadge: Record<string, string> = {
  Médio: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Alto: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Crítico: "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400",
};

const allPests = [
  { name: "Baratas", slug: "baratas" },
  { name: "Formigas", slug: "formigas" },
  { name: "Cupins", slug: "cupins" },
  { name: "Ratos", slug: "ratos" },
  { name: "Mosquitos", slug: "mosquitos" },
  { name: "Aranhas", slug: "aranhas" },
  { name: "Escorpiões", slug: "escorpioes" },
  { name: "Pombos", slug: "pombos" },
  { name: "Carrapatos", slug: "carrapatos" },
  { name: "Piolho de Pássaros", slug: "piolho-passaros" },
];

interface PragaDetalhePageProps {
  data: PragaData;
}

const PragaDetalhePage = ({ data }: PragaDetalhePageProps) => {
  const accentClasses: Record<string, { ring: string; bg: string; text: string; border: string }> = {
    red: { ring: "ring-red-500/30", bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
    orange: { ring: "ring-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/30" },
    yellow: { ring: "ring-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-500/30" },
    gray: { ring: "ring-gray-500/30", bg: "bg-gray-500/10", text: "text-gray-600", border: "border-gray-500/30" },
    blue: { ring: "ring-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
    purple: { ring: "ring-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
    amber: { ring: "ring-amber-600/30", bg: "bg-amber-600/10", text: "text-amber-700", border: "border-amber-600/30" },
    slate: { ring: "ring-slate-500/30", bg: "bg-slate-500/10", text: "text-slate-600", border: "border-slate-500/30" },
    teal: { ring: "ring-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-600", border: "border-teal-500/30" },
    pink: { ring: "ring-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-600", border: "border-pink-500/30" },
  };
  const accent = accentClasses[data.accentColor] ?? accentClasses["red"];

  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title={`Controle de ${data.name}`}
        description={data.heroDescription}
        canonical={`/pragas/${data.slug}`}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={data.name}
            width="1920"
            height="620"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${data.slug}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${data.slug}-grid)`} />
          </svg>
          <div className="absolute top-16 right-1/3 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div className={`absolute bottom-10 right-10 w-40 h-40 ${accent.bg} rounded-full blur-3xl animate-float`} style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative container mx-auto px-4 py-14 sm:py-20 lg:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6 animate-fade-in" aria-label="Navegação">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/biologia-pragas" className="hover:text-white transition-colors">Biologia das Pragas</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{data.name}</span>
          </nav>

          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className={`mb-6 ${dangerBadge[data.dangerLevel]} animate-fade-in border`}
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              Risco {data.dangerLevel}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 animate-fade-in-up leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
              {data.name}
            </h1>
            <p className="text-lg text-white/90 italic mb-4 animate-fade-in [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
              {data.scientificName}
            </p>
            {data.heroHighlight && (
              <p className="text-lg lg:text-xl text-white leading-relaxed animate-blur-in max-w-2xl mt-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] font-medium">
                {data.heroHighlight}
              </p>
            )}
            <p className="text-base text-white/90 leading-relaxed animate-blur-in max-w-2xl mt-3 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]" style={{ animationDelay: "0.15s" }}>
              {data.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <a
                href={`https://wa.me/551637230808?text=Olá! Preciso de ajuda com ${data.name.toLowerCase()}. Gostaria de um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="hero" size="lg" className="font-bold pulse-ring hover-shine w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Solicitar Orçamento Gratuito
                </Button>
              </a>
              <Link
                to="/biologia-pragas"
                className="inline-link w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 rounded-lg border border-white/50 bg-white/15 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/25 transition-colors duration-200"
              >
                Ver Todas as Pragas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

            {/* ── SIDEBAR: Pest Navigation ── */}
            <aside className="lg:w-64 xl:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Nav card */}
                <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden">
                  <div className="gradient-primary p-4">
                    <h2 className="text-sm font-bold text-primary-foreground uppercase tracking-wider flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Principais Espécies
                    </h2>
                  </div>
                  <nav aria-label="Lista de pragas">
                    <ul className="divide-y divide-border/40">
                      {allPests.map((pest) => (
                        <li key={pest.slug}>
                          <Link
                            to={`/pragas/${pest.slug}`}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group ${pest.slug === data.slug
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                              }`}
                          >
                            <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${pest.slug === data.slug ? "text-primary-foreground" : "text-muted-foreground group-hover:translate-x-0.5"}`} />
                            {pest.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* CTA card */}
                <div className="glass-strong rounded-2xl border border-primary/20 p-5 bg-primary/5">
                  <h3 className="font-bold mb-2 text-sm">Precisa de controle profissional?</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Nossa equipe está pronta para eliminar a infestação com segurança e eficácia.
                  </p>
                  <a
                    href={`https://wa.me/551637230808?text=Olá! Preciso de ajuda com ${data.name.toLowerCase()}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero" size="sm" className="w-full font-semibold hover-shine">
                      <Phone className="mr-2 h-4 w-4" />
                      Falar no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0 space-y-10">

              {/* Informações sobre a espécie */}
              <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden animate-fade-in-up">
                <div className={`p-5 border-b border-border/60 flex items-center gap-3 ${accent.bg}`}>
                  <div className={`p-2 rounded-lg ${accent.bg} border ${accent.border}`}>
                    <Info className={`h-5 w-5 ${accent.text}`} />
                  </div>
                  <h2 className="font-bold text-lg">Informações sobre a espécie</h2>
                </div>
                <div className="p-6 space-y-4">
                  {data.intro.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Onde é encontrada */}
              {data.locations && data.locations.length > 0 && (
                <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <div className="p-5 border-b border-border/60 flex items-center gap-3 bg-blue-500/5">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <MapPin className="h-5 w-5 text-blue-500" />
                    </div>
                    <h2 className="font-bold text-lg">Onde comumente são encontrados</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {data.locations.map((loc, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground">
                          <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{loc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Prevenção */}
              <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="p-5 border-b border-border/60 flex items-center gap-3 bg-green-500/5">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="font-bold text-lg">Medidas para prevenir o aparecimento</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5">
                    {data.prevention.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground group">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="group-hover:text-foreground transition-colors">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Controle */}
              <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="p-5 border-b border-border/60 flex items-center gap-3 bg-primary/5">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">Medidas para o controle</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5">
                    {data.control.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground group">
                        <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="group-hover:text-foreground transition-colors">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Curiosidades */}
              {data.curiosities && data.curiosities.length > 0 && (
                <div className={`rounded-2xl border ${accent.border} ${accent.bg} p-6 animate-fade-in-up`} style={{ animationDelay: "0.4s" }}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg border ${accent.border} flex-shrink-0`}>
                      <Microscope className={`h-5 w-5 ${accent.text}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold mb-3 ${accent.text}`}>Você sabia?</h3>
                      <ul className="space-y-2">
                        {data.curiosities.map((c, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed">• {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA inline */}
              <div className="gradient-hero rounded-2xl p-8 text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                  Identificou {data.name.toLowerCase()} no seu imóvel?
                </h3>
                <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">
                  Não espere a infestação crescer. A Bioforte realiza vistoria gratuita e oferece tratamento seguro e eficaz.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/551637230808?text=Olá! Preciso eliminar ${data.name.toLowerCase()}. Gostaria de um orçamento.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="lg" className="font-bold hover-shine">
                      <Phone className="mr-2 h-5 w-5" />
                      Chamar no WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+551637230808">
                    <Button variant="outline" size="lg" className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      (16) 3723-0808
                    </Button>
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-primary-foreground/65 text-xs">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Vistoria gratuita</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Orçamento sem compromisso</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Atendimento rápido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PragaDetalhePage;
