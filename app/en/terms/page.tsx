import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocsEn } from "@/lib/legal.en";

const doc = legalDocsEn["terms"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: {
    canonical: "/en/terms",
    languages: { fr: "/cgu", en: "/en/terms" },
  },
  openGraph: { url: "/en/terms", locale: "en_GB" },
};

export default function Page() {
  return <LegalPage doc={doc} locale="en" />;
}
