import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import logoBioforte from "@/assets/logo-bioforte.png";
import logoBioforteWhite from "@/assets/logo-bioforte-white.png";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();

  const companyLinks = [
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Nosso Time", path: "/nosso-time" },
    { name: "Área de Atuação", path: "/area-atuacao" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco" },
  ];

  const supportLinks = [
    { name: "Área do Cliente", path: "/area-cliente" },
    { name: "Blog & Notícias", path: "/blog" },
    { name: "Contato", path: "/contato" },
    { name: "Biologia das Pragas", path: "/biologia-pragas" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/BioforteDedetizadora?locale=pt_BR", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: Instagram, href: "https://www.instagram.com/biofortededetizadora/", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]" },
    { icon: Youtube, href: "https://www.youtube.com/@biofortesaneamentoambienta3867", label: "YouTube", color: "hover:bg-[#FF0000]" }
  ];

  return (
    <footer className="relative bg-card border-t border-border/50 pt-16 pb-8 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <img
                src={resolvedTheme === 'dark' ? logoBioforteWhite : logoBioforte}
                alt="Bioforte Controle de Pragas"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Saneamento ambiental com excelência e compromisso. Protegendo seu patrimônio e a saúde da sua família há mais de 30 anos.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:shadow-lg",
                    social.color
                  )}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            {/* Certifications badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-2 rounded-full border border-border/50">
                <ShieldCheck className="h-4 w-4 text-primary" />
                ANVISA Certificada
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-2 rounded-full border border-border/50">
                <Award className="h-4 w-4 text-primary" />
                30+ Anos
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-8 text-foreground uppercase tracking-widest text-sm">Empresa</h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary flex items-center group transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links - 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-8 text-foreground uppercase tracking-widest text-sm">Suporte</h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary flex items-center group transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="font-bold text-lg mb-8 text-foreground uppercase tracking-widest text-sm">Fale Conosco</h4>
            <div className="grid gap-6">
              <a href="tel:+551637230808" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">(16) 3723-0808</p>
                  <p className="text-sm text-muted-foreground">Segunda a Sexta, 08h às 18h</p>
                </div>
              </a>

              <a href="mailto:comercial@bioforte.com.br" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">comercial@bioforte.com.br</p>
                  <p className="text-sm text-muted-foreground">Resposta rápida e eficiente</p>
                </div>
              </a>

              <div className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Sede em Franca - SP</p>
                  <p className="text-sm text-muted-foreground">Atendimento em toda a região</p>
                </div>
              </div>
            </div>

            <Link to="/contato" className="block pt-4">
              <Button variant="hero" className="w-full h-14 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover-shine">
                Orçamento Imediato
              </Button>
            </Link>
          </div>
        </div>

        <Separator className="bg-border/30 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="text-center md:text-left space-y-1">
            <p>© {currentYear} Bioforte Controle de Pragas. Todos os direitos reservados.</p>
            <p className="text-xs opacity-70 tracking-wide">CNPJ: 18.265.906/0001-01 | Responsável Técnico CRBio: 130.421/01-D</p>
          </div>
          <div className="flex gap-8">
            <Link to="/politica-privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
            <Link to="/termos-uso" className="hover:text-primary transition-colors">Termos</Link>
            <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;