import { en, type TranslationKey } from "./en";
import { es } from "./es";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, es };

export type { TranslationKey };

/** Traducción resuelta en el build. Las claves están tipadas: una clave inexistente no compila. */
export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key];
}

/** Atajo para componentes: `const tr = useT(locale); tr("hero.title")`. */
export function useT(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}

export function toLocale(value: string | undefined): Locale {
  return (locales as readonly string[]).includes(value ?? "") ? (value as Locale) : defaultLocale;
}

/** Ruta de inicio de cada idioma: "/" (inglés, sin prefijo) y "/es/". */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}
