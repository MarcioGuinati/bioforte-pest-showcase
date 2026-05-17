import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Shield, HeadphonesIcon } from "lucide-react";
import heroImage from "@/assets/company-building.jpg";

const AreaCliente = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Área do Cliente"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6">
              Acesso Exclusivo
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
              Área do <span className="text-primary">Cliente</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Acesse seu painel exclusivo para acompanhar serviços, relatórios e documentos.
            </p>
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
