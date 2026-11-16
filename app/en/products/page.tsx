import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products";

export const metadata: Metadata = {
  title: "Products — Prequalification, matching and candidate answers",
  description:
    "Three products that plug into your ATS: matching beyond the CV, candidate prequalification, and Talent Ask answering around the clock.",
  alternates: { canonical: "/en/products", languages: { fr: "/produits", en: "/en/products" } },
  openGraph: {
    title: "One conversation. Three goals.",
    description:
      "Match, prequalify, engage candidates: the three Helpify products, integrated with your ATS.",
    url: "/en/products",
    locale: "en_GB",
  },
};

export default function Page() {
  return <ProductsPage locale="en" />;
}
