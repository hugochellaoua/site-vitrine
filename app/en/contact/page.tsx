import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { contact } from "@/lib/content.en";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.sub,
  alternates: { canonical: "/en/contact", languages: { fr: "/contact", en: "/en/contact" } },
  openGraph: { url: "/en/contact", locale: "en_GB" },
};

export default function Page() {
  return <ContactPage locale="en" />;
}
