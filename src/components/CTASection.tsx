import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6" id="cta-heading">
            Precisa de Controle de Pragas?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Entre em contato conosco e receba um orçamento personalizado.
          </p>
          <div className="flex justify-center">
            <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="font-semibold pulse-ring group">
                Solicitar Orçamento Grátis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
