import { Badge } from "@/components/ui/badge";
import bombeirosIcon from "@/assets/Icones-site_20-Corpo de Bombeiros.svg";
import qualidadeIcon from "@/assets/Icones-site_20-Qualidade.svg";
import apragIcon from "@/assets/Icones-site_21-APRAG.svg";

const seals = [
  {
    title: "Corpo de Bombeiros",
    subtitle: "Empresa Licenciada",
    img: bombeirosIcon,
  },
  {
    title: "Qualidade",
    subtitle: "Certificada",
    img: qualidadeIcon,
  },
  {
    title: "APRAG",
    subtitle: "Associada",
    img: apragIcon,
  }
];

const SealMedal = ({ seal, index }: { seal: typeof seals[0]; index: number }) => {
  return (
    <div
      className="flex flex-col items-center group animate-scale-bounce"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img
        src={seal.img}
        alt={seal.title}
        className="w-28 h-28 lg:w-36 lg:h-36 object-contain group-hover:scale-110 transition-transform duration-300"
      />
      <h3 className="mt-4 font-bold text-sm lg:text-base text-center group-hover:text-primary transition-colors">
        {seal.title}
      </h3>
      <span className="text-xs text-muted-foreground text-center">{seal.subtitle}</span>
    </div>
  );
};

const SealsSection = () => {
  return (
    <section className="py-20 bg-secondary dark:bg-muted/30 relative overflow-hidden" aria-labelledby="seals-heading">
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

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 list-none p-0 m-0" aria-label="Certificações e licenças da empresa">
          {seals.map((seal, index) => (
            <li key={index}>
              <SealMedal seal={seal} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SealsSection;
