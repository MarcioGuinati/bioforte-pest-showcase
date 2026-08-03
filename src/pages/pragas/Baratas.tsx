import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle, Shield, Microscope, Bug, Home, Zap,
  CheckCircle, ArrowRight, Phone, Clock, MapPin, ThumbsUp
} from "lucide-react";
import heroImage from "@/assets/biology-hero.jpeg";
import SEO from "@/components/SEO";

const risks = [
  {
    name: "Salmonela",
    description: "Causa intoxicação alimentar grave com vômito, diarreia e febre.",
    severity: "Crítico",
    color: "border-red-500/40 bg-red-500/10 text-red-400"
  },
  {
    name: "E. coli",
    description: "Bacteria contaminante de alimentos que pode causar infecções intestinais sérias.",
    severity: "Alto",
    color: "border-orange-500/40 bg-orange-500/10 text-orange-400"
  },
  {
    name: "Hepatite A",
    description: "Vírus transmitido via contato com fezes de baratas em superfícies e alimentos.",
    severity: "Crítico",
    color: "border-red-500/40 bg-red-500/10 text-red-400"
  },
  {
    name: "Disenteria",
    description: "Infecção intestinal severa que causa diarreia com sangue e cólicas intensas.",
    severity: "Alto",
    color: "border-orange-500/40 bg-orange-500/10 text-orange-400"
  },
  {
    name: "Alergias",
    description: "Proteínas presentes em dejetos desencadeiam crises alérgicas e asma, especialmente em crianças.",
    severity: "Médio",
    color: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
  },
  {
    name: "Tifo",
    description: "Doença bacteriana séria transmitida por baratas que circulam entre esgoto e alimentos.",
    severity: "Crítico",
    color: "border-red-500/40 bg-red-500/10 text-red-400"
  },
];

const signs = [
  { icon: "👃", title: "Odor forte e característico", desc: "Cheiro oleoso e muscarado em armários, gavetas e atrás de eletrodomésticos." },
  { icon: "⚫", title: "Fezes escuras e pequenas", desc: "Pontos escuros parecidos com grãos de pimenta em prateleiras e gavetas." },
  { icon: "🥚", title: "Ootecas (cápsulas de ovos)", desc: "Cápsulas marrom-avermelhadas contendo até 50 ovos cada, escondidas em frestas." },
  { icon: "🪲", title: "Baratas mortas ou vivas", desc: "Avistamento de baratas durante o dia é sinal de infestação grave — elas são noturnas." },
  { icon: "🟤", title: "Manchas escuras", desc: "Marcas de dejetos nas paredes, próximas a frestas, ralos e rodapés." },
  { icon: "🔊", title: "Ruídos noturnos", desc: "Sons de baratas se movendo em gavetas e armários à noite." },
];

const lifecycle = [
  { stage: "Ovo", duration: "28–30 dias", desc: "A fêmea carrega a ooteca com até 50 ovos. Uma única fêmea produz até 8 ootecas na vida." },
  { stage: "Ninfa", duration: "2–6 meses", desc: "Passam por 6 a 7 estágios de muda, crescendo gradualmente até atingir a fase adulta." },
  { stage: "Adulto", duration: "6–12 meses", desc: "Adultos se reproduzem rapidamente. Uma infestação pode dobrar em semanas sem controle." },
];

const whyBioforte = [
  { icon: Microscope, title: "Diagnóstico Técnico", desc: "Identificamos a espécie, nível de infestação e focos para um tratamento preciso." },
  { icon: Shield, title: "Produtos ANVISA", desc: "Apenas produtos regulamentados e aprovados, seguros para família e pets." },
  { icon: Zap, title: "Resultado Rápido", desc: "Eliminação eficaz já nas primeiras horas após a aplicação." },
  { icon: CheckCircle, title: "Garantia de Serviço", desc: "Retorno garantido caso o problema persista após o tratamento." },
  { icon: Clock, title: "+30 Anos de Experiência", desc: "Décadas de expertise em controle de pragas urbanas em toda a região." },
  { icon: ThumbsUp, title: "98% de Satisfação", desc: "Mais de 5.000 clientes atendidos com excelência comprovada." },
];

