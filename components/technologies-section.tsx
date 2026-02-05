"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  SiReact, 
  SiAstro,
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiFastapi, 
  SiMysql, 
  SiGithub, 
  SiStrapi, 
  SiStripe,
  SiPostgresql,
  SiTailwindcss,

} from "react-icons/si";
import { Database } from "lucide-react"; // Para SQL Server
import { useLanguage } from "@/components/language-provider";

const technologies = [
  { icon: SiReact, name: "ReactJS", category: "Frontend" },
  { icon: SiReact, name: "React Native", category: "Mobile" },
  { icon: SiAstro, name: "Astro", category: "Frontend" },
  { icon: SiHtml5, name: "HTML", category: "Markup" },
  { icon: SiCss3, name: "CSS", category: "Styling" },
  { icon: SiTailwindcss, name: "Tailwind CSS", category: "Styling" },
  { icon: SiJavascript, name: "JavaScript", category: "Programming" },
  { icon: SiTypescript, name: "TypeScript", category: "Programming" },
  { icon: SiNodedotjs, name: "NodeJS", category: "Backend" },
  { icon: SiFastapi, name: "FastAPI", category: "Backend" },
  { icon: SiMysql, name: "MySQL", category: "Database" },
  { icon: SiPostgresql, name: "PostgreSQL", category: "Database" },
  { icon: Database, name: "SQL Server", category: "Database" }, 
  { icon: SiGithub, name: "Git/GitHub", category: "Version Control" },
  { icon: SiStrapi, name: "Strapi", category: "CMS" },
  { icon: SiStripe, name: "Stripe", category: "Payments" },
];

export function TechnologiesSection() {
  const { t } = useLanguage();

  return (
    <section id="technologies" className="py-24 px-6 bg-background">
      {/* Para el titulo y la descripción */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">
            {t("tech.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("tech.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="group bg-card border-2 border-border rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transition-all duration-300"
            >
              <CardContent className="p-4 flex flex-col items-start justify-center gap-3">
                {/* Cuadro del ícono con gradiente */}
                <div className="w-full h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <tech.icon className="w-16 h-16 text-primary-foreground" />
                </div>
                <p className="font-extrabold text-foreground">{tech.name}</p>
                <p className="text-sm text-muted-foreground">{tech.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
