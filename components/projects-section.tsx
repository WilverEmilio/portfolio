"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      badge: "🎓 Proyecto Universitario",
      title: "Sistema de Gestión Municipal",
      description: "Backend de sistema municipal con APIs REST, gestión de bases de datos relacionales y procesamiento de datos geoespaciales para la Municipalidad de Palestina De Los Altos.",
      skills: ["Node.js", "FastAPI", "PostgreSQL", "MySQL", "APIs REST", "Datos Geoespaciales"],
      image: "/projects/municipalidad.jpg",
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      badge: "💼 Proyecto Full Stack",
      title: "Sistema de Comercio Electrónico",
      description: "Aplicación completa de e-commerce con frontend moderno en React/Next.js, integración de Strapi como CMS y procesamiento de pagos con Stripe.",
      skills: ["React", "Next.js", "TypeScript", "Strapi", "Stripe", "APIs REST"],
      image: "/projects/ecommerce.jpg",
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      badge: "💡 Proyecto Personal",
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      skills: ["TypeScript", "GitHub Actions", "GitLab CI", "Node.js"],
      image: "/projects/cicd-generator.jpg",
      githubUrl: "#",
    },
    {
      badge: "💡 Proyecto Personal",
      title: t("projects.project4.title"),
      description: t("projects.project4.description"),
      skills: ["Elasticsearch", "Logstash", "Kibana", "Redis"],
      image: "/projects/log-service.jpg",
      githubUrl: "#",
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
            Proyectos destacados que demuestran mis habilidades en desarrollo full stack
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
  description,
  skills,
  image,
  githubUrl,
  liveUrl,
}: {
  badge?: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
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
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>

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

        {/* Botones */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Código
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium"
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