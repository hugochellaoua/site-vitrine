import type { Metadata } from "next";
import { MethodologyPage } from "@/components/pages/methodology";

export const metadata: Metadata = {
  title: "Méthodologie — Critères, questions, évaluation des candidats",
  description:
    "Critères d'évaluation définis pour le poste, questions construites sur les expériences réelles (STAR et STAR inversé), analyse des éléments observables : la méthodologie Helpify.",
  alternates: { canonical: "/methodologie", languages: { fr: "/methodologie", en: "/en/methodology" } },
  openGraph: {
    title: "Une méthodologie fondée sur les sciences du recrutement",
    description:
      "Critères précis, questions adaptées, éléments observables : comment Helpify évalue les candidats au-delà du CV.",
    url: "/methodologie",
  },
};

export default function Page() {
  return <MethodologyPage locale="fr" />;
}
