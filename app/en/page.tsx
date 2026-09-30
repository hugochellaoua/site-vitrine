import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { site } from "@/lib/content.en";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
  openGraph: { title: site.title, description: site.description, url: "/en", locale: "en_GB" },
};

export default function Page() {
  return <HomePage locale="en" />;
}
