"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();

  const experiences = [
    {
      period: "2023 — Present",
      title: t("exp.job1.title"),
      company: t("exp.job1.company"),
      companyUrl: "#",
      description: t("exp.job1.description"),
      skills: ["Kubernetes", "Terraform", "AWS", "GitOps", "Python"],
    },
    {
      period: "2021 — 2023",
      title: t("exp.job2.title"),
      company: t("exp.job2.company"),
      companyUrl: "#",
      description: t("exp.job2.description"),
      skills: ["Jenkins", "Docker", "Linux", "Ansible", "Azure"],
    },
    {
      period: "2019 — 2021",
      title: t("exp.job3.title"),
      company: t("exp.job3.company"),
      companyUrl: "#",
      description: t("exp.job3.description"),
      skills: ["Linux", "Bash", "Python", "Networking", "VMware"],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12 text-center">
          {t("exp.title")}
        </h2>
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/resume.pdf"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
          >
            {t("exp.viewResume")}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  period,
  title,
  company,
  companyUrl,
  description,
  skills,
}: {
  period: string;
  title: string;
  company: string;
  companyUrl: string;
  description: string;
  skills: string[];
}) {
  return (
    <div className="group p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all">
      <span className="text-xs text-primary font-medium uppercase tracking-wider">
        {period}
      </span>
      <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
        {title} ·{" "}
        <Link
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          {company}
          <ExternalLink className="w-3 h-3" />
        </Link>
      </h3>
      <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
