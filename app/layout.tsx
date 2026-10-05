import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/**
 * Une seule famille, du wordmark au plus petit label — comme la vidéo de
 * démonstration, qui n'emploie aucun serif.
 *
 * DM Sans est le plus proche disponible en web du géométrique employé par le
 * produit : même « a » à deux étages, même hauteur d'œil généreuse, mêmes
 * terminaisons coupées en biais. La graisse variable évite de charger sept
 * fichiers pour couvrir l'échelle, du texte courant au logotype.
 */
const dmSans = DM_Sans({
  variable: "--font-sans-brand",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  // Indispensable : sans elle, les URL de partage et les liens canoniques
  // restent relatifs, et les réseaux sociaux ne trouvent pas l'image.
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  // Canonique de l'accueil seulement. Les métadonnées s'héritent : toute page
  // qui ne redéclare pas la sienne se dirait copie de celle-ci, et sortirait
  // de l'index. Chaque page en pose donc une.
  // L'accueil français n'a pas de fichier de métadonnées à lui : il hérite
  // d'ici. Ses équivalences de langue doivent donc y figurer, sans quoi il
  // serait la seule page du site à ne pas déclarer sa version anglaise.
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-void text-ink">
        {children}
        {/* Mesure d'audience sans cookie. Si l'outil change, la section 11 de la
            politique de confidentialité (lib/legal.ts et lib/legal.en.ts) doit suivre. */}
        <Analytics />
      </body>
    </html>
  );
}
