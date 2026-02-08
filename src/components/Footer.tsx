import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import logoBioforte from "@/assets/logo-bioforte.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Nossos Serviços", path: "/area-atuacao" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco" },
  ];

  const services = [
    "Dedetização Residencial",
    "Controle Comercial", 
    "Desratização",
    "Controle Ecológico"
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/BioforteDedetizadora?locale=pt_BR", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/biofortededetizadora/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@biofortesaneamentoambienta3867", label: "YouTube" }
  ];

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent rounded-full blur-3xl" />
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <img 
                src={logoBioforte} 
                alt="Bioforte Controle de Pragas" 
                className="h-14 w-auto max-w-[180px] object-contain"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Especialistas em controle integrado de pragas urbanas, 
              oferecendo soluções seguras e eficazes há mais de 15 anos.
            </p>
            <nav aria-label="Redes sociais" className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${social.label} da Bioforte (abre em nova aba)`}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-label="Links rápidos">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Links Rápidos</h4>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-muted-foreground flex items-center group hover:text-foreground transition-colors">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-150 transition-transform" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Contato</h4>
            <div className="space-y-4">
              <a href="tel:+5516974007842" className="flex items-start space-x-3 group hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">(16) 97400-7842</p>
                  <p className="text-sm text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                </div>
              </a>
              
              <a href="mailto:contato@bioforte.com.br" className="flex items-start space-x-3 group hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">contato@bioforte.com.br</p>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                </div>
              </a>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Nossas Unidades</p>
                  <p className="text-sm text-muted-foreground">Ribeirão Preto, Franca, Uberaba, Araraquara e Guarapuava</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Emergência 24h</p>
                  <p className="text-sm text-muted-foreground">Para casos urgentes</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/contato">
                <Button variant="hero" className="w-full hover-shine pulse-ring">
                  Solicitar Orçamento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bioforte Controle de Pragas. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CNPJ: 18.265.906/0001-01 | Licenças Sanitárias Atualizadas
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm" aria-label="Links legais">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1 py-0.5"
            >
              Política de Privacidade
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1 py-0.5"
            >
              Termos de Uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;