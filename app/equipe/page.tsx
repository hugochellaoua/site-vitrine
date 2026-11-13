import type { Metadata } from "next";
import { EquipePage } from "@/components/pages/equipe";

export const metadata: Metadata = {
  title: "L'équipe",
  description: "Les expertises réunies autour de Helpify : relation client et produit, technique et sécurité, experts métier et expert IA.",
  alternates: { canonical: "/equipe", languages: { fr: "/equipe", en: "/en/team" } },
  openGraph: { title: "Les expertises réunies autour de Helpify", url: "/equipe" },
};

export default function Page() {
  return <EquipePage locale="fr" />;
}
