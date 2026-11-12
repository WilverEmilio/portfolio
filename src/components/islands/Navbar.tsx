import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  /** Idioma de la página actual ("en" | "es"). */
  locale: string;
  /** Ruta de inicio del idioma actual (destino de la marca). */
  homeHref: string;
  /** Ruta equivalente en el otro idioma ("/" ↔ "/es/"). */
  altHref: string;
  altLocale: string;
  labels: {
    about: string;
    tech: string;
    projects: string;
    contact: string;
    switchLanguage: string;
    menu: string;
    theme: string;
    primary: string;
  };
}

const SECTION_IDS = ["about", "technologies", "projects", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

/** Alterna .dark en <html> y guarda la preferencia (misma clave "theme" que lee el script del <head>). */
function toggleTheme() {
  const root = document.documentElement;
  // Evita transiciones a medias durante el cambio de tema.
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);
  const dark = root.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  window.getComputedStyle(document.body);
  setTimeout(() => style.remove(), 1);
}

/**
 * Sección visible → enlace activo (scrollspy). Se usa IntersectionObserver porque
 * scroll-target-group/:target-current solo existen en Chromium; el estado se expone con aria-current.
 */
function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        // La última sección del documento que cruza la franja central es la activa.
        const current = [...SECTION_IDS].reverse().find((id) => visible.has(id)) ?? null;
        setActive(current);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

function ThemeButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-9 text-muted-foreground hover:text-foreground")}
      aria-label={label}
    >
      {/* Iconos por CSS: el HTML del servidor y del cliente coinciden */}
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="dark:hidden" aria-hidden="true" />
    </button>
  );
}

function LangLink({ locale, altHref, altLocale, label }: { locale: string; altHref: string; altLocale: string; label: string }) {
  return (
    <a
      href={altHref}
      hrefLang={altLocale}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span aria-hidden="true">{locale.toUpperCase()}</span>
      <span className="sr-only" lang={altLocale}>
        {label}
      </span>
    </a>
  );
}

export default function Navbar({ locale, homeHref, altHref, altLocale, labels }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El popover nativo gestiona Esc y el cierre al pulsar fuera; aquí solo se refleja su estado.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const onToggle = (e: Event) => setMenuOpen((e as ToggleEvent).newState === "open");
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  const closeMenu = () => {
    try {
      menuRef.current?.hidePopover();
    } catch {}
  };

  const links: { id: SectionId; label: string }[] = [
    { id: "about", label: labels.about },
    { id: "technologies", label: labels.tech },
    { id: "projects", label: labels.projects },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        isScrolled || menuOpen ? "border-border bg-background" : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href={homeHref} className="inline-flex min-h-11 items-center whitespace-nowrap font-display text-[1.0625rem] font-semibold tracking-tight text-foreground">
          Wilver Xiá
        </a>

        <nav aria-label={labels.primary} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const current = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "relative py-2 text-sm transition-colors",
                      // Indicador que no depende solo del color: línea inferior
                      "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200",
                      current ? "text-foreground after:scale-x-100" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LangLink locale={locale} altHref={altHref} altLocale={altLocale} label={labels.switchLanguage} />
          <ThemeButton label={labels.theme} />
          <a
            href="#contact"
            aria-current={active === "contact" ? "true" : undefined}
            className={cn(buttonVariants({ size: "sm" }), "ml-2 hidden md:inline-flex")}
          >
            {labels.contact}
          </a>

          {/* Móvil: menú en popover nativo (Esc, clic fuera y capa superior sin JS propio) */}
          <button
            type="button"
            popoverTarget="mobile-menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-1 md:hidden")}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span>{labels.menu}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        popover="auto"
        className={cn(
          "fixed inset-x-4 top-[4.5rem] bottom-auto m-0 h-auto w-auto rounded-lg border border-border bg-card p-2 text-foreground md:hidden",
          "opacity-100 transition-[opacity,translate,display,overlay] duration-150 transition-discrete starting:-translate-y-1 starting:opacity-0",
          "backdrop:bg-foreground/15",
        )}
      >
        <nav aria-label={labels.primary}>
          <ul className="flex flex-col">
            {[...links, { id: "contact" as SectionId, label: labels.contact }].map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={active === link.id ? "true" : undefined}
                  className="flex min-h-12 items-center justify-between rounded-md px-3 text-base text-foreground hover:bg-muted aria-[current=true]:text-primary"
                >
                  {link.label}
                  {active === link.id && <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
