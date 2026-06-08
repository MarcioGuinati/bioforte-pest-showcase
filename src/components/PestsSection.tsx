import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import formigaIcon from "@/assets/Icones-site_02-Formiga.svg";
import barataIcon from "@/assets/Icones-site_03-Barata.svg";
import pomboIcon from "@/assets/Icones-site_04-Pombo.svg";
import moscaIcon from "@/assets/Icones-site_05-Mosca.svg";
import ratoIcon from "@/assets/Icones-site_06-Rato.svg";
import aranhaIcon from "@/assets/Icones-site_07-Aranha.svg";
import cupimIcon from "@/assets/Icones-site_08-Cupim.svg";
import carrapatoIcon from "@/assets/Icones-site_09-Carrapato.svg";
import piolhoIcon from "@/assets/Icones-site_10-Piolho.svg";

const pests = [
  { name: "Formiga",          img: formigaIcon,   path: "/biologia-pragas" },
  { name: "Barata",           img: barataIcon,    path: "/pragas/baratas" },
  { name: "Pombo",            img: pomboIcon,     path: "/biologia-pragas" },
  { name: "Mosca",            img: moscaIcon,     path: "/biologia-pragas" },
  { name: "Rato",             img: ratoIcon,      path: "/biologia-pragas" },
  { name: "Aranha",           img: aranhaIcon,    path: "/biologia-pragas" },
  { name: "Cupim",            img: cupimIcon,     path: "/biologia-pragas" },
  { name: "Carrapato",        img: carrapatoIcon, path: "/biologia-pragas" },
  { name: "Piolho de pássaros", img: piolhoIcon,  path: "/biologia-pragas" },
];

const PestsSection = () => {
  const trackRef = useRef<HTMLUListElement>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let startTime: number | null = null;
    const speed = 0.15; // px per ms

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
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src={pest.img}
                    alt={pest.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300 dark:invert"
                  />
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
