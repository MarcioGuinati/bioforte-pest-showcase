import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bug, 
  Shield, 
  AlertTriangle,
  Eye,
  Zap,
  Home,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import pestBiology from "@/assets/pest-biology.jpg";

const pests = [
  {
    name: "Baratas",
    scientificName: "Blattodea",
    description: "Insetos noturnos que se reproduzem rapidamente e transmitem diversas doenças.",
    habitat: "Locais úmidos, quentes e escuros",
    risks: ["Salmonela", "E. coli", "Hepatite A", "Disenteraia"],
    prevention: ["Manter ambiente seco", "Vedar frestas", "Limpar restos de comida", "Usar desentupidores"],
    icon: Bug,
    color: "text-red-500"
  },
  {
    name: "Formigas",
    scientificName: "Formicidae", 
    description: "Insetos sociais organizados que formam trilhas e atacam em grupos.",
    habitat: "Jardins, frestas de paredes, sob pisos",
    risks: ["Contaminação de alimentos", "Mordidas dolorosas", "Danos estruturais"],
    prevention: ["Vedar entrada", "Limpar migalhas", "Remover umidade", "Podar plantas"],
    icon: Bug,
    color: "text-orange-500"
  },
  {
    name: "Cupins",
    scientificName: "Isoptera",
    description: "Insetos que se alimentam de celulose, causando danos estruturais graves.",
    habitat: "Madeira, papelão, livros, estruturas",
    risks: ["Danos estruturais", "Prejuízos financeiros", "Colapso de estruturas"],
    prevention: ["Controlar umidade", "Tratar madeiras", "Inspeções regulares", "Ventilação adequada"],
    icon: Home,
    color: "text-yellow-500"
  },
  {
    name: "Ratos",
    scientificName: "Rattus",
    description: "Roedores adaptáveis que se reproduzem rapidamente e transmitem doenças graves.",
    habitat: "Porões, sótãos, esgotos, depósitos",
    risks: ["Leptospirose", "Peste", "Hantavírus", "Salmonelose"],
    prevention: ["Vedar buracos", "Remover alimentos", "Controlar lixo", "Desentupir ralos"],
    icon: Zap,
    color: "text-gray-600"
  },
  {
    name: "Mosquitos",
    scientificName: "Culicidae",
    description: "Insetos voadores que se reproduzem em água parada e transmitem doenças.",
    habitat: "Água parada, vasos, caixas d'água",
    risks: ["Dengue", "Zika", "Chikungunya", "Febre Amarela"],
    prevention: ["Eliminar água parada", "Usar repelentes", "Telas nas janelas", "Manter quintal limpo"],
    icon: Eye,
    color: "text-blue-500"
  },
  {
    name: "Aranhas",
    scientificName: "Araneae",
    description: "Aracnídeos predadores, algumas espécies são venenosas e perigosas.",
    habitat: "Cantos escuros, atrás de móveis, jardins",
    risks: ["Picadas venenosas", "Reações alérgicas", "Necrose tissular"],
    prevention: ["Limpar teias", "Vedar frestas", "Reduzir esconderijos", "Manter organização"],
    icon: Shield,
    color: "text-purple-500"
  }
];

const BiologiaPragas = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pestBiology}
            alt="Biologia das Pragas"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}} />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-in hover-glow">Conhecimento Científico</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Biologia das 
              <span className="text-gradient"> Pragas Urbanas</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed animate-blur-in">
              Entenda o comportamento, ciclo de vida e riscos das principais pragas 
              urbanas. Conhecimento científico aplicado ao controle eficaz.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-fade-in-up">
              Por que <span className="text-gradient">conhecer</span> as pragas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-blur-in">
              O controle eficaz de pragas começa com o entendimento profundo de sua biologia, 
              comportamento e ciclo reprodutivo. Esse conhecimento permite desenvolver 
              estratégias direcionadas e sustentáveis.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
               <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.1s"}}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Identificação</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Reconhecer espécies e sinais de infestação
                  </p>
                </CardContent>
              </Card>

               <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.2s"}}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Prevenção</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Medidas preventivas baseadas no comportamento
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-strong hover-lift group animate-scale-bounce" style={{animationDelay: "0.3s"}}>
                <CardContent className="p-6 text-center">
                  <div className="gradient-animated p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Controle</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Tratamentos específicos e eficazes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pests Details */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-20 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <Badge variant="outline" className="mb-4 hover-glow">Principais Pragas</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Guia completo das <span className="text-gradient">pragas urbanas</span>
            </h2>
          </div>

          <div className="space-y-12">
            {pests.map((pest, index) => (
              <Card key={index} className="glass-strong overflow-hidden hover-lift group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Pest Info */}
                    <div className="lg:col-span-2 p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 rounded-full bg-muted ${pest.color}`}>
                          <pest.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{pest.name}</h3>
                          <p className="text-sm text-muted-foreground italic">{pest.scientificName}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {pest.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Home className="h-4 w-4 text-primary" />
                            Habitat Preferido
                          </h4>
                          <p className="text-sm text-muted-foreground">{pest.habitat}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            Riscos à Saúde
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {pest.risks.map((risk, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-destructive rounded-full" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Prevention Tips */}
                    <div className="bg-primary/5 p-8 border-l border-primary/20">
                      <h4 className="font-semibold mb-4 text-primary flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Dicas de Prevenção
                      </h4>
                      <ul className="space-y-3">
                        {pest.prevention.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 pt-4 border-t border-primary/20">
                        <p className="text-xs text-muted-foreground mb-3">
                          Infestação confirmada? Precisa de ajuda profissional?
                        </p>
                        <Link to="/contato">
                          <Button variant="hero" size="sm" className="w-full">
                            Solicitar Tratamento
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Pest Management */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Manejo Integrado</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Controle <span className="text-primary">integrado</span> de pragas
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nossa abordagem combina conhecimento científico, métodos sustentáveis 
              e tecnologia avançada para resultados duradouros.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Inspeção", desc: "Avaliação detalhada" },
                { title: "Identificação", desc: "Espécies e grau de infestação" },
                { title: "Tratamento", desc: "Métodos específicos" },
                { title: "Monitoramento", desc: "Acompanhamento contínuo" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="gradient-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Precisa de controle profissional de pragas?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para resolver seu problema 
            com eficiência e segurança.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato">
              <Button variant="secondary" size="lg" className="font-semibold">
                Solicitar Orçamento Gratuito
              </Button>
            </Link>
            <Link to="/area-atuacao">
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Ver Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BiologiaPragas;