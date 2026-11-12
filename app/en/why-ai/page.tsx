import type { Metadata } from "next";
import { PourquoiIAPage } from "@/components/pages/pourquoi-ia";

export const metadata: Metadata = {
  title: "Why use AI in recruitment?",
  description:
    "What AI changes for your candidates and recruiters, and answers to the most common objections: human decision, bias, data, AI-written CVs.",
  alternates: { canonical: "/en/why-ai", languages: { fr: "/pourquoi-l-ia", en: "/en/why-ai" } },
  openGraph: {
    title: "Why use AI in recruitment?",
    description: "The situation today, what Helpify changes on both sides, and the questions we are asked.",
    url: "/en/why-ai",
    locale: "en_GB",
  },
};

export default function Page() {
  return <PourquoiIAPage locale="en" />;
}
