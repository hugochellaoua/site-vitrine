/**
 * Adresse publique du site.
 *
 * Elle sert aux URL absolues exigées par les métadonnées de partage, le
 * sitemap et les données structurées. Surchargeable par variable
 * d'environnement pour les préproductions, sans quoi chaque aperçu
 * déclarerait les URL du site de production.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://helpify-ai.fr").replace(/\/$/, "");
