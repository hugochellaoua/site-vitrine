import type { Metadata } from "next";
import { UseCasesPage } from "@/components/pages/use-cases";

export const metadata: Metadata = {
  title: "Use cases — Screen, assess, miss nothing",
  description:
    "Too many applications, uneven assessment, AI-polished CVs, non-linear profiles: nine hiring situations, and what Helpify concretely changes about each.",
  alternates: { canonical: "/en/use-cases", languages: { fr: "/cas-d-usage", en: "/en/use-cases" } },
  openGraph: {
    title: "Nine hiring situations. One concrete answer.",
    description:
      "Volume, standardisation, reading profiles, AI-polished CVs, non-linear profiles, talent pool: start from your own problem.",
    url: "/en/use-cases",
    locale: "en_GB",
  },
};

export default function Page() {
  return <UseCasesPage locale="en" />;
}
