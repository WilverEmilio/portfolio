"use client";

import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">

        {/* Header con título y línea decorativa */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Contenedor de párrafos con espacio y estilo */}
        <div className="space-y-6">
          
          {/* Párrafo 1 */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.p1")}
          </p>

          {/* Párrafo 2 con tecnologías destacadas */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.p2.intro")}{" "}
            <span className="text-primary font-semibold">
              {t("about.p2.react")}
            </span>,{" "}
            <span className="text-primary font-semibold">
              {t("about.p2.typescript")}
            </span>,{" "}
            <span className="text-primary font-semibold">
              {t("about.p2.node")}
            </span>{" "}
            {t("about.p2.and")}{" "}
            <span className="text-primary font-semibold">
              {t("about.p2.fastapi")}
            </span>
            {t("about.p2.outro")}
          </p>

          {/* Párrafo 3 */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.p3")}
          </p>

          {/* Párrafo 4 */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.p4")}
          </p>

          {/* Párrafo 5 con valores destacados */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.p5.intro")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p5.ethic")}
            </span>
            {t("about.p5.and1")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p5.commitment")}
            </span>{" "}
            {t("about.p5.and2")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p5.responsibility")}
            </span>
            {t("about.p5.outro")}
          </p>

        </div>

        {/* Call to action opcional */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            ¿Interesado en trabajar juntos?{" "}
            <a 
              href="#contact" 
              className="text-primary hover:text-accent transition-colors font-medium underline underline-offset-4"
            >
              Contáctame
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}