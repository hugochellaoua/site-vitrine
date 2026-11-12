import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_BASE_PATH) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      // La route d'envoi du formulaire n'a rien à faire dans un index.
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
