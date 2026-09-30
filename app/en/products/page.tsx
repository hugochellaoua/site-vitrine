import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products";

export const metadata: Metadata = {
  title: "Products — Prequalification, matching and candidate answers",
  description:
    "Four products that plug into your ATS: candidate prequalification, matching beyond the CV, 360 Matching across your whole talent pool, and Talent Ask answering around the clock.",
  alternates: { canonical: "/en/products", languages: { fr: "/produits", en: "/en/products" } },
  openGraph: {
    title: "Four products. One conversation.",
    description:
      "Prequalify, match, surface synergies, answer candidates: the four Helpify products, integrated with your ATS.",
    url: "/en/products",
    locale: "en_GB",
  },
};

export default function Page() {
  return <ProductsPage locale="en" />;
}
