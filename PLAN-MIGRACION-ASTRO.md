# Plan de migración del portafolio: Next.js 16 → Astro

> **Estado:** fases 0–6 completadas y validadas en local; fase 7 completada salvo el deploy de preview; fase 8 (comparación local) hecha. Pendiente: dominio para `site`, deploy de preview en Netlify, envío real del formulario y aprobación para commit/merge. Ver [sección 13](#13-registro-de-implementación).
> **Fecha:** 11 de noviembre de 2026
> **Fuentes:** análisis del repositorio y documentación oficial de Astro consultada con el MCP `astro-docs`.

---

## Índicepa

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Estado actual del proyecto](#2-estado-actual-del-proyecto)
3. [La decisión principal: cómo funciona el idioma](#3-la-decisión-principal-cómo-funciona-el-idioma)
4. [Qué pasa con cada componente](#4-qué-pasa-con-cada-componente)
5. [Tema claro/oscuro sin next-themes](#5-tema-clarooscuro-sin-next-themes)
6. [CSS y rendimiento](#6-css-y-rendimiento)
7. [Pasos de la migración](#7-pasos-de-la-migración)
8. [Despliegue en Netlify](#8-despliegue-en-netlify)
9. [Riesgos y cómo evitarlos](#9-riesgos-y-cómo-evitarlos)
10. [Antes y después](#10-antes-y-después)
11. [Decisiones pendientes](#11-decisiones-pendientes)
12. [Referencias](#12-referencias)

---

## 1. Resumen ejecutivo

Hoy el portafolio es una app de Next.js donde **todo se renderiza en el navegador**. El `LanguageProvider` devuelve `null` hasta montarse, así que el HTML inicial llega vacío y el visitante no ve nada hasta que React termina de cargar.

La propuesta:

- **5 secciones de contenido pasan a `.astro`.** Se generan como HTML en el build y no envían JavaScript.
- **Solo 2 islas de React:** `Navbar` (`client:load`) y el formulario de contacto (`client:visible`).
- **El idioma pasa a rutas** (`/` en inglés, `/es/` en español), generadas en el build. Es la decisión que más cambia el plan (ver la [sección 3](#3-la-decisión-principal-cómo-funciona-el-idioma)).
- **Se eliminan unas 40 dependencias** que nadie usa y todo lo que es propio de Next.
- **Netlify:** el sitio sigue siendo estático y no necesita adapter.

> ⚠️ **Nota:** se pidió usar la skill `modern-web-guidance` para CSS y rendimiento, pero **no está instalada en este entorno**. La [sección 6](#6-css-y-rendimiento) se basa en la documentación de Astro y en buenas prácticas generales. Si es una skill tuya, hay que añadirla en `.claude/skills/` para revisar esa sección con ella.

---

## 2. Estado actual del proyecto

### Stack

| Pieza | Hoy |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Estilos | Tailwind CSS v4 (`@tailwindcss/postcss`), tokens oklch en `app/globals.css` |
| UI | shadcn/ui ("new-york") |
| Idioma | Context de React a mano (`language-provider.tsx`) + `localStorage` |
| Tema | `next-themes` (por clase, oscuro por defecto) |
| Fuentes | `next/font/google` (Geist, Geist Mono) |
| Imágenes | `next/image` con `unoptimized: true`, así que **no se optimizan** |
| Analítica | `@vercel/analytics`, que **no funciona en Netlify** |
| Formulario | `fetch` a Formspree desde el navegador |
| Hosting | Netlify |

### Componentes

| Componente | ¿Es interactivo de verdad? | Qué usa |
|---|---|---|
| `navbar.tsx` | ✅ **Sí** | Escucha el scroll, abre y cierra el menú móvil, cambia el tema y el idioma |
| `contact-section.tsx` | ✅ **Sí** | Formulario con estados `idle / sending / success / error` |
| `hero-section.tsx` | ❌ No | Solo `t()`, `next/image` y `Button` |
| `about-section.tsx` | ❌ No | Solo `t()` |
| `technologies-section.tsx` | ❌ No | `t()`, `Card` e iconos |
| `projects-section.tsx` | ❌ No | `t()`, un array de proyectos en el propio archivo, `next/image` |
| `experience-section.tsx` | ❌ No | No se muestra en `page.tsx` |
| `language-provider.tsx` | Contexto | Bloquea el renderizado hasta montarse |
| `theme-provider.tsx` | Contexto | Envuelve `next-themes` |

**Lo que hay que notar:** todos los componentes llevan `"use client"`, pero los cuatro de contenido **solo lo necesitan para llamar a `useLanguage()`**. Si se resuelve el idioma de otra forma, dejan de necesitar JavaScript.

### Código y dependencias que sobran

- De **55 componentes** en `components/ui/` solo se usan **2**: `button` y `card`.
- Paquetes que nadie importa: casi todos los `@radix-ui/*`, `recharts`, `cmdk`, `zod`, `react-hook-form`, `@hookform/resolvers`, `date-fns`, `react-day-picker`, `embla-carousel-react`, `input-otp`, `vaul`, `sonner`, `react-resizable-panels`.
- Archivos sin usar: `styles/globals.css`, `public/placeholder-logo.*`.

---

## 3. La decisión principal: cómo funciona el idioma

### El problema

En Astro, cada isla de React se hidrata por separado. **Los Context de React no se comparten entre islas** (lo dice la documentación de Astro en *Share state between islands*). Si se mantiene el `LanguageProvider` como está, **todas las secciones tendrían que seguir siendo React** para poder leer el idioma, y la migración no serviría de mucho.

### Opción A: una página por idioma ⭐ *Recomendada*

```
/       → página en inglés  (src/pages/index.astro)
/es/    → página en español (src/pages/es/index.astro)
```

- Se usa el i18n nativo de Astro con `defaultLocale: "en"` y `prefixDefaultLocale: false`. **La URL actual no cambia.**
- Los textos pasan de `language-provider.tsx` a `src/i18n/en.ts` y `src/i18n/es.ts`, más una función `t(locale, key)` que se ejecuta **en el build**.
- Cada `.astro` obtiene el idioma con `Astro.currentLocale` y genera HTML ya traducido.
- El botón de idioma pasa a ser un enlace normal: `<a href="/es/">ES</a>`.
- Las islas reciben sus textos **como props**, así que no necesitan ningún Context.

| ✅ Ventajas | ⚠️ Desventajas |
|---|---|
| Las secciones no envían JavaScript | Cambiar de idioma recarga la página (es instantáneo, porque es HTML estático) |
| Buen SEO en los dos idiomas: `hreflang` y `<html lang>` correcto | Se pierde la preferencia en `localStorage` (se puede recuperar con un script de una línea que redirija) |
| El texto aparece sin esperar a JavaScript | |
| Google indexa también la versión en español | |

### Opción B: mantener el cambio de idioma en el navegador

- Se conserva un estado global con **Nano Stores** (la solución que recomienda Astro para compartir estado entre islas) y `localStorage`.
- **Todas las secciones con texto tienen que seguir siendo islas de React.**

| ✅ Ventajas | ⚠️ Desventajas |
|---|---|
| El cambio de idioma funciona igual que hoy | Casi todo sigue siendo React y se envía mucho JavaScript |
| Menos cambios en la estructura | No cumple el objetivo de pasar a `.astro` lo que no es interactivo |
| | Solo se indexa un idioma; posible parpadeo de texto al cargar |

### Recomendación

**Opción A.** Es la única compatible con el objetivo de pasar a `.astro` todo lo que no es interactivo, y además mejora el SEO en español.

---

## 4. Qué pasa con cada componente

*(Suponiendo la Opción A)*

### Pasan a `.astro`, sin JavaScript en el navegador

| Hoy | Después | Cambios principales |
|---|---|---|
| `app/layout.tsx` | `src/layouts/BaseLayout.astro` | `<html lang>`, metadatos, favicon, fuentes y script del tema |
| `app/page.tsx` | `src/pages/index.astro` + `src/pages/es/index.astro` | Las dos usan el mismo componente y solo cambia el idioma |
| `hero-section.tsx` | `HeroSection.astro` | `next/image` pasa a `<Image>` de `astro:assets` |
| `about-section.tsx` | `AboutSection.astro` | Solo cambia la sintaxis |
| `technologies-section.tsx` | `TechnologiesSection.astro` | `Card` pasa a HTML con las mismas clases |
| `projects-section.tsx` | `ProjectsSection.astro` | Los datos pasan a `src/data/projects.ts` |
| `experience-section.tsx` | `ExperienceSection.astro` | Sigue sin mostrarse, igual que hoy |

**Cambios de sintaxis comunes:** `className` pasa a `class`, `<Link>` a `<a>`, `{children}` a `<slot />` y `next/image` a `<Image>`.

**`Button` y `Card` en `.astro`:** no hace falta llevar el componente React. Se importa la función `buttonVariants()` (cva, que es TypeScript puro) y se aplica como `class` a un `<a>` o un `<button>`. Así se conservan las variantes propias `contact` y `download`.

**Iconos:** `lucide-react` y `react-icons` dentro de un `.astro` se renderizan a SVG **sin enviar JavaScript**. Para un resultado más limpio se puede usar `@lucide/astro` o `astro-icon`.

### Se quedan como islas de React

| Isla | Directiva | Por qué |
|---|---|---|
| `Navbar.tsx` | `client:load` | Está arriba del todo y se usa enseguida |
| `ContactForm.tsx` | `client:visible` | Está al final de la página, así que su JavaScript solo se descarga **cuando el usuario llega ahí** |

- **Navbar:** recibe `locale`, `labels` y `altLocaleHref` como props. Más adelante se podría bajar a `client:idle`, o incluso a un `.astro` con un `<script>` pequeño, porque solo tiene un toggle y un listener de scroll.
- **Contacto:** en `ContactSection.astro` quedan estáticos el título y el texto, y **solo el `<form>`** es isla. El `fetch` a Formspree no cambia.

### Diagrama

```
BaseLayout.astro  (estático + script del tema en <head>)
├── Navbar.tsx                 🟦 isla · client:load
├── HeroSection.astro          ⬜ HTML
├── AboutSection.astro         ⬜ HTML
├── TechnologiesSection.astro  ⬜ HTML
├── ProjectsSection.astro      ⬜ HTML
└── ContactSection.astro       ⬜ HTML
    └── ContactForm.tsx        🟦 isla · client:visible
```

---

## 5. Tema claro/oscuro sin next-themes

`next-themes` depende de Next y de un Provider, así que hay que sustituirlo por:

1. **Un script `is:inline` en el `<head>`** que lea `localStorage` y `prefers-color-scheme` y ponga la clase `.dark` en `<html>` **antes de pintar la página**, para que no haya parpadeo.
2. **El botón de la Navbar** solo hace `document.documentElement.classList.toggle("dark")` y guarda la elección en `localStorage`.
3. **El icono de sol o luna se controla con CSS** (`dark:hidden` / `hidden dark:block`) y no con el estado de React, para evitar errores de hidratación.

El CSS actual (`@custom-variant dark (&:is(.dark *))` y los tokens `.dark`) **funciona sin cambios**.

---

## 6. CSS y rendimiento

### Imágenes

- Mover `photo.png` y las imágenes de `public/projects/` a `src/assets/`.
- `<Image>` de Astro las convierte a **WebP o AVIF**, ajusta el tamaño y pone `width`/`height` solo, lo que evita saltos de diseño (CLS).
- **La foto del hero** debe llevar `loading="eager"` y `fetchpriority="high"`, porque es el elemento más grande de la primera pantalla (LCP).
- Hoy `images.unoptimized: true` sirve los PNG originales. `inicio.png` e `inicio_h.png` probablemente pesan mucho.

### Fuentes

- Reemplazar `next/font` por la **Fonts API de Astro**: `<Font cssVariable="--font-geist" preload />`.
- Precargar **solo** el peso normal en latín, porque precargar de más perjudica la carga (advertencia de la propia documentación).

### JavaScript

- Se pasa de **toda la página hidratada** a **dos islas**.
- La isla del formulario no se descarga si el usuario no baja hasta el final.

### CSS

- Tailwind v4 con `@tailwindcss/vite`, que solo genera las clases que se usan.
- **Navbar al hacer scroll:** se puede usar CSS (`animation-timeline: scroll()`) como mejora progresiva y conservar el listener solo como alternativa.
- **Anclas (`#about`, `#projects`…):** `scroll-behavior: smooth` y `scroll-margin-top` para que la navbar fija no tape los títulos.
- **Accesibilidad:** respetar `prefers-reduced-motion` en las animaciones de `tw-animate-css`.

---

## 7. Pasos de la migración

| # | Paso | Detalle |
|---|---|---|
| 1 | **Rama y base** | Crear una rama `migracion-astro`, montar Astro, `pnpm astro add react` y `pnpm astro add tailwind`, y configurar el alias `@/*` |
| 2 | **Estilos** | Mover `app/globals.css` a `src/styles/global.css` **sin cambios** e importarlo en el layout. Borrar `styles/globals.css` y `postcss.config` |
| 3 | **Layout** | `BaseLayout.astro` con metadatos, favicon, fuentes y script del tema |
| 4 | **i18n** | Configurar `i18n` en `astro.config.mjs`, separar las traducciones en `en.ts` y `es.ts` y crear las dos páginas |
| 5 | **Secciones estáticas** | Convertir Hero, About, Technologies y Projects una por una |
| 6 | **Islas** | `Navbar.tsx` y `ContactForm.tsx` con sus textos como props |
| 7 | **Imágenes** | Mover las imágenes a `src/assets/` y usar `<Image>` |
| 8 | **Limpieza** | Quitar `next`, `next-themes`, `@vercel/analytics` y lo que no se usa de `ui/` |
| 9 | **Netlify** | Crear `netlify.toml` y `.nvmrc` |
| 10 | **Comprobación** | `pnpm astro check`, comparar visualmente con la versión actual y medir con Lighthouse antes y después |

---

## 8. Despliegue en Netlify

Según la documentación de Astro, **un sitio estático no necesita adapter**:

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"
```

Además, un `.nvmrc` con la versión de Node que pide Astro (22 o superior).

El adapter `@astrojs/netlify` solo haría falta para renderizado en servidor, la Image CDN de Netlify o redirecciones desde la config de Astro, y **nada de eso es necesario aquí**.

---

## 9. Riesgos y cómo evitarlos

| Riesgo | Cómo evitarlo |
|---|---|
| La página se ve un instante con el tema equivocado | Script `is:inline` en el `<head>` antes de cualquier CSS |
| Error de hidratación en el icono del tema | Mostrar el icono con clases `dark:` y no con estado de React |
| Los `#anchors` fallan en `/es/` | Usar enlaces relativos (`#about`) y probar los dos idiomas |
| Faltan traducciones | Tipar las claves con TypeScript para que una clave ausente dé error en el build |
| El formulario deja de funcionar | El código del `fetch` no cambia; probar un envío real en el deploy de preview de Netlify |
| El diseño cambia sin querer | Comparar con capturas de la versión actual antes de fusionar |

---

## 10. Antes y después

| Aspecto | Next.js (hoy) | Astro (propuesto) |
|---|---|---|
| HTML inicial | Vacío (todo se pinta en el navegador) | Completo y ya traducido |
| JavaScript de las secciones | React + todas las secciones | Solo Navbar + formulario (cuando se ve) |
| SEO en español | No se indexa | `/es/` indexable con `hreflang` |
| Imágenes | PNG originales sin optimizar | WebP/AVIF con su tamaño |
| Dependencias | ~60 | ~10–15 |
| Analítica | Vercel (no funciona en Netlify) | Ninguna, o Netlify Analytics / Plausible si la quieres |
| Adapter de despliegue | — | No hace falta |

---

## 11. Decisiones pendientes

Marca una opción en cada pregunta para continuar:

### D1. Cómo funciona el idioma *(la más importante)*
- [x] **A. Una página por idioma (`/` y `/es/`)** ⭐ recomendada
- [ ] B. Cambio en el navegador con Nano Stores (casi todo sigue siendo React)

### D2. Recordar el idioma elegido (solo si eliges A)
- [ ] Sí, con un script pequeño que redirija según `localStorage`
- [x] No, cada URL muestra siempre su idioma ⭐ más simple

### D3. Navbar
- [x] **Isla de React con `client:load`** ⭐ migración más directa
- [ ] `.astro` con un `<script>` propio (cero React en la cabecera, pero hay más que reescribir)

### D4. Analítica
- [x] Quitarla por ahora ⭐
- [ ] Sustituirla por Netlify Analytics o Plausible

### D5. Sección de experiencia
- [x] Migrarla pero seguir sin mostrarla ⭐
- [ ] Migrarla y mostrarla
- [ ] Eliminarla

### D6. Dónde se hace la migración
- [x] **En una rama nueva del mismo repo** ⭐
- [ ] En un repositorio nuevo

---

## 12. Referencias

Documentación oficial de Astro consultada:

- [Migrating from Next.js](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)
- [Islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
- [Internationalization (i18n) Routing](https://docs.astro.build/en/guides/internationalization/)
- [Share state between islands (Nano Stores)](https://docs.astro.build/en/recipes/sharing-state-islands/)
- [Styles and CSS: Tailwind](https://docs.astro.build/en/guides/styling/#tailwind)
- [Images](https://docs.astro.build/en/guides/images/) · [astro:assets: Image y Font](https://docs.astro.build/en/reference/modules/astro-assets/)
- [Deploy to Netlify](https://docs.astro.build/en/guides/deploy/netlify/)

---

## 13. Registro de implementación

*(11/11/2026, rama `migracion-astro`, sin commits)*

| Fase | Resultado |
|---|---|
| 0 | Decisiones registradas (sección 11). Capturas y Lighthouse de la versión Next guardados como referencia. |
| 1 | Astro 7.4.10 + @astrojs/react 7.1.7 + Tailwind 4.3.5 (`@tailwindcss/vite`). Node actualizado a 22.23.5 (Astro pide ≥ 22.23.4). |
| 2 | `global.css` con los mismos tokens; `BaseLayout.astro` con script de tema inline, favicon, Geist vía Fonts API. |
| 3 | `/` y `/es/` con `lang`, `canonical` y `hreflang`; traducciones tipadas en `src/i18n/`. |
| 4 | Hero, About, Technologies, Projects y Contact en `.astro` (0 JS). Experience migrada sin mostrar. |
| 5 | Navbar (`client:load`) y ContactForm (`client:visible`). 40 pruebas automáticas superadas (tema, idioma, anclas, menú móvil, estados del formulario con Formspree simulado, sin JS). |
| 6 | Imágenes a WebP con `srcset` (foto 1,5 MB → 4–9 KB). CSS 123 KB → 39 KB (escaneo limitado a `src/`, CSS inline). `prefers-reduced-motion`. |
| 7 | 47 dependencias eliminadas; código Next borrado; `netlify.toml`, `.nvmrc`, `packageManager`. Instalación limpia + check + build OK. |
| 8 | Diferencia visual ≤ 0,19 % (solo remuestreo de imágenes) en 8 capturas; menú móvil idéntico. Lighthouse móvil: rendimiento 96 → 99, LCP 2,7 s → 2,0 s, peso 1.787 KB → 140 KB, accesibilidad 96 → 100. |

### Diferencias intencionadas respecto al sitio Next

- Cambiar de idioma navega a otra URL (decisión D1) y no se recuerda la elección (D2).
- `<title>`/`description` traducidos en `/es/`; aria-labels añadidos a enlaces sociales y al selector de idioma.
- Se eliminó `@vercel/analytics` (D4); en Netlify daba 404.
- Scroll suave en anclas (respeta `prefers-reduced-motion`).

### Pendiente

1. Dominio de producción → `site` en `astro.config.mjs` (SEO de Lighthouse en 83 hasta entonces por `hreflang`/`canonical` relativos).
2. Deploy de preview en Netlify y envío real del formulario desde ahí.
3. Commit y merge, solo con aprobación.
