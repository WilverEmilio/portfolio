"use client";

import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Título centrado */}
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary text-center">
          {t("about.title")}
        </h2>

        {/* Párrafo 1 */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p1")}
        </p>

        {/* Párrafo 2 con tecnologías destacadas */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p2.intro")}{" "}
          <span className="text-foreground font-semibold">
            {t("about.p2.react")}
          </span>,{" "}
          <span className="text-foreground font-semibold">
            {t("about.p2.typescript")}
          </span>,{" "}
          <span className="text-foreground font-semibold">
            {t("about.p2.node")}
          </span>{" "}
          {t("about.p2.and")}{" "}
          <span className="text-foreground font-semibold">
            {t("about.p2.fastapi")}
          </span>
          {t("about.p2.outro")}
        </p>

        {/* Párrafo 3 */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p3")}
        </p>

        {/* Párrafo 4 */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p4")}
        </p>
        {/* Párrafo 5 */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p5.intro")}{" "}
          <span className="text-foreground font-semibold">
            {t("about.p5.ethic")}
          </span>
          {t("about.p5.and1")}{" "}
          <span className="text-foreground font-semibold">
            {t("about.p5.commitment")}
          </span>{" "}
          {t("about.p5.and2")}{" "}
          <span className="text-foreground font-semibold">
            {t("about.p5.responsibility")}
          </span>
          {t("about.p5.outro")}
        </p>

      </div>
    </section>
  );
}
