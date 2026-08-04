import { useState, useEffect } from "react";
import { getClientesCount } from "@/services/clientesService";
import { Award, Users, Star, CheckCircle } from "lucide-react";

const stats = [
  { number: "30+", label: "Anos de Experiência", icon: Award },
  { number: "5000+", label: "Clientes Atendidos", icon: Users },
  { number: "98%", label: "Satisfação", icon: Star },
  { number: "100%", label: "Garantia comprovada", icon: CheckCircle }
];

const StatsSection = () => {
  const [clientesCount, setClientesCount] = useState("5000+");

  useEffect(() => {
    let active = true;
    getClientesCount().then((count) => {
      if (active && count !== null) {
        setClientesCount(`${count}+`);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const dynamicStats = stats.map(stat => {
    if (stat.label === "Clientes Atendidos") {
      return { ...stat, number: clientesCount };
    }
    return stat;
  });

  return (
    <section className="py-20 bg-primary relative overflow-hidden" aria-labelledby="stats-heading">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent rounded-full blur-3xl" />
      </div>
      <h2 id="stats-heading" className="sr-only">Nossos Números</h2>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {dynamicStats.map((stat, index) => (
            <div key={index} className="text-center group hover-lift animate-scale-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="mb-4 inline-block" aria-hidden="true">
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/50 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {stat.number}
              </p>
              <p className="text-white/90 font-medium text-sm lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
