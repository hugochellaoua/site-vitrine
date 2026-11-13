import type { Metadata } from "next";
import { CandidatsPage } from "@/components/pages/candidats";

export const metadata: Metadata = {
  title: "For candidates — Show who you are, beyond your CV",
  description:
    "Coming soon: talk with Helpify about your background, get a profile that sets you apart beyond your CV, and share it when you apply. Join the waiting list.",
  alternates: { canonical: "/en/candidates", languages: { fr: "/candidats", en: "/en/candidates" } },
  openGraph: { title: "Show who you are, beyond your CV", url: "/en/candidates", locale: "en_GB" },
};

export default function Page() {
  return <CandidatsPage locale="en" />;
}
