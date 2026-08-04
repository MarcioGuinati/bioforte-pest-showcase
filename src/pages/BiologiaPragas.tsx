import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bug,
  Shield,
  AlertTriangle,
  Eye,
  Zap,
  Home,
  ArrowRight,
  Microscope,
  MapPin,
  Lightbulb,
  Skull,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
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
    scientificName: "Blattodea",
    img: barataIcon,
    description: "Insetos noturnos que se reproduzem rapidamente e transmitem diversas doenças.",
    habitat: "Locais úmidos, quentes e escuros",
    risks: ["Salmonela", "E. coli", "Hepatite A", "Disenteria"],
    prevention: ["Manter ambiente seco", "Vedar frestas", "Limpar restos de comida", "Usar desentupidores"],
    icon: Bug,
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    accentColor: "text-red-500",
    borderColor: "border-red-500/30",
    dangerLevel: "Alto"
  },
  {
    name: "Formigas",
    scientificName: "Formicidae",
    img: formigaIcon,
    description: "Insetos sociais organizados que formam trilhas e atacam em grupos.",
    habitat: "Jardins, frestas de paredes, sob pisos",
    risks: ["Contaminação de alimentos", "Mordidas dolorosas", "Danos estruturais"],
    prevention: ["Vedar entrada", "Limpar migalhas", "Remover umidade", "Podar plantas"],
    icon: Bug,
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentColor: "text-orange-500",
    borderColor: "border-orange-500/30",
    dangerLevel: "Médio"
  },
  {
    name: "Cupins",
    scientificName: "Isoptera",
    img: cupimIcon,
    description: "Insetos que se alimentam de celulose, causando danos estruturais graves.",
    habitat: "Madeira, papelão, livros, estruturas",
    risks: ["Danos estruturais", "Prejuízos financeiros", "Colapso de estruturas"],
    prevention: ["Controlar umidade", "Tratar madeiras", "Inspeções regulares", "Ventilação adequada"],
    icon: Home,
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    accentColor: "text-yellow-600",
    borderColor: "border-yellow-500/30",
    dangerLevel: "Alto"
  },
  {
    name: "Ratos",
    scientificName: "Rattus",
    img: ratoIcon,
    description: "Roedores adaptáveis que se reproduzem rapidamente e transmitem doenças graves.",
    habitat: "Porões, sótãos, esgotos, depósitos",
    risks: ["Leptospirose", "Peste", "Hantavírus", "Salmonelose"],
    prevention: ["Vedar buracos", "Remover alimentos", "Controlar lixo", "Desentupir ralos"],
    icon: Zap,
    gradient: "from-gray-500/20 via-slate-500/10 to-transparent",
    accentColor: "text-gray-600",
    borderColor: "border-gray-500/30",
    dangerLevel: "Crítico"
  },
  {
    name: "Mosquitos",
    scientificName: "Culicidae",
    img: moscaIcon,
    description: "Insetos voadores que se reproduzem em água parada e transmitem doenças.",
    habitat: "Água parada, vasos, caixas d'água",
    risks: ["Dengue", "Zika", "Chikungunya", "Febre Amarela"],
    prevention: ["Eliminar água parada", "Usar repelentes", "Telas nas janelas", "Manter quintal limpo"],
    icon: Eye,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accentColor: "text-blue-500",
    borderColor: "border-blue-500/30",
    dangerLevel: "Crítico"
  },
  {
    name: "Aranhas",
    scientificName: "Araneae",
    img: aranhaIcon,
    description: "Aracnídeos predadores, algumas espécies são venenosas e perigosas.",
    habitat: "Cantos escuros, atrás de móveis, jardins",
    risks: ["Picadas venenosas", "Reações alérgicas", "Necrose tissular"],
    prevention: ["Limpar teias", "Vedar frestas", "Reduzir esconderijos", "Manter organização"],
    icon: Shield,
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    accentColor: "text-purple-500",
    borderColor: "border-purple-500/30",
    dangerLevel: "Alto"
  },
  {
    name: "Escorpiões",
    scientificName: "Scorpiones",
    img: escorpiaoIcon,
    description: "Aracnídeos peçonhentos extremamente perigosos, especialmente para crianças e idosos.",
    habitat: "Entulhos, terrenos baldios, frestas, encanamentos",
    risks: ["Picadas peçonhentas", "Risco de morte", "Reações graves", "Emergência médica"],
    prevention: ["Vedar ralos", "Eliminar entulhos", "Telas em ralos", "Manter quintal limpo"],
    icon: Skull,
    gradient: "from-amber-600/20 via-yellow-700/10 to-transparent",
    accentColor: "text-amber-700",
    borderColor: "border-amber-600/30",
    dangerLevel: "Crítico"
  },
  {
    name: "Pombos",
    scientificName: "Columba livia",
    img: pomboIcon,
    description: "Aves urbanas que causam sujeira, transmitem doenças e danificam estruturas.",
    habitat: "Telhados, beirais, sótãos, marquises",
    risks: ["Criptococose", "Histoplasmose", "Salmonela", "Ácaros e parasitas"],
    prevention: ["Espantadores físicos", "Telas de proteção", "Limpeza periódica", "Vedar acessos"],
    icon: Bug,
    gradient: "from-slate-500/20 via-gray-400/10 to-transparent",
    accentColor: "text-slate-600",
    borderColor: "border-slate-500/30",
    dangerLevel: "Médio"
  },
  {
    name: "Carrapatos",
    scientificName: "Ixodida",
    img: carrapatoIcon,
    description: "Parasitas hematófagos que se fixam em animais e humanos, transmitindo doenças graves.",
    habitat: "Vegetação, gramados, animais domésticos",
    risks: ["Febre Maculosa", "Doença de Lyme", "Anaplasmose", "Babesiose"],
    prevention: ["Usar repelentes", "Verificar animais", "Cortar grama", "Roupas compridas"],
    icon: Shield,
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    accentColor: "text-teal-600",
    borderColor: "border-teal-500/30",
    dangerLevel: "Alto"
  },
  {
    name: "Piolho de Pássaros",
    scientificName: "Dermanyssus gallinae",
    img: piolhoIcon,
    description: "Ácaros parasitas que vivem em aves e podem infestar ambientes humanos, causando dermatites.",
    habitat: "Ninhos de pombos, galinheiros, forros de telhado",
    risks: ["Dermatite", "Reações alérgicas", "Infestação doméstica", "Anemia em aves"],
    prevention: ["Eliminar ninhos", "Controlar pombos", "Vedar acessos", "Higienizar ambientes"],
    icon: Bug,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    accentColor: "text-pink-600",
    borderColor: "border-pink-500/30",
    dangerLevel: "Médio"
  }
];

