import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs["cgu"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/cgu", languages: { fr: "/cgu", en: "/en/terms" } },
};

export default function Page() {
  return <LegalPage doc={doc} locale="fr" />;
}
