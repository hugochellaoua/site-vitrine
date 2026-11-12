import type { NextConfig } from "next";

/**
 * La version « thème 2 » du site est servie sous helpify-ai.fr/theme-2 : elle
 * est construite depuis la branche `theme-2`, avec ce préfixe d'adresse, et le
 * site principal la relaie (voir les réécritures de la branche `main`).
 * Cette version n'est pas destinée aux moteurs de recherche : elle porte
 * partout la consigne « noindex ».
 */
const theme2 = process.env.VERCEL_GIT_COMMIT_REF === "theme-2" || process.env.THEME2 === "1";
const basePath = theme2 ? "/theme-2" : "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  async headers() {
    return theme2 ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : [];
  },
};

export default nextConfig;
