import type { ImageMetadata } from "astro";
import type { Locale, TranslationKey } from "@/i18n";
import inicio from "@/assets/projects/inicio.png";
import inicioH from "@/assets/projects/inicio_h.png";

export interface ProjectLink {
  /** Texto fijo (p. ej. "Frontend") o clave de traducción. */
  label: string | { key: TranslationKey };
  url: string;
}

export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  /** Peso visual: el destacado ocupa el bloque grande. */
  featured?: boolean;
  status: ProjectStatus;
  badgeKey?: TranslationKey;
  titleKey: TranslationKey;
  organizationKey?: TranslationKey;
  period?: Record<Locale, string>;
  descriptionKey: TranslationKey;
  skills: string[];
  /** Captura real. Sin captura (proyecto en desarrollo) se muestra una ficha tipográfica, no una imagen simulada. */
  image?: ImageMetadata;
  code?: ProjectLink[];
  demo?: ProjectLink[];
}

export const projects: Project[] = [
  {
    featured: true,
    status: "completed",
    badgeKey: "projects.badge.featured",
    titleKey: "projects.project1.title",
    organizationKey: "projects.project1.organization",
    period: { en: "Jul 2025 – Dec 2025", es: "Jul 2025 – Dic 2025" },
    descriptionKey: "projects.project1.description",
    skills: ["FastAPI", "Python 3.11", "PostgreSQL", "PostGIS", "SQLAlchemy", "Alembic", "REST APIs", "Pydantic", "Uvicorn", "WebSockets"],
    image: inicio,
    code: [{ label: { key: "projects.code" }, url: "https://github.com/tnymv/SIG-backend" }],
    demo: [{ label: { key: "projects.demo" }, url: "https://palestinawater.lat/login" }],
  },
  {
    status: "completed",
    badgeKey: "projects.badge.fullstack",
    titleKey: "projects.project2.title",
    organizationKey: "projects.project2.organization",
    period: { en: "Jul 2024 – Dec 2024", es: "Jul 2024 – Dic 2024" },
    descriptionKey: "projects.project2.description",
    skills: ["React", "Next.js", "TypeScript", "Strapi", "Stripe", "Tailwind CSS"],
    image: inicioH,
    code: [
      { label: "Frontend", url: "https://github.com/WilverEmilio/ecommercehealthy" },
      { label: "Backend", url: "https://github.com/WilverEmilio/ecommerce-healthy.git" },
    ],
    demo: [
      { label: { key: "projects.link.website" }, url: "https://healthy-ecommerce.netlify.app/" },
      { label: "Admin (Strapi)", url: "https://ecommercehealthy.up.railway.app/" },
    ],
  },
  /*
   * Proyecto en desarrollo: pendiente de datos reales (nombre, propósito, stack, enlaces).
   * Al añadirlo, crear sus claves en src/i18n/en.ts y es.ts y descomentar:
   * {
   *   status: "in-progress",
   *   titleKey: "projects.project3.title",
   *   descriptionKey: "projects.project3.description",
   *   skills: ["..."],
   *   // image, code y demo solo si existen de verdad
   * },
   */
];
