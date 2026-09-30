import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocsEn } from "@/lib/legal.en";

const doc = legalDocsEn["privacy-policy"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: {
    canonical: "/en/privacy-policy",
    languages: { fr: "/politique-de-confidentialite", en: "/en/privacy-policy" },
  },
  openGraph: { url: "/en/privacy-policy", locale: "en_GB" },
};

export default function Page() {
  return <LegalPage doc={doc} locale="en" />;
}
