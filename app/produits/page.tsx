import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products";

export const metadata: Metadata = {
  // Le titre vise les termes réellement tapés ; la page, elle, garde la voix
  // de l'entreprise. Les deux n'ont pas à dire la même chose.
  title: "Produits — Préqualification, matching et réponses candidats",
  description:
    "Quatre produits intégrés à votre ATS : préqualification des candidats, matching au-delà du CV, 360 Matching sur tout le vivier, et Talent Ask qui répond 24h/24.",
  alternates: { canonical: "/produits", languages: { fr: "/produits", en: "/en/products" } },
  openGraph: {
    title: "Quatre produits. Une seule conversation.",
    description:
      "Préqualifier, matcher, révéler les synergies, répondre aux candidats : les quatre produits Helpify, intégrés à votre ATS.",
    url: "/produits",
  },
};

export default function Page() {
  return <ProductsPage locale="fr" />;
}
