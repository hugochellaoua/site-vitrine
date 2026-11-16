import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products";

export const metadata: Metadata = {
  // Le titre vise les termes réellement tapés ; la page, elle, garde la voix
  // de l'entreprise. Les deux n'ont pas à dire la même chose.
  title: "Produits — Préqualification, matching et réponses candidats",
  description:
    "Trois produits intégrés à votre ATS : matching au-delà du CV, préqualification des candidats, et Talent Ask qui répond 24h/24.",
  alternates: { canonical: "/produits", languages: { fr: "/produits", en: "/en/products" } },
  openGraph: {
    title: "Une conversation. Trois objectifs.",
    description:
      "Matcher, préqualifier, engager les candidats : les trois produits Helpify, intégrés à votre ATS.",
    url: "/produits",
  },
};

export default function Page() {
  return <ProductsPage locale="fr" />;
}
