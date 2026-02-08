import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Flame, Leaf, Award } from "lucide-react";

const seals = [
  {
    title: "Vigilância Sanitária",
    description: "Empresa licenciada pela Vigilância Sanitária",
    icon: Shield
  },
  {
    title: "Corpo de Bombeiros",
    description: "Empresa licenciada pelo Corpo de Bombeiros",
    icon: Flame
  },
  {
    title: "APRAG",
    description: "Associada à APRAG - Associação dos Controladores de Vetores e Pragas Urbanas",
    icon: Award
  },
  {
    title: "Licença Ambiental",
    description: "Empresa com Licença Ambiental regularizada",
    icon: Leaf
  }
];

const SealsSection = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden" aria-labelledby="seals-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">Certificações e Licenças</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" id="seals-heading">
            Empresa 
            <span className="text-gradient"> Regularizada</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com todas as licenças e certificações exigidas pelos órgãos reguladores, 
            garantindo segurança e conformidade em todos os nossos serviços.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Certificações e licenças da empresa">
          {seals.map((seal, index) => (
            <Card 
              key={index} 
              className="glass-strong hover-lift group animate-scale-bounce text-center" 
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div 
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ring-4 ring-gold/30"
                  aria-hidden="true"
                >
                  <seal.icon className="w-10 h-10 lg:w-12 lg:h-12 text-gold-foreground" />
                </div>
                <h3 className="font-bold text-sm lg:text-base mb-2 group-hover:text-primary transition-colors">
                  {seal.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {seal.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SealsSection;
