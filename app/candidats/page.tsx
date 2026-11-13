import type { Metadata } from "next";
import { CandidatsPage } from "@/components/pages/candidats";

export const metadata: Metadata = {
  title: "Espace candidat — Montrez qui vous êtes, au-delà de votre CV",
  description:
    "Bientôt : échangez avec Helpify sur votre parcours, obtenez un profil qui vous distingue au-delà du CV et partagez-le quand vous postulez. Inscrivez-vous à la liste d'attente.",
  alternates: { canonical: "/candidats", languages: { fr: "/candidats", en: "/en/candidates" } },
  openGraph: { title: "Montrez qui vous êtes, au-delà de votre CV", url: "/candidats" },
};

export default function Page() {
  return <CandidatsPage locale="fr" />;
}
