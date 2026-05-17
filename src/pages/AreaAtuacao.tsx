import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building,
  ShoppingCart,
  Utensils,
  Hotel,
  School,
  Hospital,
  Factory,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  Clock,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import UnitsMap from "@/components/UnitsMap";
import heroImage from "@/assets/hero-specialist.jpg";

const services = [
  {
    category: "Residencial",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Proteção completa para sua casa e família",
    services: [
      "Dedetização completa",
      "Desratização",
      "Controle de formigas",
      "Eliminação de baratas",
      "Controle de mosquitos",
      "Tratamento de cupins"
    ],
    features: [
      "Produtos seguros para pets",
      "Atendimento personalizado",
      "Garantia estendida",
      "Visitas de manutenção"
    ]
  },
  {
    category: "Comercial",
    icon: ShoppingCart,
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Soluções para comércios e escritórios",
    services: [
      "Controle preventivo",
      "Dedetização comercial",
      "Desratização",
      "Controle integrado",
      "Monitoramento contínuo",
      "Relatórios técnicos"
    ],
    features: [
      "Horários flexíveis",
      "Certificados sanitários",
      "Planos corporativos",
      "Suporte técnico"
    ]
  },
  {
    category: "Industrial",
    icon: Factory,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Controle especializado para indústrias",
    services: [
      "Programa MIP",
      "Auditoria sanitária",
      "Controle de roedores",
      "Dedetização industrial",
      "Controle de pombos",
      "Fumigação"
    ],
    features: [
      "Normas regulamentares",
      "Equipe especializada",
      "Certificação Anvisa",
      "Relatórios detalhados"
    ]
  },
  {
    category: "Hospitalar",
    icon: Hospital,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Controle especializado para área da saúde",
    services: [
      "Controle hospitalar",
      "Desinfecção",
      "Controle de vetores",
      "Monitoramento",
      "Validação",
      "Documentação"
    ],
    features: [
      "Produtos hospitalares",
      "Protocolos rígidos",
      "Equipe certificada",
      "Zero interrupção"
    ]
  },
  {
    category: "Alimentício",
    icon: Utensils,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Segurança alimentar garantida",
    services: [
      "BPF - Boas Práticas",
      "HACCP",
      "Controle integrado",
      "Auditoria APPCC",
      "Treinamentos",
      "Consultoria"
    ],
    features: [
      "Aprovação ANVISA",
      "Rastreabilidade",
      "Documentação completa",
      "Suporte contínuo"
    ]
  },
  {
    category: "Hotelaria",
    icon: Hotel,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    description: "Experiência do hóspede protegida",
    services: [
      "Controle discreto",
      "Dedetização quartos",
      "Áreas comuns",
      "Cozinhas e restaurantes",
      "Piscinas e jardins",
      "Manutenção preventiva"
    ],
    features: [
      "Atendimento rápido",
      "Discrição total",
      "Horários flexíveis",
      "Sem interrupções"
    ]
  }
];

const stats = [
  { icon: Shield, number: "100%", label: "Segurança" },
  { icon: Users, number: "5000+", label: "Clientes" },
  { icon: CheckCircle, number: "100%", label: "Garantia comprovada" },
  { icon: Award, number: "30+", label: "Anos" }
];

import SEO from "@/components/SEO";

const AreaAtuacao = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Áreas de Atuação"
        description="Soluções completas de controle de pragas para residências, comércios, indústrias, hospitais e setor alimentício. Atendimento especializado."
        canonical="/area-atuacao"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Área de Atuação"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-in hover-glow">
              Área de Atuação
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Soluções Completas em
              <br />
              <span className="text-gradient"> Controle de Pragas</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-blur-in">
              Atendemos todos os segmentos com soluções personalizadas,
              garantindo máxima eficiência e segurança para seu ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-5 right-5 w-40 h-40 bg-primary rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center hover-lift group animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-center mb-4">
                  <div className="gradient-animated p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 text-shimmer">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium group-hover:text-primary transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Especialistas em <span className="text-gradient">todos os segmentos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada segmento tem suas particularidades. Nossa experiência garante
              soluções específicas e eficazes para cada necessidade.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-strong overflow-hidden hover-lift group animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Icon Section */}
                    <div className={`${service.bgColor} p-8 flex items-center justify-center min-w-[120px] group-hover:scale-105 transition-transform duration-300`}>
                      <service.icon className={`h-12 w-12 ${service.color} hover-scale`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{service.category}</h3>
                      <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors">{service.description}</p>

                      {/* Services List */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                          Serviços Inclusos
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.services.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                              <CheckCircle className="h-3 w-3 text-primary flex-shrink-0 animate-pulse-slow" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                          Diferenciais
                        </h4>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <div className="w-1 h-1 bg-primary rounded-full animate-pulse-slow" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button variant="hero" size="sm" className="w-full hover-shine pulse-ring">
                          Solicitar Orçamento
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Nosso Processo</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Como <span className="text-primary">trabalhamos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Metodologia comprovada que garante resultados eficazes e duradouros.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Inspeção Técnica",
                  description: "Avaliação completa do local e identificação das pragas"
                },
                {
                  step: "02",
                  title: "Plano Personalizado",
                  description: "Desenvolvimento de estratégia específica para seu caso"
                },
                {
                  step: "03",
                  title: "Aplicação",
                  description: "Execução do tratamento com produtos certificados"
                },
                {
                  step: "04",
                  title: "Monitoramento",
                  description: "Acompanhamento e manutenção preventiva"
                }
              ].map((process, index) => (
                <Card key={index} className="glass text-center">
                  <CardContent className="p-6">
                    <div className="gradient-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {process.step}
                    </div>
                    <h3 className="font-bold text-lg mb-3">{process.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Units Map */}
      <UnitsMap />

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Precisa de uma solução personalizada?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para desenvolver a melhor estratégia
            para seu ambiente específico.
          </p>
          <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="font-semibold">
              Solicitar Orçamento Personalizado
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AreaAtuacao;