import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Shield, HeadphonesIcon, FileCheck, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/area-cliente-hero.png";

const AreaCliente = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[480px] lg:min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Central Bioforte — Área do Cliente"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Layered dark gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          {/* Extra dark overlay on the left in dark mode to ensure white text is visible over any image content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent dark:from-black/75 dark:via-black/40 dark:to-transparent" />
        </div>

        {/* Tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ac-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22c55e" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ac-grid)" />
          </svg>
          <div className="absolute top-16 right-1/3 w-56 h-56 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-12 right-12 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}} />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary bg-primary/10 hover-glow animate-fade-in">
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              Central Bioforte
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in-up leading-tight text-white">
              Área do <span className="text-gradient">Cliente</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed animate-blur-in max-w-2xl">
              Todos os seus atendimentos, certificados e relatórios em um só lugar.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-in" style={{animationDelay: "0.4s"}}>
              {[
                { icon: CheckCircle2, label: "Acesso Seguro" },
                { icon: FileCheck, label: "Certificados Digitais" },
                { icon: HeadphonesIcon, label: "Suporte Premium" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-white/70">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="gradient-primary p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-2">Acesso Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Sistema protegido com criptografia de dados
                </p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="gradient-primary p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-2">Relatórios</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse todos os relatórios de serviços
                </p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="gradient-primary p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-2">Suporte</h3>
                <p className="text-sm text-muted-foreground">
                  Atendimento exclusivo para clientes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Login iframe */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="glass overflow-hidden">
            <CardContent className="p-0">
              <iframe 
                src="https://www.benuerp.com.br/new/loginCliente.benu?empresa=bioforte" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Sistema de Login do Cliente Bioforte"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AreaCliente;
