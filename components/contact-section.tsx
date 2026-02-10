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
          <Link href="mailto:wilver.emilio@gmail.com" className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 mr-2" />
            {t("contact.button")}
          </Link>
        </Button>

        {/* Iconos de redes sociales */}
        <div className="flex items-center justify-center gap-3 mb-10">
          
          {/* GitHub */}
          <Link
            href="https://github.com/WilverEmilio"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-full backdrop-blur-lg border border-border
                      bg-card
                      shadow-lg hover:shadow-2xl hover:shadow-primary/20
                      hover:scale-110 hover:rotate-3
                      active:scale-95 active:rotate-0
                      transition-all duration-300 ease-out cursor-pointer
                      hover:border-primary/50
                      hover:bg-primary/10
                      group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent
                            -translate-x-full group-hover:translate-x-full
                            transition-transform duration-700 ease-out" />
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-foreground group-hover:text-primary transition-colors duration-300"
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

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/wilver-emilio-xiá-ixcot-6aa7662b4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-5 rounded-full backdrop-blur-lg border border-border
                      bg-card
                      shadow-lg hover:shadow-2xl hover:shadow-[#0a66c2]/30
                      hover:scale-110 hover:rotate-3
                      active:scale-95 active:rotate-0
                      transition-all duration-300 ease-out cursor-pointer
                      hover:border-[#0a66c2]/50
                      hover:bg-[#0a66c2]/10
                      group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a66c2]/20 to-transparent
                            -translate-x-full group-hover:translate-x-full
                            transition-transform duration-700 ease-out" />
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-foreground group-hover:text-[#0a66c2] transition-colors duration-300"
              >
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727v20.545C0 23.227.79 24 1.77 24h20.46C23.21 24 24 23.227 24 22.273V1.727C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9h3.53v11.452zM5.325 7.433c-1.13 0-2.048-.916-2.048-2.045 0-1.13.918-2.045 2.048-2.045 1.13 0 2.048.916 2.048 2.045 0 1.129-.918 2.045-2.048 2.045zM20.452 20.452h-3.53v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666h-3.53V9h3.389v1.561h.047c.472-.9 1.624-1.852 3.341-1.852 3.572 0 4.231 2.351 4.231 5.411v6.332z"/>
              </svg>
            </div>
          </Link>

          {/* Email */}
          <Link
            href="mailto:ixcotwilver@gmail.com"
            aria-label="Send email"
            className="p-5 rounded-full backdrop-blur-lg border border-border
                      bg-card
                      shadow-lg hover:shadow-2xl hover:shadow-primary/20
                      hover:scale-110 hover:rotate-3
                      active:scale-95 active:rotate-0
                      transition-all duration-300 ease-out cursor-pointer
                      hover:border-primary/50
                      hover:bg-primary/10
                      group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent
                            -translate-x-full group-hover:translate-x-full
                            transition-transform duration-700 ease-out" />
            <div className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current text-foreground group-hover:text-primary transition-colors duration-300"
              >
                <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V9.489l7.445 4.964a1 1 0 0 0 1.11 0L20 9.489V18H4z"/>
              </svg>
            </div>
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
