"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Profile Photo */}
        <div className="mb-8 relative">
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
            <Image
              src="/photo.jpg"
              alt="Profile photo"
              width={176}
              height={176}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary rounded-full">
            <span className="text-xs font-semibold text-primary-foreground">
              {t("hero.available")}
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 mb-3 text-balance">
          Your Name
        </h1>
        <h2 className="text-xl md:text-2xl text-primary font-medium mb-4">
          {t("hero.title")}
        </h2>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
          <MapPin className="w-4 h-4" />
          <span>{t("hero.location")}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-8 text-pretty">
          {t("hero.description")}
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mb-10">
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="min-w-[160px]">
            <a href="#contact">{t("hero.contact")}</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[160px] bg-transparent">
            <a href="/resume.pdf" download>
              {t("hero.downloadCV")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
