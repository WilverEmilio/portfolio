import type { ImageMetadata } from "astro";
import type { TranslationKey } from "@/i18n";
import inicio from "@/assets/projects/inicio.png";
import inicioH from "@/assets/projects/inicio_h.png";

export interface LabeledUrl {
  label: string;
  url: string;
}

export interface Project {
  badge?: string;
  titleKey: TranslationKey;
  organizationKey?: TranslationKey;
  period?: string;
  descriptionKey: TranslationKey;
  skills: string[];
  image: ImageMetadata;
  githubUrl?: string;
  githubUrls?: LabeledUrl[];
  liveUrl?: string;
  liveUrls?: LabeledUrl[];
}

// Datos movidos tal cual desde components/projects-section.tsx.
// Badges y etiquetas de enlaces estaban escritos en español fijo en el original; se conservan igual.
export const projects: Project[] = [
  {
    badge: "🔥 Proyecto Destacado",
    titleKey: "projects.project1.title",
    organizationKey: "projects.project1.organization",
    period: "Jul 2025 - Dic 2025",
    descriptionKey: "projects.project1.description",
    skills: [
      "FastAPI",
      "Python 3.11",
      "PostgreSQL",
      "PostGIS",
      "SQLAlchemy",
      "Alembic",
      "REST APIs",
      "Pydantic",
      "Uvicorn",
      "WebSockets",
    ],
    image: inicio,
    githubUrl: "https://github.com/tnymv/SIG-backend",
    liveUrl: "https://palestinawater.lat/login",
  },
  {
    badge: "💼 Proyecto Full Stack",
    titleKey: "projects.project2.title",
    organizationKey: "projects.project2.organization",
    period: "Jul 2024 -Dic 2024",
    descriptionKey: "projects.project2.description",
    skills: ["React", "Next.js", "TypeScript", "Strapi", "Stripe", "Tailwind CSS"],
    image: inicioH,
    githubUrls: [
      { label: "Frontend", url: "https://github.com/WilverEmilio/ecommercehealthy" },
      { label: "Backend", url: "https://github.com/WilverEmilio/ecommerce-healthy.git" },
    ],
    liveUrls: [
      { label: "Sitio Web", url: "https://healthy-ecommerce.netlify.app/" },
      { label: "Admin (Strapi)", url: "https://ecommercehealthy.up.railway.app/" },
    ],
  },
];
