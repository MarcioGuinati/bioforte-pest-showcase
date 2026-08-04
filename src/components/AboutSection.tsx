import { Shield, Users, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AboutSectionProps {
  clientesCount: string;
}

const AboutSection = ({ clientesCount }: AboutSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4">Sobre a Bioforte</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" id="about-heading">
              Experiência e Confiabilidade em
              <span className="text-gradient"> Controle de Pragas</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A Bioforte é especialista em controle integrado de pragas urbanas,
              oferecendo soluções personalizadas para residências, comércios e indústrias.
              Nossa missão é proteger a saúde e o bem-estar dos nossos clientes através
              de serviços de alta qualidade.
            </p>

            <ul className="space-y-4 mb-8" aria-label="Diferenciais da Bioforte">
              {[
                "Profissionais certificados e treinados",
                "Produtos aprovados pela ANVISA",
                "Técnicas modernas e sustentáveis",
                "Atendimento personalizado"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/quem-somos">
              <Button variant="hero" size="lg" className="font-semibold pulse-ring group">
                Conheça Nossa História
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <div className="relative animate-scale-in">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl hover-lift">
              <dl className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <dt className="sr-only">Certificação</dt>
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                  <dd className="font-bold text-2xl text-gradient">Anvisa</dd>
                  <dd className="text-xs text-muted-foreground">Certificada</dd>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <dt className="sr-only">Segurança</dt>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                  <dd className="font-bold text-2xl text-gradient">100%</dd>
                  <dd className="text-xs text-muted-foreground">Seguro</dd>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <dt className="sr-only">Clientes atendidos</dt>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                  <dd className="font-bold text-2xl text-gradient">{clientesCount}</dd>
                  <dd className="text-xs text-muted-foreground">Clientes</dd>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <dt className="sr-only">Garantia</dt>
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                  <dd className="font-bold text-2xl text-gradient">100%</dd>
                  <dd className="text-xs text-muted-foreground">Garantia comprovada</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
