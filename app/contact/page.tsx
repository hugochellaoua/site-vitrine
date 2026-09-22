import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.sub,
};

/**
 * Page de contact — destination de tous les « En savoir plus ».
 *
 * Même décor que l'accueil (ciel, menu, pied de page) pour qu'on ait le
 * sentiment de rester sur le site, mais sans lever de rideau ni récit : on
 * vient ici pour écrire, pas pour découvrir.
 */
export default function ContactPage() {
  return (
    <>
      <Galaxy />
      <Navbar />
      <main className="relative z-10 px-6 pb-24 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[60vh] w-[min(900px,92vw)] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(29,80,254,0.26) 0%, rgba(29,80,254,0.06) 48%, transparent 74%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <Badge>{contact.eyebrow}</Badge>
            <SectionTitle as="h1" title={contact.title} emphasis={contact.emphasis} className="mt-6" />
            <p className="mx-auto mt-5 max-w-[46ch] text-balance text-[15px] leading-relaxed text-muted">
              {contact.sub}
            </p>
          </div>

          <div className="lit-card mt-12 p-6 sm:p-10">
            <ContactForm />
          </div>

          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[14px] text-muted">
            {contact.alt.lead}
            <Link
              href={contact.alt.href}
              className="group inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline"
            >
              {contact.alt.label}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
