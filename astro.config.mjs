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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
