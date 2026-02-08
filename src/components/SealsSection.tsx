import { Badge } from "@/components/ui/badge";
import { Shield, Flame, Leaf, Award } from "lucide-react";

const seals = [
  {
    title: "Vigilância Sanitária",
    subtitle: "Empresa Licenciada",
    icon: Shield
  },
  {
    title: "Corpo de Bombeiros",
    subtitle: "Empresa Licenciada",
    icon: Flame
  },
  {
    title: "APRAG",
    subtitle: "Associada",
    icon: Award
  },
  {
    title: "Licença Ambiental",
    subtitle: "Regularizada",
    icon: Leaf
  }
];

const SealMedal = ({ seal, index }: { seal: typeof seals[0]; index: number }) => {
  return (
    <div 
      className="flex flex-col items-center group animate-scale-bounce"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Medal Container */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-1 shadow-xl group-hover:scale-105 transition-transform duration-300">
          {/* Inner Ring with dots pattern */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gold via-gold-light to-gold p-1 relative">
            {/* Dotted border effect */}
            <div 
              className="absolute inset-1 rounded-full border-2 border-gold-dark/30"
              style={{
                borderStyle: 'dotted'
              }}
            />
            {/* Center Circle */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex flex-col items-center justify-center relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
              
              {/* Icon */}
              <seal.icon className="w-8 h-8 lg:w-10 lg:h-10 text-gold-foreground mb-1 relative z-10" />
              
              {/* Text */}
              <span className="text-[8px] lg:text-[10px] font-bold text-gold-foreground uppercase tracking-wider text-center px-2 relative z-10">
                {seal.subtitle}
              </span>
            </div>
          </div>
        </div>
        
        {/* Ribbon */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex">
          {/* Left ribbon */}
          <div className="w-6 h-12 lg:w-8 lg:h-14 bg-gradient-to-b from-gold to-gold-dark transform -skew-x-12 -mr-1 shadow-md relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-primary/20" />
          </div>
          {/* Right ribbon */}
          <div className="w-6 h-12 lg:w-8 lg:h-14 bg-gradient-to-b from-gold to-gold-dark transform skew-x-12 -ml-1 shadow-md relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-primary/20" />
          </div>
        </div>
      </div>
      
      {/* Title below medal */}
      <h3 className="mt-8 font-bold text-sm lg:text-base text-center group-hover:text-primary transition-colors">
        {seal.title}
      </h3>
    </div>
  );
};

const SealsSection = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden" aria-labelledby="seals-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" role="list" aria-label="Certificações e licenças da empresa">
          {seals.map((seal, index) => (
            <div key={index} role="listitem">
              <SealMedal seal={seal} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SealsSection;
