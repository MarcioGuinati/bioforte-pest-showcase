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
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
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
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+5516974007842" className="font-medium hover:text-primary transition-colors">
                    (16) 97400-7842
                  </a>
                  <p className="text-sm text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">contato@bioforte.com.br</p>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">São Paulo - SP</p>
                  <p className="text-sm text-muted-foreground">Atendemos toda região metropolitana</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Emergência 24h</p>
                  <p className="text-sm text-muted-foreground">Para casos urgentes</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/contato">
                <Button variant="hero" className="w-full">
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
              CNPJ: 00.000.000/0001-00 | Licenças Sanitárias Atualizadas
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;