import type { NextConfig } from "next";

/**
 * helpify-ai.fr/theme-2 : la nouvelle version du site, en aperçu. Elle est
 * construite depuis la branche `theme-2` (sous le préfixe /theme-2, et non
 * indexée) et le site principal la relaie telle quelle à cette adresse.
 */
const THEME_2 = "https://site-vitrine-git-theme-2-helpify3.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/theme-2", destination: `${THEME_2}/theme-2` },
      { source: "/theme-2/:path*", destination: `${THEME_2}/theme-2/:path*` },
    ];
  },
};

export default nextConfig;
