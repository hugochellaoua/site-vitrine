import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocsEn } from "@/lib/legal.en";

const doc = legalDocsEn["ai-notice"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: {
    canonical: "/en/ai-notice",
    languages: { fr: "/notice-ia", en: "/en/ai-notice" },
  },
  openGraph: { url: "/en/ai-notice", locale: "en_GB" },
};

export default function Page() {
  return <LegalPage doc={doc} locale="en" />;
}
