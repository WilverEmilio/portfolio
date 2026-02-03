"use client";

import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8">
          {t("about.title")}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
          {t("about.p1")}
        </p>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
          {t("about.p2.1")}{" "}
          <span className="text-foreground font-medium">{t("about.p2.cloud")}</span>,{" "}
          <span className="text-foreground font-medium">{t("about.p2.container")}</span>
          {" "}{t("about.p2.and")}{" "}
          <span className="text-foreground font-medium">
            {t("about.p2.cicd")}
          </span>
          . {t("about.p2.2")}{" "}
          <span className="text-foreground font-medium">{t("about.p2.startups")}</span> {t("about.p2.to")}{" "}
          <span className="text-foreground font-medium">{t("about.p2.enterprise")}</span>
          .
        </p>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("about.p3")}
        </p>
      </div>
    </section>
  );
}
