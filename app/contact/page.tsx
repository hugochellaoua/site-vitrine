import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.sub,
  // Sans cette ligne, la page hérite du canonique de la racine et se déclare
  // copie de l'accueil — Google cesse alors de l'indexer.
  alternates: { canonical: "/contact", languages: { fr: "/contact", en: "/en/contact" } },
};

export default function Page() {
  return <ContactPage locale="fr" />;
}
