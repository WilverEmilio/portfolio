import { useEffect, useState } from "react";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  /** Idioma de la página actual ("en" | "es"). */
  locale: string;
  /** Ruta de inicio del idioma actual (destino del logo). */
  homeHref: string;
  /** Ruta equivalente en el otro idioma ("/" ↔ "/es/"). */
  altHref: string;
  altLocale: string;
  labels: {
    about: string;
    tech: string;
    projects: string;
    contact: string;
    hireMe: string;
    switchLanguage: string;
  };
}

/** Alterna la clase .dark en <html> y guarda la preferencia (mismo key "theme" que usaba next-themes). */
function toggleTheme() {
  const root = document.documentElement;
  // Igual que disableTransitionOnChange de next-themes: evita transiciones a medias al cambiar de tema.
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);

  const dark = root.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}

  window.getComputedStyle(document.body); // fuerza el reflow antes de retirar el estilo
  setTimeout(() => style.remove(), 1);
}

/** Iconos controlados por CSS: el HTML del servidor y el del cliente son idénticos. */
function ThemeIcon() {
  return (
    <>
      <Sun className="h-4 w-4 hidden dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </>
  );
}

export default function Navbar({ locale, homeHref, altHref, altLocale, labels }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: labels.about },
    { href: "#technologies", label: labels.tech },
    { href: "#projects", label: labels.projects },
    { href: "#contact", label: labels.contact },
  ];

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className={buttonVariants({ variant: "outline", size: "icon" })}
      aria-label="Toggle theme"
    >
      <ThemeIcon />
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href={homeHref} className="text-lg font-bold text-foreground hover:text-primary transition-colors">
          WXI<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          {/* Cambio de idioma: enlace a la página equivalente */}
          <a
            href={altHref}
            hrefLang={altLocale}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5 min-w-[70px] bg-transparent")}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium">{locale.toUpperCase()}</span>
            <span className="sr-only" lang={altLocale}>{labels.switchLanguage}</span>
          </a>

          {themeButton}

          <a href="#contact" className={buttonVariants({ size: "sm" })}>
            {labels.hireMe}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={altHref}
            hrefLang={altLocale}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <span className="text-xs font-medium">{locale.toUpperCase()}</span>
            <span className="sr-only" lang={altLocale}>{labels.switchLanguage}</span>
          </a>

          {themeButton}

          <button
            type="button"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className={cn(buttonVariants(), "w-full")} onClick={() => setIsMobileMenuOpen(false)}>
                {labels.hireMe}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
