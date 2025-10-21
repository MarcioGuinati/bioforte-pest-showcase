import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Biologia das Pragas", path: "/biologia-pragas" },
    { name: "Área de Atuação", path: "/area-atuacao" },
    { name: "Nosso Time", path: "/nosso-time" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco" },
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
              href="tel:+5511999999999" 
              className="flex items-center gap-1 hover:text-primary transition-colors min-h-[24px]"
              aria-label="Ligar para (11) 99999-9999"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              (11) 99999-9999
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>CNPJ: 00.000.000/0001-00</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2" aria-label="Bioforte Controle de Pragas - Ir para página inicial">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center" aria-hidden="true">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <div>
              <span className="font-bold text-xl text-foreground">Bioforte</span>
              <p className="text-xs text-primary">Controle de Pragas</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button variant="ghost" className="font-medium hover:bg-primary/10">
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
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start font-medium">
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full mt-4">
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