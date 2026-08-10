import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoBioforte from "@/assets/logo-bioforte.webp";
import logoBioforteWhite from "@/assets/logo-bioforte-white.webp";
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

  const companyItems = [
    { name: "Quem Somos", path: "/quem-somos", desc: "Nossa história e valores" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco", desc: "Faça parte da Bioforte" },
  ];

  const solutionItems = [
    { name: "Área de Atuação", path: "/area-atuacao", desc: "Residencial, Comercial e Industrial" },
    { name: "Biologia das Pragas", path: "/biologia-pragas", desc: "Conheça o que combatemos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* ── Top bar ── */}
      <div className="hidden lg:block bg-[hsl(var(--primary))] text-primary-foreground">
        <div className="container mx-auto px-4 flex items-center justify-end gap-6 py-1.5 text-xs">
          <span className="opacity-80">CEVS: 35430218-812-000018-1-3</span>
          <span className="opacity-40">|</span>
          <span className="opacity-80">CEVS: 352620004-812-000015-1-1</span>
          <span className="opacity-40">|</span>
          <a
            href="mailto:contato@biofortepragas.com.br"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Mail className="h-3.5 w-3.5" />
            contato@biofortepragas.com.br
          </a>
          <span className="opacity-40">|</span>
          <a
            href="tel:+551637230808"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity font-semibold"
          >
            <Phone className="h-3.5 w-3.5" />
            (16) 3723-0808
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Bottom / Main nav bar ── */}
      <div className="bg-background border-b border-border/50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
            aria-label="Bioforte - Home"
          >
            <img
              src={resolvedTheme === "dark" ? logoBioforteWhite : logoBioforte}
              alt="Bioforte Controle de Pragas"
              width={176}
              height={44}
              className="h-auto w-36 lg:w-44"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" aria-label="Navegação principal">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                        location.pathname === "/" && "text-primary font-bold border-b-2 border-primary rounded-none"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                      companyItems.some(i => i.path === location.pathname) && "text-primary font-bold"
                    )}
                  >
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
                  <NavigationMenuTrigger
                    className={cn(
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                      solutionItems.some(i => i.path === location.pathname) && "text-primary font-bold"
                    )}
                  >
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
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                        location.pathname === "/blog" && "text-primary font-bold border-b-2 border-primary rounded-none"
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/area-cliente">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                        location.pathname === "/area-cliente" && "text-primary font-bold border-b-2 border-primary rounded-none"
                      )}
                    >
                      Área do Cliente
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contato">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                        location.pathname === "/contato" && "text-primary font-bold border-b-2 border-primary rounded-none"
                      )}
                    >
                      Contato
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
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
            <nav className="flex flex-col space-y-1 container mx-auto px-4">
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

              <div className="pt-4">
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

const ListItem = ({ className, title, children, href, ...props }: any) => (
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
        <div className="text-sm font-bold leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-foreground/80">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
);

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
