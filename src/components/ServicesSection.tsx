import { Shield, Users, Zap, Leaf, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Dedetização Residencial",
    description: "Proteção completa para sua casa e família",
    icon: Shield,
    features: ["Baratas", "Formigas", "Mosquitos", "Aranhas"]
  },
  {
    title: "Controle Comercial",
    description: "Soluções para empresas e estabelecimentos",
    icon: Users,
    features: ["Restaurantes", "Hotéis", "Escritórios", "Indústrias"]
  },
  {
    title: "Desratização",
    description: "Eliminação segura de roedores",
    icon: Zap,
    features: ["Ratos", "Camundongos", "Controle preventivo", "Monitoramento"]
  },
  {
    title: "Afastamento de Pombos",
    description: "Métodos sustentáveis e seguros",
    icon: Leaf,
    features: ["Sustentável", "Não letal e não invasivo", "Resultado Garantido", "Baixa manutenção"]
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 hover-glow">Nossos Serviços</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" id="services-heading">
            Soluções Completas em
            <span className="text-gradient"> Controle de Pragas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos serviços especializados com tecnologia de ponta e
            profissionais certificados para garantir a segurança do seu ambiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass-strong hover-lift group animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="gradient-animated p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2" aria-label={`Características do serviço ${service.title}`}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2 text-xs group-hover:text-foreground transition-colors">
                      <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link to="/area-atuacao">
            <Button variant="hero" size="lg" className="font-semibold pulse-ring hover-shine">
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
