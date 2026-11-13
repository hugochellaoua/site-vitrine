import type { Metadata } from "next";
import { UseCasesPage } from "@/components/pages/use-cases";

export const metadata: Metadata = {
  title: "Cas d'usage — Trier, évaluer, ne rien laisser passer",
  description:
    "Trop de candidatures, évaluation inégale, CV optimisés par l'IA, profils atypiques : neuf situations de recrutement, et ce qu'Helpify y change concrètement.",
  alternates: { canonical: "/cas-d-usage", languages: { fr: "/cas-d-usage", en: "/en/use-cases" } },
  openGraph: {
    title: "Neuf situations de recrutement. Une réponse concrète.",
    description:
      "Volume, standardisation, lecture des profils, CV boostés par l'IA, profils atypiques, vivier : partez de votre problème.",
    url: "/cas-d-usage",
  },
};

export default function Page() {
  return <UseCasesPage locale="fr" />;
}
