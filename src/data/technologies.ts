import type { ComponentType } from "react";
import {
  SiAstro,
  SiCss3,
  SiFastapi,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlalchemy,
  SiStrapi,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Database, Layers } from "lucide-react";
import type { TranslationKey } from "@/i18n";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;

export interface TechGroup {
  categoryKey: TranslationKey;
  items: { name: string; icon: Icon }[];
}

/**
 * Tecnologías agrupadas por categoría. Las 16 originales del portafolio más Python, SQLAlchemy y
 * PostGIS, que ya figuraban en el stack de los proyectos. Cada tecnología aparece una sola vez.
 * PostGIS y SQL Server no tienen logotipo en Simple Icons: se usa un icono genérico, no uno inventado.
 */
export const techGroups: TechGroup[] = [
  {
    categoryKey: "tech.cat.frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Astro", icon: SiAstro },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
    ],
  },
  {
    categoryKey: "tech.cat.languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    categoryKey: "tech.cat.backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "FastAPI", icon: SiFastapi },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
    ],
  },
  {
    categoryKey: "tech.cat.databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "PostGIS", icon: Layers },
      { name: "MySQL", icon: SiMysql },
      { name: "SQL Server", icon: Database },
    ],
  },
  {
    categoryKey: "tech.cat.mobile",
    items: [{ name: "React Native", icon: SiReact }],
  },
  {
    categoryKey: "tech.cat.cms",
    items: [
      { name: "Strapi", icon: SiStrapi },
      { name: "Stripe", icon: SiStripe },
    ],
  },
  {
    categoryKey: "tech.cat.tools",
    items: [{ name: "Git / GitHub", icon: SiGithub }],
  },
];
