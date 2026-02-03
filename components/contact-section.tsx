"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
          {t("contact.title")}
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
          {t("contact.heading")}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {t("contact.description")}
        </p>

        <Button asChild size="lg" className="min-w-[180px]">
          <Link href="mailto:hello@example.com">
            <Mail className="w-4 h-4 mr-2" />
            {t("contact.button")}
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-4 mt-12">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>

        <footer className="mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t("contact.footer")}
          </p>
        </footer>
      </div>
    </section>
  );
}
