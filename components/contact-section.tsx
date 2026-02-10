"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mykdkwze", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {t("contact.heading")}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Formulario */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder={t("form.label.name")}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder={t("form.label.email")}
                />
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.assunto")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder={t("form.label.subject")}
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder={t("form.label.message")}
                />
              </div>

              {/* Botón enviar */}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-all shadow-lg hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("form.send1")}
                  </>
                ) : status === "success" ? (
                  <>
                    {t("form.success1")}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {t("form.submit")}
                  </>
                )}
              </Button>

              {/* Mensajes de estado */}
              {status === "success" && (
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary">
                  ✓ {t("form.success")}
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                  ✗ {t("form.error")}
                </div>
              )}
            </form>
          </div>

          {/* Información y redes sociales */}
          <div className="space-y-6">
            
            {/* Card de información */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t("form.title1")}
              </h4>
              
              {/* Ubicación */}
              <div className="flex items-start gap-3 mb-4 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="p-2 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{t("form.title2")}</p>
                  <p className="text-sm font-medium text-foreground">
                    {t("form.location")}
                  </p>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="p-2 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{t("form.title3")}</p>
                  <p className="text-sm font-medium text-foreground">
                    {t("form.disponible")}
                  </p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t("form.application")}
              </h4>
              <div className="flex items-center gap-3">
                
                {/* GitHub */}
                <Link
                  href="https://github.com/WilverEmilio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl backdrop-blur-lg border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-primary/50 hover:bg-primary/10 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <div className="relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-foreground group-hover:text-primary transition-colors duration-300">
                      <path d="M12 0.296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.726-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495 0.998 0.108-0.776 0.418-1.305 0.76-1.605-2.665-0.304-5.466-1.334-5.466-5.93 0-1.31 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.524 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.291-1.552 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.874 0.118 3.176 0.77 0.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.372 0.823 1.102 0.823 2.222 0 1.606-0.014 2.896-0.014 3.286 0 0.321 0.216 0.694 0.825 0.576 C20.565 22.092 24 17.592 24 12.296 c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </Link>

                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/in/wilver-emilio-xiá-ixcot-6aa7662b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl backdrop-blur-lg border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-[#0a66c2]/30 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a66c2]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <div className="relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-foreground group-hover:text-[#0a66c2] transition-colors duration-300">
                      <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727v20.545C0 23.227.79 24 1.77 24h20.46C23.21 24 24 23.227 24 22.273V1.727C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9h3.53v11.452zM5.325 7.433c-1.13 0-2.048-.916-2.048-2.045 0-1.13.918-2.045 2.048-2.045 1.13 0 2.048.916 2.048 2.045 0 1.129-.918 2.045-2.048 2.045zM20.452 20.452h-3.53v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666h-3.53V9h3.389v1.561h.047c.472-.9 1.624-1.852 3.341-1.852 3.572 0 4.231 2.351 4.231 5.411v6.332z"/>
                    </svg>
                  </div>
                </Link>

                {/* Email directo (opcional) */}
                <Link
                  href="mailto:ixcotwilver@gmail.com"
                  className="p-4 rounded-xl backdrop-blur-lg border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-primary/50 hover:bg-primary/10 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <div className="relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-foreground group-hover:text-primary transition-colors duration-300">
                      <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V9.489l7.445 4.964a1 1 0 0 0 1.11 0L20 9.489V18H4z"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © 2025 Wilver Emilio Xiá Ixcot. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-2">
              Hecho con <span className="text-primary">❤️</span> usando Next.js & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}