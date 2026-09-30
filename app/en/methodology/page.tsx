import type { Metadata } from "next";
import { MethodologyPage } from "@/components/pages/methodology";

export const metadata: Metadata = {
  title: "Methodology — Criteria, questions, candidate assessment",
  description:
    "Assessment criteria defined for the role, questions built on real experience (STAR and reverse STAR), analysis of observable elements: the Helpify methodology.",
  alternates: { canonical: "/en/methodology", languages: { fr: "/methodologie", en: "/en/methodology" } },
  openGraph: {
    title: "A methodology grounded in recruitment science",
    description:
      "Precise criteria, fitting questions, observable elements: how Helpify assesses candidates beyond the CV.",
    url: "/en/methodology",
    locale: "en_GB",
  },
};

export default function Page() {
  return <MethodologyPage locale="en" />;
}
