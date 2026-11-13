import type { Metadata } from "next";
import { PourquoiIAPage } from "@/components/pages/pourquoi-ia";

export const metadata: Metadata = {
  title: "Pourquoi utiliser l'IA dans le recrutement ?",
  description:
    "Ce que l'IA change pour vos candidats et vos recruteurs, et les réponses aux objections les plus fréquentes : décision humaine, biais, données, CV rédigés avec l'IA.",
  alternates: { canonical: "/pourquoi-l-ia", languages: { fr: "/pourquoi-l-ia", en: "/en/why-ai" } },
  openGraph: {
    title: "Pourquoi utiliser l'IA dans le recrutement ?",
    description: "Le constat, ce que Helpify change des deux côtés, et les questions qu'on nous pose.",
    url: "/pourquoi-l-ia",
  },
};

export default function Page() {
  return <PourquoiIAPage locale="fr" />;
}
