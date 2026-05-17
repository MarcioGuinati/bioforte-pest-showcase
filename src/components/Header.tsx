import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoBioforte from "@/assets/logo-bioforte.png";
import logoBioforteWhite from "@/assets/logo-bioforte-white.png";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyItems = [
    { name: "Quem Somos", path: "/quem-somos", desc: "Nossa história e valores" },
    { name: "Nosso Time", path: "/nosso-time", desc: "Especialistas qualificados" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco", desc: "Faça parte da Bioforte" },
  ];

  const solutionItems = [
    { name: "Área de Atuação", path: "/area-atuacao", desc: "Residencial, Comercial e Industrial" },
    { name: "Biologia das Pragas", path: "/biologia-pragas", desc: "Conheça o que combatemos" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        scrolled ? "glass-strong border-b border-border/50 py-1" : "bg-background border-b border-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar - Hidden on scroll to save space */}
        {!scrolled && (
          <div className="flex items-center justify-between py-2 text-xs text-muted-foreground border-b border-border/10 mb-2 animate-fade-in">
            <div className="flex items-center gap-6">
              <a href="mailto:comercial@bioforte.com.br" className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                comercial@bioforte.com.br
              </a>
              <a href="tel:+551637230808" className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Phone className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                (16) 3723-0808
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>CNPJ: 18.265.906/0001-01</span>
              <div className="h-4 w-px bg-border/50" />
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-2">
          {/* Logo with better spacing */}
          <Link
            to="/"
            className="flex items-center pr-8 hover:opacity-90 transition-opacity flex-shrink-0"
            aria-label="Bioforte - Home"
          >
            <img
              src={resolvedTheme === 'dark' ? logoBioforteWhite : logoBioforte}
              alt="Bioforte Controle de Pragas"
              width="176"
              height="44"
              className={cn(
                "h-auto transition-all duration-300",
                scrolled ? "w-32 lg:w-36" : "w-40 lg:w-44"
              )}
            />
          </Link>

          {/* Desktop Navigation Grouped */}
          <nav className="hidden lg:flex items-center" aria-label="Navegação principal">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                      location.pathname === "/" && "text-primary font-bold"
                    )}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                    (companyItems.some(i => i.path === location.pathname)) && "text-primary font-bold"
                  )}>
                    A Bioforte
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {companyItems.map((item) => (
                        <ListItem key={item.name} title={item.name} href={item.path}>
                          {item.desc}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                    (solutionItems.some(i => i.path === location.pathname)) && "text-primary font-bold"
                  )}>
                    Nossas Soluções
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {solutionItems.map((item) => (
                        <ListItem key={item.name} title={item.name} href={item.path}>
                          {item.desc}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                      location.pathname === "/blog" && "text-primary font-bold"
                    )}>
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/area-cliente">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                      location.pathname === "/area-cliente" && "text-primary font-bold"
                    )}>
                      Área do Cliente
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contato">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active]:bg-primary/10 data-[state=open]:bg-primary/10",
                      location.pathname === "/contato" && "text-primary font-bold"
                    )}>
                      Contato
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA & Theme Toggle (Small devices) */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer">
                <Button variant="hero" className="font-semibold px-6 hover-shine">
                  Orçamento Gratuito
                </Button>
              </a>
            </div>

            <div className="lg:hidden">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/10 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-1">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Início</MobileNavLink>

              <div className="py-2">
                <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Empresa</p>
                {companyItems.map(item => (
                  <MobileNavLink key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)}>{item.name}</MobileNavLink>
                ))}
              </div>

              <div className="py-2">
                <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Soluções</p>
                {solutionItems.map(item => (
                  <MobileNavLink key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)}>{item.name}</MobileNavLink>
                ))}
              </div>

              <MobileNavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
              <MobileNavLink to="/area-cliente" onClick={() => setIsMenuOpen(false)}>Área do Cliente</MobileNavLink>
              <MobileNavLink to="/contato" onClick={() => setIsMenuOpen(false)}>Contato</MobileNavLink>

              <div className="pt-4 px-4">
                <a href="https://wa.me/551637230808?text=Olá! Gostaria de solicitar um orçamento para controle de pragas." target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="hero" className="w-full">Solicitar Orçamento</Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-colors group-hover:text-foreground/80">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const MobileNavLink = ({ to, onClick, children }: any) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default Header;
