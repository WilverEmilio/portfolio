"use client";

import React from "react"

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.tech": "Tech",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.hireMe": "Hire Me",
    
    // Hero
    "hero.available": "Available for work",
    "hero.title": "Systems Engineer",
    "hero.location": "Your City, Country",
    "hero.description": "I design, build, and maintain robust infrastructure systems that power modern applications. Specializing in cloud architecture, automation, and DevOps practices.",
    "hero.contact": "Contact Me",
    "hero.downloadCV": "Download CV",
    
    // About
    "about.title": "About Me",
    "about.p1": "I'm a Systems Engineer passionate about building reliable, scalable infrastructure. My work focuses on creating systems that are not only performant but also maintainable and secure.",
    "about.p2.1": "Currently, I specialize in",
    "about.p2.cloud": "cloud infrastructure",
    "about.p2.container": "container orchestration",
    "about.p2.and": "and",
    "about.p2.cicd": "CI/CD pipeline development",
    "about.p2.2": "I've had the opportunity to work across various environments—from",
    "about.p2.startups": "startups",
    "about.p2.to": "to",
    "about.p2.enterprise": "enterprise organizations",
    "about.p3": "When I'm not optimizing systems, I enjoy contributing to open-source projects, learning new technologies, and sharing knowledge with the community.",
    
    // Technologies
    "tech.title": "Technologies",
    "tech.description": "The tools and technologies I use to build and maintain scalable, reliable infrastructure systems.",
    
    // Experience
    "exp.title": "Experience",
    "exp.viewResume": "View Full Resume",
    "exp.job1.title": "Senior Systems Engineer",
    "exp.job1.company": "Tech Company",
    "exp.job1.description": "Lead infrastructure design and implementation for cloud-native applications. Architect and maintain Kubernetes clusters, implement GitOps workflows, and develop automation tools that reduced deployment time by 60%.",
    "exp.job2.title": "Systems Engineer",
    "exp.job2.company": "Software Solutions Inc.",
    "exp.job2.description": "Designed and maintained CI/CD pipelines using Jenkins and GitHub Actions. Implemented infrastructure as code practices and managed hybrid cloud environments across AWS and on-premises data centers.",
    "exp.job3.title": "Junior Systems Administrator",
    "exp.job3.company": "StartupXYZ",
    "exp.job3.description": "Managed Linux servers and networking infrastructure. Automated routine tasks using Bash and Python scripts. Supported development teams with environment setup and troubleshooting.",
    
    // Projects
    "projects.title": "Featured Projects",
    "projects.project1.title": "Infrastructure Automation Platform",
    "projects.project1.description": "A comprehensive platform for automating infrastructure provisioning and management. Built with Terraform modules and custom Python tooling to streamline cloud deployments.",
    "projects.project2.title": "Kubernetes Monitoring Stack",
    "projects.project2.description": "Complete observability solution for Kubernetes clusters using Prometheus, Grafana, and custom exporters. Includes alerting rules and dashboards for comprehensive cluster visibility.",
    "projects.project3.title": "CI/CD Pipeline Generator",
    "projects.project3.description": "CLI tool that generates optimized CI/CD pipelines based on project structure. Supports GitHub Actions, GitLab CI, and Jenkins with best practices baked in.",
    "projects.project4.title": "Log Aggregation Service",
    "projects.project4.description": "Distributed log collection and analysis system built for high-throughput environments. Features real-time search and configurable retention policies.",
    
    // Contact
    "contact.title": "Contact",
    "contact.heading": "Let's Work Together",
    "contact.description": "I'm currently open to new opportunities. Whether you have a question, want to discuss a project, or just want to say hi, feel free to reach out.",
    "contact.button": "Say Hello",
    "contact.footer": "Designed & Built with Next.js and Tailwind CSS",
  },
  es: {
    // Navbar
    "nav.about": "Sobre Mi",
    "nav.tech": "Tech",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.hireMe": "Contratame",
    
    // Hero
    "hero.available": "Disponible para trabajar",
    "hero.title": "Ingeniero de Sistemas",
    "hero.location": "Tu Ciudad, Pais",
    "hero.description": "Diseno, construyo y mantengo sistemas de infraestructura robustos que impulsan aplicaciones modernas. Especializado en arquitectura cloud, automatizacion y practicas DevOps.",
    "hero.contact": "Contactame",
    "hero.downloadCV": "Descargar CV",
    
    // About
    "about.title": "Sobre Mi",
    "about.p1": "Soy un Ingeniero de Sistemas apasionado por construir infraestructura confiable y escalable. Mi trabajo se enfoca en crear sistemas que no solo sean eficientes sino tambien mantenibles y seguros.",
    "about.p2.1": "Actualmente, me especializo en",
    "about.p2.cloud": "infraestructura cloud",
    "about.p2.container": "orquestacion de contenedores",
    "about.p2.and": "y",
    "about.p2.cicd": "desarrollo de pipelines CI/CD",
    "about.p2.2": "He tenido la oportunidad de trabajar en diversos entornos—desde",
    "about.p2.startups": "startups",
    "about.p2.to": "hasta",
    "about.p2.enterprise": "organizaciones empresariales",
    "about.p3": "Cuando no estoy optimizando sistemas, disfruto contribuyendo a proyectos open-source, aprendiendo nuevas tecnologias y compartiendo conocimiento con la comunidad.",
    
    // Technologies
    "tech.title": "Tecnologias",
    "tech.description": "Las herramientas y tecnologias que uso para construir y mantener sistemas de infraestructura escalables y confiables.",
    
    // Experience
    "exp.title": "Experiencia",
    "exp.viewResume": "Ver CV Completo",
    "exp.job1.title": "Ingeniero de Sistemas Senior",
    "exp.job1.company": "Tech Company",
    "exp.job1.description": "Lidero el diseno e implementacion de infraestructura para aplicaciones cloud-native. Arquitecto y mantengo clusters de Kubernetes, implemento flujos GitOps y desarrollo herramientas de automatizacion que redujeron el tiempo de despliegue en un 60%.",
    "exp.job2.title": "Ingeniero de Sistemas",
    "exp.job2.company": "Software Solutions Inc.",
    "exp.job2.description": "Disene y mantuve pipelines CI/CD usando Jenkins y GitHub Actions. Implemente practicas de infraestructura como codigo y gestioné entornos de nube hibrida entre AWS y centros de datos locales.",
    "exp.job3.title": "Administrador de Sistemas Junior",
    "exp.job3.company": "StartupXYZ",
    "exp.job3.description": "Gestioné servidores Linux e infraestructura de red. Automaticé tareas rutinarias usando scripts de Bash y Python. Apoye a los equipos de desarrollo con la configuracion del entorno y resolucion de problemas.",
    
    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.project1.title": "Plataforma de Automatizacion de Infraestructura",
    "projects.project1.description": "Una plataforma integral para automatizar el aprovisionamiento y gestion de infraestructura. Construida con modulos de Terraform y herramientas personalizadas de Python.",
    "projects.project2.title": "Stack de Monitoreo Kubernetes",
    "projects.project2.description": "Solucion de observabilidad completa para clusters de Kubernetes usando Prometheus, Grafana y exportadores personalizados. Incluye reglas de alerta y dashboards.",
    "projects.project3.title": "Generador de Pipelines CI/CD",
    "projects.project3.description": "Herramienta CLI que genera pipelines CI/CD optimizados basados en la estructura del proyecto. Soporta GitHub Actions, GitLab CI y Jenkins con mejores practicas.",
    "projects.project4.title": "Servicio de Agregacion de Logs",
    "projects.project4.description": "Sistema distribuido de recoleccion y analisis de logs construido para entornos de alto rendimiento. Incluye busqueda en tiempo real y politicas de retencion configurables.",
    
    // Contact
    "contact.title": "Contacto",
    "contact.heading": "Trabajemos Juntos",
    "contact.description": "Actualmente estoy abierto a nuevas oportunidades. Si tienes una pregunta, quieres discutir un proyecto, o simplemente quieres saludar, no dudes en contactarme.",
    "contact.button": "Saludar",
    "contact.footer": "Disenado y Construido con Next.js y Tailwind CSS",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
