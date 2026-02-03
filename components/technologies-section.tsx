"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  Container,
  Database,
  GitBranch,
  Monitor,
  Server,
  Settings,
  Terminal,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const technologies = [
  { icon: Cloud, name: "AWS", category: "Cloud" },
  { icon: Cloud, name: "Azure", category: "Cloud" },
  { icon: Cloud, name: "Google Cloud", category: "Cloud" },
  { icon: Container, name: "Docker", category: "Containers" },
  { icon: Container, name: "Kubernetes", category: "Orchestration" },
  { icon: Settings, name: "Terraform", category: "IaC" },
  { icon: Settings, name: "Ansible", category: "Automation" },
  { icon: GitBranch, name: "GitHub Actions", category: "CI/CD" },
  { icon: GitBranch, name: "Jenkins", category: "CI/CD" },
  { icon: Monitor, name: "Prometheus", category: "Monitoring" },
  { icon: Monitor, name: "Grafana", category: "Observability" },
  { icon: Database, name: "PostgreSQL", category: "Database" },
  { icon: Database, name: "Redis", category: "Cache" },
  { icon: Server, name: "Nginx", category: "Web Server" },
  { icon: Terminal, name: "Python", category: "Scripting" },
  { icon: Terminal, name: "Bash", category: "Shell" },
  { icon: Terminal, name: "Go", category: "Programming" },
  { icon: Server, name: "Linux", category: "OS" },
];

export function TechnologiesSection() {
  const { t } = useLanguage();

  return (
    <section id="technologies" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            {t("tech.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("tech.description")}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="group border-border/50 hover:border-primary/40 bg-card/30 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <tech.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm">
                  {tech.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tech.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
