import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bug,
  Shield,
  AlertTriangle,
  ChevronRight,
  Microscope,
  Phone,
  CheckCircle,
  ArrowRight,
  Skull,
} from "lucide-react";
import SEO from "@/components/SEO";
import pestBiology from "@/assets/biology-hero.jpeg";
import formigaIcon from "@/assets/Icones-site_02-Formiga.svg";
import barataIcon from "@/assets/Icones-site_03-Barata.svg";
import pomboIcon from "@/assets/Icones-site_04-Pombo.svg";
import moscaIcon from "@/assets/Icones-site_05-Mosca.svg";
import ratoIcon from "@/assets/Icones-site_06-Rato.svg";
import aranhaIcon from "@/assets/Icones-site_07-Aranha.svg";
import cupimIcon from "@/assets/Icones-site_08-Cupim.svg";
import carrapatoIcon from "@/assets/Icones-site_09-Carrapato.svg";
import piolhoIcon from "@/assets/Icones-site_10-Piolho.svg";
import escorpiaoIcon from "@/assets/Icones-site-01-escorpiao.svg";

const pests = [
  {
    name: "Baratas",
    slug: "baratas",
    scientificName: "Blattodea",
    img: barataIcon,
    description: "Insetos noturnos que carregam mais de 30 tipos de bactérias e transmitem doenças como Salmonela, Hepatite A e E. coli.",
    dangerLevel: "Alto" as const,
    accentColor: "red",
  },
  {
    name: "Formigas",
    slug: "formigas",
    scientificName: "Formicidae",
    img: formigaIcon,
    description: "Insetos sociais que formam colônias com centenas de milhares de indivíduos e contaminam alimentos.",
    dangerLevel: "Médio" as const,
    accentColor: "orange",
  },
  {
    name: "Cupins",
    slug: "cupins",
    scientificName: "Isoptera",
    img: cupimIcon,
    description: "Destroem madeiras, estruturas e documentos silenciosamente. Causam bilhões em prejuízo por ano no Brasil.",
    dangerLevel: "Alto" as const,
    accentColor: "yellow",
  },
  {
    name: "Ratos",
    slug: "ratos",
    scientificName: "Rattus spp.",
    img: ratoIcon,
    description: "Transmitem leptospirose, hantavírus e salmonela. Corroem fios elétricos e causam incêndios.",
    dangerLevel: "Crítico" as const,
    accentColor: "gray",
  },
  {
    name: "Mosquitos",
    slug: "mosquitos",
    scientificName: "Culicidae",
    img: moscaIcon,
    description: "Vetores de dengue, Zika, chikungunya e febre amarela. Reproduzem-se em qualquer acúmulo de água parada.",
    dangerLevel: "Crítico" as const,
    accentColor: "blue",
  },
  {
    name: "Aranhas",
    slug: "aranhas",
    scientificName: "Araneae",
    img: aranhaIcon,
    description: "Espécies como a aranha-marrom e armadeira causam acidentes graves com necrose e comprometimento neurológico.",
    dangerLevel: "Alto" as const,
    accentColor: "purple",
  },
  {
    name: "Escorpiões",
    slug: "escorpioes",
    scientificName: "Scorpiones",
    img: escorpiaoIcon,
    description: "O Tityus serrulatus é o animal peçonhento mais letal do Brasil, com risco de morte para crianças e idosos.",
    dangerLevel: "Crítico" as const,
    accentColor: "amber",
  },
  {
    name: "Pombos",
    slug: "pombos",
    scientificName: "Columba livia",
    img: pomboIcon,
    description: "Excrementos transmitem criptococose e histoplasmose. Corroem fachadas e atraem ácaros parasitas.",
    dangerLevel: "Médio" as const,
    accentColor: "slate",
  },
  {
    name: "Carrapatos",
    slug: "carrapatos",
    scientificName: "Ixodida",
    img: carrapatoIcon,
    description: "Vetores da Febre Maculosa, com letalidade superior a 20%. Parasitam humanos e animais domésticos.",
    dangerLevel: "Alto" as const,
    accentColor: "teal",
  },
  {
    name: "Piolho de Pássaros",
    slug: "piolho-passaros",
    scientificName: "Dermanyssus gallinae",
    img: piolhoIcon,
    description: "Ácaro parasita de aves que invade residências próximas a ninhos de pombos, causando dermatite intensa.",
    dangerLevel: "Médio" as const,
    accentColor: "pink",
  },
];

