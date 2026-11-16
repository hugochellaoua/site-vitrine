import type { Metadata } from "next";
import { BeneficesPage } from "@/components/pages/benefices";

export const metadata: Metadata = {
  title: "Les bénéfices",
  description: "Ce que Helpify change dans vos recrutements : moins de temps jusqu'à la shortlist, des candidats qualifiés, des réponses 24h/24 et un vivier plus riche.",
  alternates: { canonical: "/benefices", languages: { fr: "/benefices", en: "/en/benefits" } },
  openGraph: { title: "Quatre bénéfices, un seul process", url: "/benefices" },
};

export default function Page() {
  return <BeneficesPage locale="fr" />;
}
