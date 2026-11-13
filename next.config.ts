import type { NextConfig } from "next";

/**
 * La branche `theme-2` construit le site sous le préfixe /theme-2, sans
 * indexation (aujourd'hui : l'ancien design). Le site principal relaie
 * helpify-ai.fr/theme-2 vers ce déploiement, tel quel.
 */
const THEME_2 = "https://site-vitrine-git-theme-2-helpify3.vercel.app";
const theme2 = process.env.VERCEL_GIT_COMMIT_REF === "theme-2" || process.env.THEME2 === "1";
const basePath = theme2 ? "/theme-2" : "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  async rewrites() {
    if (theme2) return [];
    return [
      { source: "/theme-2", destination: `${THEME_2}/theme-2` },
      { source: "/theme-2/:path*", destination: `${THEME_2}/theme-2/:path*` },
    ];
  },
  async headers() {
    return theme2 ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : [];
  },
};

export default nextConfig;
