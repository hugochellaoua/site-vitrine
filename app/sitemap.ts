import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Les pages juridiques sont volontairement en faible priorité : elles doivent
 * être indexables (elles rassurent et sont obligatoires) sans concurrencer
 * l'accueil sur les requêtes de marque.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/produits`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/cas-d-usage`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/notice-ia`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
