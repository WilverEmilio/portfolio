// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TODO(migración): poner aquí el dominio de producción de Netlify para
  // generar URLs absolutas en hreflang/canonical.
  // site: "https://<tu-dominio>",
  output: "static",
  trailingSlash: "ignore",
  // El CSS (~7 KB gzip) va inline en el HTML: evita una petición que bloquea el primer pintado.
  build: { inlineStylesheets: "always" },
  integrations: [react()],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      // Geist es variable: un solo archivo cubre 400–800 (pesos usados).
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      // Títulos: grotesca de periódico con carácter (OFL). Variable: un archivo para 500–700.
      provider: fontProviders.google(),
      name: "Schibsted Grotesk",
      cssVariable: "--font-schibsted",
      // Pesos usados en títulos: 500 (medium), 600 (semibold), 700 (bold).
      weights: ["500 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      // Etiquetas, metadatos y coordenadas (OFL). No se precarga: no es crítica.
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
