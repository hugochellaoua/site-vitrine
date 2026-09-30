import type { Metadata } from "next";
import { LegalNoticePage } from "@/components/pages/legal-notice";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal information about the publisher and the host of the Helpify website.",
  alternates: { canonical: "/en/legal-notice", languages: { fr: "/mentions-legales", en: "/en/legal-notice" } },
  openGraph: { url: "/en/legal-notice", locale: "en_GB" },
};

export default function Page() {
  return <LegalNoticePage locale="en" />;
}
