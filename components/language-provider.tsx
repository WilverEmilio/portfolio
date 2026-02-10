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
    "hero.location": "Quetzaltenango, Guatemala",
    "hero.description": "I'm passionate about creating complete digital products, from the interface to the server logic. I work with React and Tailwind CSS on the frontend, and FastAPI and Node.js on the backend to build modern and scalable applications.",
    "hero.contact": "Contact Me",
    "hero.downloadCV": "Download CV",
    
    // About
    "about.title": "About Me",

    "about.p1": "I am a Systems Engineering student and Full Stack Developer, with experience in web application development and software project management.",

    "about.p2.intro": "I mainly work with modern technologies such as",
    "about.p2.react": "React",
    "about.p2.fastapi": "FastAPI",
    "about.p2.node": "Node.js",
    "about.p2.and": "and",
    "about.p2.typescript": "TypeScript",
    "about.p2.outro": ", building efficient, scalable, and maintainable solutions.",

    "about.p3": "I have participated in real-world projects for public institutions and e-commerce platforms, strengthening skills such as teamwork, organization, and problem-solving.",

    "about.p4": "I enjoy continuous learning, applying best development practices, and collaborating with teams and clients to create solutions that deliver real value.",

    "about.p5.intro": "My Christian principles positively influence my",
    "about.p5.ethic": "work ethic",
    "about.p5.and1": ",",
    "about.p5.commitment": "commitment",
    "about.p5.and2": "and",
    "about.p5.responsibility": "responsibility",
    "about.p5.outro": ", values that I apply in every project and professional collaboration.",
    
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
    "projects.description": "Featured projects that demonstrate my full stack development skills",

    "projects.project1.title": "Municipal Geographic Information System",
    "projects.project1.description": "Complete backend for GIS system developed with FastAPI and PostgreSQL+PostGIS",
    "projects.project1.organization": "Municipality of Palestina De Los Altos",

    "projects.project2.title": "Electronic Commerce System",
    "projects.project2.description": "Complete e-commerce application with a modern frontend built on React/Next.js, Strapi CMS integration, and Stripe payment processing. Separate frontend/backend architecture with headless content management.",
    "projects.project2.organization": "E-commerce Marta",

    "projects.project3.title": "CI/CD Pipeline Generator",
    "projects.project3.description": "CLI tool that generates optimized CI/CD pipelines based on project structure. Supports GitHub Actions, GitLab CI, and Jenkins with best practices baked in.",
    "projects.project4.title": "Log Aggregation Service",
    "projects.project4.description": "Distributed log collection and analysis system built for high-throughput environments. Features real-time search and configurable retention policies.",
    
    // Contact
    "contact.title": "Contact",
    "contact.heading": "Let's Work Together",
    "contact.description": "I'm currently open to new opportunities. Whether you have a question, want to discuss a project, or just want to say hi, feel free to reach out.",
    "contact.button": "Say Hello",
    "contact.footer": "Designed and developed by Wilver Ixcot",
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
    "hero.location": "Quetzaltenango, Guatemala",
    "hero.description": "Desarrollo soluciones web completas, cuidando tanto la experiencia del usuario como la lógica del servidor. Utilizo React y TailwindCSS en frontend, junto con FastAPI y Node.js en backend, para construir aplicaciones modernas, eficientes y escalables.",
    "hero.contact": "Contactame",
    "hero.downloadCV": "Descargar CV",
    
    // About
    "about.title": "Sobre mí",

    "about.p1": "Soy estudiante de Ingeniería en Sistemas y desarrollador Full Stack, con experiencia en el desarrollo de aplicaciones web y la gestión de proyectos de software.",

    "about.p2.intro": "Trabajo principalmente con tecnologías modernas como",
    "about.p2.react": "React",
    "about.p2.fastapi": "FastAPI",
    "about.p2.node": "Node.js",
    "about.p2.and": "y",
    "about.p2.typescript": "TypeScript",
    "about.p2.outro": ", creando soluciones eficientes, escalables y mantenibles.",

    "about.p3": "He participado en proyectos reales para instituciones públicas y plataformas de comercio electrónico, fortaleciendo habilidades como el trabajo en equipo, la organización y la resolución de problemas.",

    "about.p4": "Me gusta aprender constantemente, aplicar buenas prácticas de desarrollo y colaborar con equipos y clientes para crear soluciones que aporten valor real.",
   
    "about.p5.intro": "Mis principios cristianos influyen positivamente en mi",
    "about.p5.ethic": "ética de trabajo",
    "about.p5.and1": ",",
    "about.p5.commitment": "compromiso",
    "about.p5.and2": "y",
    "about.p5.responsibility": "responsabilidad",
    "about.p5.outro": ", valores que aplico en cada proyecto y colaboración profesional.",

    
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
    "projects.description": "Proyectos destacados que demuestran mis habilidades en desarrollo full stack",


    "projects.project1.title": "Sistema de Información Geográfica Municipal",
    "projects.project1.description": "Backend completo para sistema SIG desarrollado con FastAPI y PostgreSQL+PostGIS",
    "projects.project1.organization": "Municipalidad de Palestina De Los Altos",


    "projects.project2.title": "Sistema de Comercio Electrónico",
    "projects.project2.description": "Aplicación completa de e-commerce con frontend moderno en React/Next.js, integración de Strapi como CMS y procesamiento de pagos con Stripe. Arquitectura separada frontend/backend con gestión de contenido headless.",
    "projects.project2.organization": "Comercio Electrónico Marta",

    "projects.project3.title": "Generador de Pipelines CI/CD",
    "projects.project3.description": "Herramienta CLI que genera pipelines CI/CD optimizados basados en la estructura del proyecto. Soporta GitHub Actions, GitLab CI y Jenkins con mejores practicas.",
    "projects.project4.title": "Servicio de Agregacion de Logs",
    "projects.project4.description": "Sistema distribuido de recoleccion y analisis de logs construido para entornos de alto rendimiento. Incluye busqueda en tiempo real y politicas de retencion configurables.",
    
    // Contact
    "contact.title": "Contacto",
    "contact.heading": "Trabajemos Juntos",
    "contact.description": "Actualmente estoy abierto a nuevas oportunidades. Si tienes una pregunta, quieres discutir un proyecto, o simplemente quieres saludar, no dudes en contactarme.",
    "contact.button": "Saludar",
    "contact.footer": "Diseñado y desarrollado por Wilver Ixcot",
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
