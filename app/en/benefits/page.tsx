import type { Metadata } from "next";
import { BeneficesPage } from "@/components/pages/benefices";

export const metadata: Metadata = {
  title: "The benefits",
  description: "What Helpify changes in your hiring: less time to shortlist, qualified candidates, answers 24/7 and a richer talent pool.",
  alternates: { canonical: "/en/benefits", languages: { fr: "/benefices", en: "/en/benefits" } },
  openGraph: { title: "Four benefits, one process", url: "/en/benefits" },
};

export default function Page() {
  return <BeneficesPage locale="en" />;
}
