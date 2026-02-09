import { Badge } from "@/components/ui/badge";

// Custom SVG icons for pests
const ScorpionIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <path d="M52 28c-2 0-4 1-5 3l-3-1c0-3-2-5-5-5h-4v-4c0-2-1-4-3-5l2-4c1-2 0-4-2-5s-4 0-5 2l-3 6c-1 0-2 0-3 1l-3-6c-1-2-3-3-5-2s-3 3-2 5l2 4c-2 1-3 3-3 5v4h-4c-3 0-5 2-5 5l-3 1c-1-2-3-3-5-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3l3 1v2c0 3 2 5 5 5h4v8c0 2 2 4 4 4h2c2 0 4-2 4-4v-8h4v8c0 2 2 4 4 4h2c2 0 4-2 4-4v-8h4c3 0 5-2 5-5v-2l3-1c1 2 3 3 5 3 3 0 5-2 5-5s-2-5-5-5z"/>
  </svg>
);

const AntIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="20" cy="16" r="6"/>
    <ellipse cx="32" cy="28" rx="8" ry="6"/>
    <ellipse cx="32" cy="48" rx="10" ry="8"/>
    <path d="M12 20l-8 8M52 20l8 8M14 32l-10 4M50 32l10 4M16 48l-8 8M48 48l8 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const CockroachIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <ellipse cx="32" cy="20" rx="10" ry="8"/>
    <ellipse cx="32" cy="42" rx="14" ry="16"/>
    <path d="M18 24l-12-8M46 24l12-8M16 36l-14 2M48 36l14 2M18 52l-10 8M46 52l10 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="28" cy="18" r="2" fill="white"/>
    <circle cx="36" cy="18" r="2" fill="white"/>
  </svg>
);

const PigeonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <ellipse cx="36" cy="32" rx="16" ry="12"/>
    <circle cx="18" cy="24" r="10"/>
    <path d="M12 28l-6 4 8-2" />
    <path d="M52 32c8 4 8 12 0 16l-8-8z"/>
    <circle cx="14" cy="22" r="2" fill="white"/>
    <path d="M24 48l-4 12M32 48l0 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const MosquitoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="32" cy="14" r="6"/>
    <ellipse cx="32" cy="32" rx="6" ry="10"/>
    <ellipse cx="32" cy="50" rx="4" ry="8"/>
    <path d="M32 8l0-6M26 32l-16-8M38 32l16-8M24 44l-12 12M40 44l12 12M28 20l-8-4M36 20l8-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M20 28c-6 2-10 8-8 12M44 28c6 2 10 8 8 12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
  </svg>
);

const SpiderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="32" cy="24" r="10"/>
    <ellipse cx="32" cy="44" rx="12" ry="10"/>
    <path d="M22 20c-8-4-16-2-18 4M42 20c8-4 16-2 18 4M20 28c-10 0-18 4-18 10M44 28c10 0 18 4 18 10M22 44c-8 6-14 12-12 16M42 44c8 6 14 12 12 16M24 52c-4 8-6 12-2 14M40 52c4 8 6 12 2 14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="28" cy="22" r="2" fill="white"/>
    <circle cx="36" cy="22" r="2" fill="white"/>
  </svg>
);

const WaterTankIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <rect x="12" y="16" width="40" height="40" rx="4"/>
    <rect x="8" y="12" width="48" height="8" rx="2"/>
    <path d="M24 56l-4 6M40 56l4 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M22 32c2-4 6-6 10-6s8 2 10 6c-2 4-6 6-10 6s-8-2-10-6z" fill="white" opacity="0.3"/>
    <circle cx="32" cy="38" r="3" fill="white" opacity="0.5"/>
  </svg>
);

const pests = [
  { name: "Escorpião", icon: ScorpionIcon },
  { name: "Formiga", icon: AntIcon },
  { name: "Barata", icon: CockroachIcon },
  { name: "Pombo", icon: PigeonIcon },
  { name: "Mosquito", icon: MosquitoIcon },
  { name: "Aranha", icon: SpiderIcon },
  { name: "Caixa D'Água", icon: WaterTankIcon },
];

const PestsSection = () => {
  return (
    <section className="py-16 bg-muted/50 dark:bg-background relative overflow-hidden" aria-labelledby="pests-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">Principais Pragas</Badge>
          <h2 className="text-2xl lg:text-3xl font-bold" id="pests-heading">
            Combatemos as pragas 
            <span className="text-gradient"> mais comuns</span>
          </h2>
        </div>

        <ul 
          className="flex flex-wrap justify-center gap-6 lg:gap-10 list-none p-0 m-0"
          aria-label="Pragas que combatemos"
        >
          {pests.map((pest, index) => (
            <li
              key={pest.name}
              className="flex flex-col items-center group cursor-pointer animate-scale-bounce"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 shadow-md">
                <pest.icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm lg:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {pest.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PestsSection;
