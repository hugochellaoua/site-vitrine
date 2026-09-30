import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { ROUTES } from "@/lib/i18n";

/**
 * Le plan du site, dans les deux langues.
 *
 * Chaque adresse déclare ses équivalentes avec `alternates.languages` : c'est
 * ce que Google attend d'un site bilingue pour comprendre que deux pages ne
 * sont pas des doublons mais deux versions de la même chose.
 *
 * Les pages juridiques restent en faible priorité : elles doivent être
 * indexables — elles rassurent et sont obligatoires — sans concurrencer
 * l'accueil sur les requêtes de marque.
 */
const PRIORITES: Record<string, { p: number; f: "weekly" | "monthly" | "yearly" }> = {
  "/": { p: 1, f: "weekly" },
  "/produits": { p: 0.9, f: "monthly" },
  "/cas-d-usage": { p: 0.9, f: "monthly" },
  "/methodologie": { p: 0.8, f: "monthly" },
  "/contact": { p: 0.8, f: "monthly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap(({ fr, en }) => {
    const { p, f } = PRIORITES[fr] ?? { p: 0.3, f: "yearly" as const };
    const languages = { fr: `${siteUrl}${fr}`, en: `${siteUrl}${en}` };
    return [
      { url: `${siteUrl}${fr}`, lastModified: now, changeFrequency: f, priority: p, alternates: { languages } },
      { url: `${siteUrl}${en}`, lastModified: now, changeFrequency: f, priority: p, alternates: { languages } },
    ];
  });
}
