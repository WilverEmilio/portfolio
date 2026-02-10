"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";


export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      badge: "🔥 Proyecto Destacado",
      title: t("projects.project1.title"),
      organization: t("projects.project1.organization"),
      period: "Jul 2025 - Dic 2025",
      description: t("projects.project1.description"),
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
        "WebSockets"
      ],
      image: "/projects/inicio.png",
      githubUrl: "https://github.com/tnymv/SIG-backend",
      liveUrl: "https://palestinawater.lat/login"
    },
    {
      badge: "💼 Proyecto Full Stack",
      title: t("projects.project2.title"),
      organization: t("projects.project2.organization"),
      period: "Jul 2024 -Dic 2024",
      description: t("projects.project2.description"),
      skills: ["React", "Next.js", "TypeScript", "Strapi", "Stripe", "Tailwind CSS"],
      image: "/projects/inicio_h.png",
      
      // Múltiples repos
      githubUrls: [
        { label: "Frontend", url: "https://github.com/WilverEmilio/ecommercehealthy" },
        { label: "Backend", url: "https://github.com/WilverEmilio/ecommerce-healthy.git" }
      ],
      
      // Múltiples demos
      liveUrls: [
        { label: "Sitio Web", url: "https://healthy-ecommerce.netlify.app/" },
        { label: "Admin (Strapi)", url: "https://ecommercehealthy.up.railway.app/" }
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("projects.description")}
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  badge,
  title,
  organization,
  period,
  description,
  skills,
  image,
  githubUrl,
  githubUrls,
  liveUrl,
  liveUrls,
}: {
  badge?: string;
  title: string;
  organization?: string;
  period?: string;
  description: string;
  skills: string[];
  image: string;
  githubUrl?: string;
  githubUrls?: Array<{ label: string; url: string }>;
  liveUrl?: string;
  liveUrls?: Array<{ label: string; url: string }>;
}) {
  return (
    <div className="group relative rounded-2xl bg-card border-2 border-foreground/15 dark:border-border shadow-md dark:shadow-none hover:border-primary/50 hover:shadow-2xl hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transition-all duration-300 overflow-hidden hover:-translate-y-2">
      
      {/* Badge superior */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Imagen */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Preview of ${title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* Organización y período */}
        {(organization || period) && (
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
            {organization && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                {organization}
              </span>
            )}
            {organization && period && <span>•</span>}
            {period && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {period}
              </span>
            )}
          </div>
        )}

        {/* Descripción */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Botones - Soporta tanto single como múltiple */}
        <div className="space-y-3">
          
          {/* GitHub Links - Múltiples */}
          {githubUrls && githubUrls.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Código:</span>
              {githubUrls.map((repo, index) => (
                <Link
                  key={index}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-xs font-medium"
                >
                  <Github className="w-3.5 h-3.5" />
                  {repo.label}
                </Link>
              ))}
            </div>
          )}

          {/* GitHub Link - Single */}
          {!githubUrls && githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Código
            </Link>
          )}

          {/* Live Links - Múltiples */}
          {liveUrls && liveUrls.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Demo:</span>
              {liveUrls.map((demo, index) => (
                <Link
                  key={index}
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {demo.label}
                </Link>
              ))}
            </div>
          )}

          {/* Live Link - Single */}
          {!liveUrls && liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}