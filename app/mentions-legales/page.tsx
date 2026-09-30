import type { Metadata } from "next";
import { LegalNoticePage } from "@/components/pages/legal-notice";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales relatives à l'éditeur et à l'hébergeur du site Helpify.",
  alternates: { canonical: "/mentions-legales", languages: { fr: "/mentions-legales", en: "/en/legal-notice" } },
};

export default function Page() {
  return <LegalNoticePage locale="fr" />;
}
