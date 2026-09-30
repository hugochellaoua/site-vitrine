import * as fr from "./content";
import * as en from "./content.en";

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

/**
 * Le dictionnaire complet d'une langue.
 *
 * On ne peut pas exiger que les deux modules aient le même type : les textes
 * français sont figés en types littéraux (`as const` sur les étapes du process,
 * dont les composants tirent une union discriminée), et un titre anglais n'est
 * évidemment pas assignable au titre français.
 *
 * Ce qu'on peut vérifier, et qui couvre l'oubli le plus probable, c'est que les
 * deux fichiers exportent exactement les mêmes noms. La ligne `_symetrie`
 * ci-dessous ne compile plus si l'un en gagne ou en perd un. Les clés
 * imbriquées, elles, restent à la charge du relecteur.
 */
export type Dictionary = typeof fr;

type MemesCles<A, B> = [keyof A] extends [keyof B]
  ? [keyof B] extends [keyof A]
    ? true
    : never
  : never;

const _symetrie: MemesCles<typeof fr, typeof en> = true;
void _symetrie;

const DICTIONARIES = { fr, en };

export function dict(locale: Locale): Dictionary {
  // Les deux modules ont la même forme ; seuls les types littéraux diffèrent.
  return DICTIONARIES[locale] as Dictionary;
}

/**
 * Correspondance des adresses entre les deux langues.
 *
 * Le français reste à la racine : aucune URL existante ne change, et le
 * référencement acquis n'est pas perdu. L'anglais vit sous `/en`, avec des
 * adresses traduites — un lecteur anglophone ne devrait pas avoir à déchiffrer
 * « /politique-de-confidentialite » pour savoir où il est.
 */
export const ROUTES = [
  { fr: "/", en: "/en" },
  { fr: "/produits", en: "/en/products" },
  { fr: "/cas-d-usage", en: "/en/use-cases" },
  { fr: "/methodologie", en: "/en/methodology" },
  { fr: "/contact", en: "/en/contact" },
  { fr: "/mentions-legales", en: "/en/legal-notice" },
  { fr: "/politique-de-confidentialite", en: "/en/privacy-policy" },
  { fr: "/notice-ia", en: "/en/ai-notice" },
  { fr: "/cgu", en: "/en/terms" },
] as const;

/** L'adresse équivalente dans l'autre langue, pour le sélecteur et `hreflang`. */
export function otherLocalePath(path: string, from: Locale): string {
  const sansAncre = path.split("#")[0].replace(/\/$/, "") || "/";
  const paire = ROUTES.find((r) => r[from] === sansAncre);
  if (!paire) return from === "fr" ? "/en" : "/";
  return from === "fr" ? paire.en : paire.fr;
}

/** Préfixe une ancre de la page d'accueil selon la langue : `/#faq` ou `/en#faq`. */
export function home(locale: Locale, anchor = ""): string {
  return locale === "fr" ? `/${anchor}` : `/en${anchor}`;
}
