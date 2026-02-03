"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      skills: ["Terraform", "Python", "AWS", "Docker"],
      image: "/projects/infra-platform.jpg",
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      skills: ["Kubernetes", "Prometheus", "Grafana", "Go"],
      image: "/projects/k8s-monitoring.jpg",
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      skills: ["TypeScript", "GitHub Actions", "GitLab CI", "Node.js"],
      image: "/projects/cicd-generator.jpg",
      githubUrl: "#",
    },
    {
      title: t("projects.project4.title"),
      description: t("projects.project4.description"),
      skills: ["Elasticsearch", "Logstash", "Kibana", "Redis"],
      image: "/projects/log-service.jpg",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12 text-center">
          {t("projects.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  skills,
  image,
  githubUrl,
  liveUrl,
}: {
  title: string;
  description: string;
  skills: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}) {
  return (
    <div className="group rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Preview of ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary transition-colors"
                aria-label={`View ${title} on GitHub`}
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary transition-colors"
                aria-label={`View ${title} live`}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
