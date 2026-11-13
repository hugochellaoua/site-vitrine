import type { Metadata } from "next";
import { EquipePage } from "@/components/pages/equipe";

export const metadata: Metadata = {
  title: "The team",
  description: "The expertise gathered around Helpify: customer relations and product, engineering and security, HR experts and an AI expert.",
  alternates: { canonical: "/en/team", languages: { fr: "/equipe", en: "/en/team" } },
  openGraph: { title: "The expertise gathered around Helpify", url: "/en/team", locale: "en_GB" },
};

export default function Page() {
  return <EquipePage locale="en" />;
}
