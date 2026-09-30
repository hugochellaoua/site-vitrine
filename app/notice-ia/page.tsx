import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs["notice-ia"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/notice-ia", languages: { fr: "/notice-ia", en: "/en/ai-notice" } },
};

export default function Page() {
  return <LegalPage doc={doc} locale="fr" />;
}