const BaratasPage = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Controle de Baratas"
        description="Baratas transmitem Salmonela, Hepatite A e E. coli. Conheça os riscos, sinais de infestação e como a Bioforte elimina esses insetos com segurança e eficácia."
        canonical="/pragas/baratas"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Barata – Blattodea"
            width="1920"
            height="660"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="barata-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#barata-grid)" />
          </svg>
          <div className="absolute top-16 right-1/3 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative container mx-auto px-4 py-14 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-red-400 text-red-300 bg-red-600/30 animate-fade-in">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              Risco à Saúde Pública
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 animate-fade-in-up leading-tight">
              <span className="text-white drop-shadow-lg">Baratas</span>
            </h1>
            <p className="text-lg text-white/80 italic mb-2 animate-fade-in drop-shadow">
              Blattodea — o inimigo silencioso da sua saúde
            </p>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed animate-blur-in max-w-2xl mt-4 drop-shadow">
              Uma barata carrega mais de <strong className="text-white font-bold">30 tipos de bactérias</strong> no corpo e nas patas.
              Ela circula pelo esgoto, entra na sua cozinha e contamina tudo que toca — sem que você perceba.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-fade-in w-full sm:w-auto" style={{ animationDelay: "0.4s" }}>
              <a
                href="https://wa.me/551637230808?text=Olá! Preciso eliminar baratas. Gostaria de um orçamento."
                target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="hero" size="lg" className="font-bold pulse-ring hover-shine w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Solicitar Vistoria Gratuita
                </Button>
              </a>
              <Link to="/biologia-pragas" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="font-semibold w-full sm:w-auto">
                  Ver Todas as Pragas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALERTA URGÊNCIA ── */}
      <section className="py-8 bg-red-700 border-y border-red-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-white flex-shrink-0 animate-pulse" />
              <p className="text-base font-semibold text-white">
                Uma única barata pode indicar uma colônia de <strong className="underline decoration-yellow-300">centenas</strong> escondidas nas paredes e frestas.
              </p>
            </div>
            <div className="h-px md:h-8 w-full md:w-px bg-white/30" />
            <p className="text-sm text-white/90">
              Elas se reproduzem em <strong className="text-yellow-300">28 dias</strong>. Quanto mais você espera, pior fica.
            </p>
          </div>
        </div>
      </section>

      {/* ── RISCOS À SAÚDE ── */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="risks-heading">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 border-red-500/40 text-red-400">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Riscos Comprovados
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="risks-heading">
              Doenças transmitidas
              <span className="text-red-400"> por baratas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Baratas contaminam alimentos e superfícies com bactérias e vírus perigosos.
              Confira os principais riscos para a saúde da sua família.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {risks.map((risk, i) => (
              <Card
                key={i}
                className={`glass-strong border-2 ${risk.color.split(' ')[0]} hover-lift animate-scale-bounce`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{risk.name}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${risk.color}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{risk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SINAIS DE INFESTAÇÃO ── */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="signs-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Bug className="h-3 w-3 mr-1" />
              Como Identificar
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="signs-heading">
              Sinais de <span className="text-gradient">infestação</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Baratas são noturnas e se escondem bem. Fique atento a estes sinais antes que a situação piore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {signs.map((sign, i) => (
              <div
                key={i}
                className="glass-strong rounded-2xl p-6 hover-lift group animate-scale-bounce border border-border/50 hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="text-4xl mb-4">{sign.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{sign.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{sign.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CICLO DE VIDA ── */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="lifecycle-heading">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-1/2 left-10 w-80 h-80 bg-primary rounded-full blur-3xl -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Microscope className="h-3 w-3 mr-1" />
                Biologia
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="lifecycle-heading">
                Ciclo de vida da <span className="text-gradient">barata</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entender como a barata se reproduz é essencial para o controle eficaz.
                Uma infestação cresce <strong>exponencialmente</strong> sem tratamento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {lifecycle.map((phase, i) => (
                <div key={i} className="relative">
                  {i < lifecycle.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-8 z-10 -translate-x-4">
                      <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                    </div>
                  )}
                  <Card className="glass-strong hover-lift h-full animate-scale-bounce border-2 border-primary/20 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8 text-center">
                      <div className="gradient-animated text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 font-bold text-2xl">
                        {i + 1}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gradient">{phase.stage}</h3>
                      <p className="text-sm text-primary font-semibold mb-4">{phase.duration}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Fact box */}
            <div className="mt-12 glass-strong rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-red-300 mb-1">Fato alarmante</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Uma fêmea de barata produz <strong className="text-foreground">até 400 filhotes por ano</strong>.
                    Em condições ideais de umidade e calor — como cozinhas e banheiros — a reprodução é ainda mais acelerada.
                    Sem tratamento profissional, uma infestação domina o ambiente em semanas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HABITATS ── */}
      <section className="py-20 bg-muted/30" aria-labelledby="habitat-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Home className="h-3 w-3 mr-1" />
              Onde se Escondem
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" id="habitat-heading">
              Locais favoritos das <span className="text-gradient">baratas</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { emoji: "🍽️", local: "Cozinha", desc: "Atrás da geladeira, fogão, pia e sob armários" },
              { emoji: "🚿", local: "Banheiro", desc: "Dentro de ralos, sob pias e atrás de azulejos soltos" },
              { emoji: "📦", local: "Despensa", desc: "Entre caixas de papelão e embalagens de alimentos" },
              { emoji: "🔧", local: "Instalações", desc: "Dentro de eletrodomésticos, painéis e fiações" },
            ].map((h, i) => (
              <Card key={i} className="glass text-center hover-lift animate-scale-bounce" style={{ animationDelay: `${i * 0.08}s` }}>
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{h.emoji}</div>
                  <h3 className="font-bold text-lg mb-2">{h.local}</h3>
                  <p className="text-muted-foreground text-sm">{h.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE BIOFORTE ── */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="bioforte-heading">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 hover-glow">Por que Bioforte?</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="bioforte-heading">
              Eliminamos baratas com <span className="text-gradient">precisão técnica</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Não basta matar as que aparecem. Nossa metodologia elimina a colônia inteira,
              incluindo ninhos, ovos e pontos de reprodução.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {whyBioforte.map((item, i) => (
              <Card key={i} className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: `${i * 0.08}s` }}>
                <CardContent className="p-6">
                  <div className="gradient-animated p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process steps */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">Como funciona nosso tratamento</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { n: "1", title: "Vistoria", desc: "Mapeamos todos os focos e espécies presentes" },
                { n: "2", title: "Plano", desc: "Definimos a metodologia e produtos adequados" },
                { n: "3", title: "Aplicação", desc: "Tratamento preciso em todos os pontos críticos" },
                { n: "4", title: "Monitoramento", desc: "Acompanhamento para garantir resultado total" },
              ].map((step, i) => (
                <div key={i} className="text-center animate-scale-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="gradient-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {step.n}
                  </div>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 gradient-hero relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in-up" id="cta-heading">
              Baratas na sua casa?
              <br />Resolvemos <em>hoje</em>.
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 animate-blur-in">
              Não espere a infestação crescer. Entre em contato agora e receba
              uma vistoria gratuita com diagnóstico técnico completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <a
                href="https://wa.me/551637230808?text=Olá! Estou com problema de baratas e gostaria de solicitar uma vistoria gratuita."
                target="_blank" rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="font-bold text-lg px-10 pulse-ring hover-shine">
                  <Phone className="mr-2 h-5 w-5" />
                  Chamar no WhatsApp
                </Button>
              </a>
              <a href="tel:+551637230808">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  (16) 3723-0808
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Vistoria gratuita</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Orçamento sem compromisso</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Atendimento rápido</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BaratasPage;
