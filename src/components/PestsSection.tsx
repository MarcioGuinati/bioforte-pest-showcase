import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { MousePointerClick } from "lucide-react";
import formigaIcon from "@/assets/Icones-site_02-Formiga.svg";
import barataIcon from "@/assets/Icones-site_03-Barata.svg";
import pomboIcon from "@/assets/Icones-site_04-Pombo.svg";
import moscaIcon from "@/assets/Icones-site_05-Mosca.svg";
import ratoIcon from "@/assets/Icones-site_06-Rato.svg";
import aranhaIcon from "@/assets/Icones-site_07-Aranha.svg";
import cupimIcon from "@/assets/Icones-site_08-Cupim.svg";
import carrapatoIcon from "@/assets/Icones-site_09-Carrapato.svg";
import piolhoIcon from "@/assets/Icones-site_10-Piolho.svg";
import cxIcon from "@/assets/Icones-site_cx.svg";
import escorpiaoIcon from "@/assets/Icones-site-01-escorpiao.svg";

const pests = [
  { name: "Escorpião", img: escorpiaoIcon, path: "/biologia-pragas" },
  { name: "Formiga", img: formigaIcon, path: "/biologia-pragas" },
  { name: "Barata", img: barataIcon, path: "/pragas/baratas" },
  { name: "Pombo", img: pomboIcon, path: "/biologia-pragas" },
  { name: "Mosca", img: moscaIcon, path: "/biologia-pragas" },
  { name: "Rato", img: ratoIcon, path: "/biologia-pragas" },
  { name: "Aranha", img: aranhaIcon, path: "/biologia-pragas" },
  { name: "Cupim", img: cupimIcon, path: "/biologia-pragas" },
  { name: "Carrapato", img: carrapatoIcon, path: "/biologia-pragas" },
  { name: "Piolho de pássaros", img: piolhoIcon, path: "/biologia-pragas" },
  { name: "Caixa D'Água", img: cxIcon, path: "/biologia-pragas" },
];

const PestsSection = () => {
  const trackRef = useRef<HTMLUListElement>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let startTime: number | null = null;
    const speed = 0.1; // px per ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const totalWidth = track.scrollWidth / 2; // duplicated list
      const offset = (elapsed * speed) % totalWidth;
      track.style.transform = `translateX(-${offset}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { startTime = null; animationId = requestAnimationFrame(step); };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate list for seamless loop
  const allPests = [...pests, ...pests];

  return (
    <section className="py-16 bg-muted/50 dark:bg-background relative overflow-hidden" aria-labelledby="pests-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
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

          {/* ── CTA hint ── */}
          <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold text-sm lg:text-base">
            <MousePointerClick className="h-4 w-4 animate-bounce" aria-hidden="true" />
            <span>Clique em uma praga para saber mais sobre ela</span>
            <MousePointerClick className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Carousel wrapper — full bleed with fade edges */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-muted/50 dark:from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-muted/50 dark:from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <ul
          ref={trackRef}
          className="flex gap-6 lg:gap-10 list-none p-0 m-0 py-4 will-change-transform"
          aria-label="Pragas que combatemos"
          style={{ width: "max-content" }}
        >
          {allPests.map((pest, index) => (
            <li
              key={`${pest.name}-${index}`}
              className="flex-shrink-0"
              aria-hidden={index >= pests.length}
            >
              <Link
                to={pest.path}
                className="flex flex-col items-center group cursor-pointer"
                tabIndex={index >= pests.length ? -1 : 0}
                aria-label={`Ver informações sobre ${pest.name}`}
              >
                {/* Icon circle with hover overlay */}
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src={pest.img}
                    alt={pest.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 dark:invert group-hover:opacity-0"
                  />
                  {/* "Ver mais" overlay on hover */}
                  <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-bold tracking-wide">Ver mais →</span>
                  </div>
                </div>

                <span className="text-sm lg:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pest.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PestsSection;