const dangerColors: Record<string, string> = {
  "Médio": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/40",
  "Alto": "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/40",
  "Crítico": "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40"
};

import SEO from "@/components/SEO";

const BiologiaPragas = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Biologia das Pragas"
        description="Aprenda sobre a biologia, comportamento e riscos das principais pragas urbanas como baratas, ratos, cupins e mosquitos. Controle baseado em ciência."
        canonical="/biologia-pragas"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pestBiology}
            alt="Biologia das Pragas"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          {/* Deep dark overlay with green tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/85 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />
          {/* Extra dark overlay on the left to ensure white text is always legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent dark:from-black/75 dark:via-black/40 dark:to-transparent" />
          {/* Green neon tint on far right */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/10 via-transparent to-transparent" />
        </div>

        {/* Tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bio-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bio-grid)" />
          </svg>
          <div className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
          {/* Neon green accent glow on right side */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-in hover-glow border-primary/50 text-primary bg-primary/10">
              <Microscope className="h-3.5 w-3.5 mr-1.5" />
              Conheça o Inimigo
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up text-white">
              Biologia das
              <span className="text-gradient"> Pragas Urbanas</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed animate-blur-in">
              Entender a praga é o primeiro passo para eliminá-la.
            </p>
            <p className="text-base text-white/65 leading-relaxed animate-blur-in mt-3 max-w-xl" style={{ animationDelay: "0.2s" }}>
              Conhecimento científico aplicado ao controle eficaz — biologia, comportamento e ciclo de vida das principais pragas urbanas.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-fade-in-up">
              Por que <span className="text-gradient">conhecer</span> as pragas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-blur-in">
              O controle eficaz de pragas começa com o entendimento profundo de sua biologia,
              comportamento e ciclo reprodutivo. Esse conhecimento permite desenvolver
              estratégias direcionadas e sustentáveis.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Identificação</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Reconhecer espécies e sinais de infestação
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Prevenção</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Medidas preventivas baseadas no comportamento
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Controle</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Tratamentos específicos e eficazes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pests Details */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-20 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">
              <Microscope className="h-3 w-3 mr-1" />
              Principais Pragas
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Guia completo das <span className="text-gradient">pragas urbanas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça em detalhes cada praga que combatemos. Clique em "Solicitar Tratamento"
              para um atendimento especializado.
            </p>
          </div>

          {/* Modern Grid of Pest Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {pests.map((pest, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-2 ${pest.borderColor} bg-card hover-lift animate-scale-bounce transition-all duration-500 hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pest.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} aria-hidden="true" />

                {/* Floating decorative blob */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${pest.gradient} blur-2xl opacity-60 group-hover:scale-125 transition-transform duration-700`} aria-hidden="true" />

                <CardContent className="relative p-0 flex flex-col h-full">
                  {/* Header with emoji and danger badge */}
                  <div className="p-6 pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 ${pest.accentColor} opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity`} />
                        {'img' in pest ? (
                          <img
                            src={(pest as any).img}
                            alt={pest.name}
                            className="relative w-14 h-14 lg:w-16 lg:h-16 object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 dark:invert"
                            aria-hidden="true"
                          />
                        ) : (
                          <div className="relative text-5xl lg:text-6xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" aria-hidden="true">
                            {(pest as any).emoji}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {pest.name}
                        </h3>
                        <p className="text-xs text-muted-foreground italic">
                          {pest.scientificName}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${dangerColors[pest.dangerLevel]} font-bold text-xs whitespace-nowrap`}
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {pest.dangerLevel}
                    </Badge>
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {pest.description}
                    </p>
                  </div>

                  {/* Habitat */}
                  <div className="px-6 pb-4">
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground mb-0.5">Habitat</p>
                        <p className="text-xs text-muted-foreground">{pest.habitat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Risks Pills */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
                        Riscos à Saúde
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {pest.risks.map((risk, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 font-medium"
                        >
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prevention Tips */}
                  <div className="px-6 pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Como Prevenir
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {pest.prevention.slice(0, 3).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          <Shield className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="p-6 pt-4 border-t border-border/50 mt-auto">
                    <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um tratamento para controle de pragas." target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        variant="hero"
                        size="sm"
                        className="w-full font-semibold group/btn hover-shine"
                      >
                        Solicitar Tratamento
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Helper notice */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 flex items-center gap-4 border border-primary/20">
              <div className="gradient-animated p-3 rounded-full flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold mb-1">Não encontrou sua praga?</p>
                <p className="text-sm text-muted-foreground">
                  Atendemos diversas outras pragas urbanas. Entre em contato e receba um diagnóstico personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Pest Management */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Manejo Integrado</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Controle <span className="text-primary">integrado</span> de pragas
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nossa abordagem combina conhecimento científico, métodos sustentáveis
              e tecnologia avançada para resultados duradouros.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Inspeção", desc: "Avaliação detalhada" },
                { title: "Identificação", desc: "Espécies e grau de infestação" },
                { title: "Tratamento", desc: "Métodos específicos" },
                { title: "Monitoramento", desc: "Acompanhamento contínuo" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="gradient-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Precisa de controle profissional de pragas?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para resolver seu problema
            com eficiência e segurança.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="font-semibold">
                Solicitar Orçamento Gratuito
              </Button>
            </a>
            <Link to="/area-atuacao">
              <Button
                variant="outline"
                size="lg"
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Ver Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BiologiaPragas;