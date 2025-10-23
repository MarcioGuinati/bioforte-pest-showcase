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
      "Certificações ISO",
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
      "Atendimento 24h",
      "Discrição total",
      "Horários flexíveis",
      "Sem interrupções"
    ]
  }
];

const stats = [
  { icon: Shield, number: "100%", label: "Segurança" },
  { icon: Users, number: "5000+", label: "Clientes" },
  { icon: Clock, number: "24/7", label: "Suporte" },
  { icon: Award, number: "15+", label: "Anos" }
];

const AreaAtuacao = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}}></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <Badge variant="outline" className="mb-6 border-primary-foreground text-primary-foreground animate-bounce-slow">
            Área de Atuação
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Soluções Completas em
            <br />
            <span className="text-shimmer text-accent"> Controle de Pragas</span>
          </h1>
          <p className="text-lg lg:text-xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto animate-blur-in">
            Atendemos todos os segmentos com soluções personalizadas, 
            garantindo máxima eficiência e segurança para seu ambiente.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-5 right-5 w-40 h-40 bg-primary rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-bounce hover-float group">
                <div className="flex items-center justify-center mb-4">
                  <div className="gradient-animated p-3 rounded-full group-hover:animate-wiggle">
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
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" style={{animationDelay: "3s"}}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 animate-bounce-slow">Nossos Serviços</Badge>
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
              <Card key={index} className="glass-strong overflow-hidden animate-scale-bounce hover-glow group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Icon Section */}
                    <div className={`${service.bgColor} p-8 flex items-center justify-center min-w-[120px] group-hover:animate-wiggle`}>
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

                      <Button variant="hero" size="sm" className="w-full hover-shine pulse-ring group-hover:animate-glow">
                        Solicitar Orçamento
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
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

      {/* Coverage Area */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Área de Cobertura</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Atendemos toda a <span className="text-primary">Grande São Paulo</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nossa equipe está preparada para atender você em toda região metropolitana 
              com rapidez e eficiência.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "São Paulo Capital",
                  areas: ["Zona Sul", "Zona Norte", "Zona Leste", "Zona Oeste", "Centro"]
                },
                {
                  title: "ABC Paulista", 
                  areas: ["Santo André", "São Bernardo", "São Caetano", "Diadema", "Mauá"]
                },
                {
                  title: "Grande São Paulo",
                  areas: ["Guarulhos", "Osasco", "Barueri", "Cotia", "Taboão da Serra"]
                }
              ].map((region, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">{region.title}</h3>
                    <ul className="space-y-2">
                      {region.areas.map((area, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 gradient-card rounded-2xl">
              <p className="text-muted-foreground mb-4">
                <strong>Atendimento de Emergência:</strong> Disponível 24 horas para casos urgentes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contato">
                  <Button variant="hero" size="lg">
                    Verificar Atendimento na sua Região
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  (11) 99999-9999
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <Link to="/contato">
            <Button variant="secondary" size="lg" className="font-semibold">
              Solicitar Orçamento Personalizado
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AreaAtuacao;