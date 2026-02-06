import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoBioforte from "@/assets/logo-bioforte.png";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Biologia das Pragas", path: "/biologia-pragas" },
    { name: "Área de Atuação", path: "/area-atuacao" },
    { name: "Nosso Time", path: "/nosso-time" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco" },
    { name: "Área do Cliente", path: "/area-cliente" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border/30">
          <div className="flex items-center gap-4">
            <a
              href="mailto:contato@bioforte.com.br"
              className="flex items-center gap-1 hover:text-primary transition-colors min-h-[24px]"
              aria-label="Enviar e-mail para contato@bioforte.com.br"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              contato@bioforte.com.br
            </a>
            <a
              href="tel:+5516974007842"
              className="flex items-center gap-1 hover:text-primary transition-colors min-h-[24px]"
              aria-label="Ligar para (16) 97400-7842"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              (16) 97400-7842
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span>CNPJ: 18.265.906/0001-01</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Bioforte Controle de Pragas - Ir para página inicial"
          >
            <img
              src={logoBioforte}
              alt="Bioforte Controle de Pragas"
              className="h-14 w-auto max-w-[180px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  className="font-medium hover:bg-primary/20 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Link to="/contato">
              <Button variant="hero" size="lg" className="font-semibold">
                Solicitar Orçamento
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="lg:hidden py-4 border-t border-border/30 animate-fade-in"
            role="dialog"
            aria-label="Menu de navegação móvel"
          >
            <nav className="flex flex-col space-y-2" aria-label="Navegação principal">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-medium hover:bg-primary/20 hover:text-primary min-h-[48px]"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full mt-4 min-h-[48px]">
                  Solicitar Orçamento
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
