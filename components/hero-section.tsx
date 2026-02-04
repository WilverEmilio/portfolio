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
        <div className="mb-8 relative">
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
            <Image
              src="/photo.png"
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 mb-3 text-balance">
          Wilver Emilio Xiá Ixcot
        </h1>
        <h2 className="text-xl md:text-2xl text-primary font-medium mb-4">
          {t("hero.title")}
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
          <MapPin className="w-4 h-4" />
          <span>{t("hero.location")}</span>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-8 text-pretty">
          {t("hero.description")}
        </p>
        <div className="flex items-center justify-center gap-3 mb-10">
          <Link
            href="https://github.com/WilverEmilio"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-full backdrop-blur-lg border border-white/10 
                      bg-gradient-to-tr from-black/60 to-black/40 
                      shadow-lg hover:shadow-2xl hover:shadow-white/20 
                      hover:scale-110 hover:rotate-3 
                      active:scale-95 active:rotate-0 
                      transition-all duration-300 ease-out cursor-pointer 
                      hover:border-white/30 
                      hover:bg-gradient-to-tr hover:from-white/10 hover:to-black/40 
                      group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-700 ease-out" />
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-white group-hover:text-white/90 transition-colors duration-300"
              >
                <path d="M12 0.296c-6.63 0-12 5.373-12 12 
                        0 5.303 3.438 9.8 8.205 11.387 
                        0.6 0.113 0.82-0.258 0.82-0.577 
                        0-0.285-0.01-1.04-0.015-2.04 
                        -3.338 0.726-4.042-1.61-4.042-1.61 
                        -0.546-1.387-1.333-1.756-1.333-1.756 
                        -1.089-0.745 0.083-0.729 0.083-0.729 
                        1.205 0.084 1.84 1.236 1.84 1.236 
                        1.07 1.835 2.809 1.305 3.495 0.998 
                        0.108-0.776 0.418-1.305 0.76-1.605 
                        -2.665-0.304-5.466-1.334-5.466-5.93 
                        0-1.31 0.469-2.381 1.236-3.221 
                        -0.124-0.303-0.535-1.524 0.117-3.176 
                        0 0 1.008-0.322 3.301 1.23 
                        0.957-0.266 1.983-0.399 3.003-0.404 
                        1.02 0.005 2.047 0.138 3.006 0.404 
                        2.291-1.552 3.297-1.23 3.297-1.23 
                        0.653 1.653 0.242 2.874 0.118 3.176 
                        0.77 0.84 1.235 1.911 1.235 3.221 
                        0 4.609-2.807 5.624-5.479 5.921 
                        0.43 0.372 0.823 1.102 0.823 2.222 
                        0 1.606-0.014 2.896-0.014 3.286 
                        0 0.321 0.216 0.694 0.825 0.576 
                        C20.565 22.092 24 17.592 24 12.296 
                        c0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </Link>

          <Link
            href="https://www.linkedin.com/in/wilver-emilio-xiá-ixcot-6aa7662b4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-5 rounded-full backdrop-blur-lg border border-blue-500/30
                      bg-gradient-to-tr from-black/60 to-black/40 
                      shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 
                      hover:scale-110 hover:rotate-3 
                      active:scale-95 active:rotate-0 
                      transition-all duration-300 ease-out cursor-pointer 
                      hover:border-blue-500/50 
                      hover:bg-gradient-to-tr hover:from-blue-500/15 hover:to-black/40 
                      group relative overflow-hidden"
          >
            {/* Efecto barrido */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-700 ease-out" />

            {/* Icono LinkedIn */}
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-white group-hover:text-blue-500/90 transition-colors duration-300"
              >
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727v20.545C0 23.227.79 24 1.77 24h20.46C23.21 24 24 23.227 24 22.273V1.727C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9h3.53v11.452zM5.325 7.433c-1.13 0-2.048-.916-2.048-2.045 0-1.13.918-2.045 2.048-2.045 1.13 0 2.048.916 2.048 2.045 0 1.129-.918 2.045-2.048 2.045zM20.452 20.452h-3.53v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666h-3.53V9h3.389v1.561h.047c.472-.9 1.624-1.852 3.341-1.852 3.572 0 4.231 2.351 4.231 5.411v6.332z"/>
              </svg>
            </div>
          </Link>

          <Link
            href="mailto:ixcotwilver@gmail.com"
            aria-label="Send email"
            className="p-5 rounded-full backdrop-blur-lg border border-white/10 
                      bg-gradient-to-tr from-black/60 to-black/40 
                      shadow-lg hover:shadow-2xl hover:shadow-white/20 
                      hover:scale-110 hover:rotate-3 
                      active:scale-95 active:rotate-0 
                      transition-all duration-300 ease-out cursor-pointer 
                      hover:border-white/30 
                      hover:bg-gradient-to-tr hover:from-white/10 hover:to-black/40 
                      group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-700 ease-out" />
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-white group-hover:text-white/90 transition-colors duration-300"
              >
                <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V9.489l7.445 4.964a1 1 0 0 0 1.11 0L20 9.489V18H4z"/>
              </svg>
            </div>
          </Link>

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild  size="lg" className="min-w-[160px]">
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
