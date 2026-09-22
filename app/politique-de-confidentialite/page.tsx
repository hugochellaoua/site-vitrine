import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs["politique-de-confidentialite"];

export const metadata: Metadata = { title: doc.title, description: doc.description };

export default function Page() {
  return <LegalPage doc={doc} />;
}