const dangerConfig: Record<string, { badge: string; dot: string; label: string; icon: React.ReactNode }> = {
  Médio: {
    badge: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    dot: "bg-yellow-500",
    label: "Risco Médio",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  Alto: {
    badge: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
    label: "Risco Alto",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  Crítico: {
    badge: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400",
    dot: "bg-red-500",
    label: "Risco Crítico",
    icon: <Skull className="h-3 w-3" />,
  },
};

const allPestNav = pests.map((p) => ({ name: p.name, slug: p.slug }));

const BiologiaPragas = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Biologia das Pragas"
        description="Conheça a biologia, comportamento e riscos das principais pragas urbanas. Clique em cada praga para informações detalhadas sobre prevenção e controle."
        canonical="/biologia-pragas"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pestBiology}
            alt="Biologia das Pragas"
            width="1920"
            height="580"
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
              <pattern id="bio-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bio-grid)" />
          </svg>
          <div className="absolute top-16 right-1/3 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative container mx-auto px-4 py-14 sm:py-20 lg:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-6 animate-fade-in">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/90">Biologia das Pragas</span>
          </nav>

          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary/60 text-primary bg-primary/20 backdrop-blur-sm animate-fade-in">
              <Microscope className="h-3.5 w-3.5 mr-1.5" />
              Conheça o Inimigo
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
              Biologia das{" "}
              <span className="text-gradient">Pragas Urbanas</span>
            </h1>
            <p className="text-lg lg:text-xl text-white leading-relaxed animate-blur-in max-w-2xl mt-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] font-medium">
              Entender a praga é o primeiro passo para eliminá-la.
            </p>
            <p className="text-base text-white/90 leading-relaxed animate-blur-in max-w-xl mt-3 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]" style={{ animationDelay: "0.15s" }}>
              Conhecimento científico aplicado ao controle eficaz — biologia, comportamento e ciclo de vida das principais pragas urbanas.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

            {/* ── SIDEBAR ── */}
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
                      {allPestNav.map((pest) => (
                        <li key={pest.slug}>
                          <Link
                            to={`/pragas/${pest.slug}`}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                          >
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
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
                    href="https://wa.me/551637230808?text=Olá! Preciso de controle de pragas. Gostaria de um orçamento."
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

            {/* ── MAIN ── */}
            <div className="flex-1 min-w-0">

              {/* Intro */}
              <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden mb-8 animate-fade-in-up">
                <div className="p-5 border-b border-border/60 flex items-center gap-3 bg-primary/5">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                    <Microscope className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">Por que conhecer as pragas?</h2>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    O controle eficaz de pragas começa com o entendimento profundo de sua biologia, comportamento e ciclo reprodutivo. Esse conhecimento permite desenvolver estratégias direcionadas e sustentáveis, com maior eficácia e menor impacto ambiental.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    Clique em qualquer praga abaixo para acessar informações detalhadas sobre sua biologia, onde é encontrada, como prevenir e como realizar o controle adequado.
                  </p>
                </div>
              </div>

              {/* Pest grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {pests.map((pest, index) => {
                  const danger = dangerConfig[pest.dangerLevel];
                  return (
                    <Link
                      key={pest.slug}
                      to={`/pragas/${pest.slug}`}
                      className="group block"
                      style={{ animationDelay: `${index * 0.06}s` }}
                    >
                      <div className="glass-strong rounded-2xl border border-border/60 hover:border-primary/40 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col animate-scale-bounce">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                              <img
                                src={pest.img}
                                alt={pest.name}
                                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 dark:invert"
                                aria-hidden="true"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                {pest.name}
                              </h3>
                              <p className="text-xs text-muted-foreground italic">{pest.scientificName}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className={`text-xs font-semibold border flex-shrink-0 ml-2 ${danger.badge}`}>
                            {danger.icon}
                            <span className="ml-1">{pest.dangerLevel}</span>
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground/80 transition-colors">
                          {pest.description}
                        </p>

                        {/* Footer link */}
                        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/50 text-sm font-semibold text-primary">
                          Ver detalhes completos
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 gradient-hero rounded-2xl p-8 text-center animate-fade-in-up">
                <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                  Identificou alguma praga no seu imóvel?
                </h3>
                <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">
                  A Bioforte realiza vistoria gratuita com diagnóstico técnico completo. Atendimento rápido e seguro.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/551637230808?text=Olá! Identificei uma praga e gostaria de solicitar uma vistoria gratuita."
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

export default BiologiaPragas;