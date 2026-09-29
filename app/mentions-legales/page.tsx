import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/section-title";
import { legalEntity, legalEntityIntro } from "@/lib/legal-entity";
import { links } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales relatives à l'éditeur et à l'hébergeur du site Helpify.",
  alternates: { canonical: "/mentions-legales" },
};

export default function Page() {
  return (
    <>
      <Galaxy />
      <Navbar />
      <main className="relative z-10 px-6 pb-24 pt-36 sm:pt-44">
        <article className="mx-auto max-w-[68ch]">
          <Badge>Informations légales</Badge>
          <h1 className="mt-6 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Mentions légales
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">{legalEntityIntro}</p>

          <dl className="mt-12 divide-y divide-hairline border-y border-hairline">
            {legalEntity.map((f) => (
              <div key={f.label} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                <dt className="text-[13.5px] font-semibold text-ink">{f.label}</dt>
                <dd className="text-[15px] leading-relaxed text-muted">
                  {f.value ?? (
                    <span className="inline-flex flex-col gap-0.5 rounded-lg border border-error/40 bg-error/10 px-3 py-2 text-[13px] text-[#ffc2c2]">
                      <span className="font-semibold">À compléter avant la mise en ligne</span>
                      {f.hint && <span className="text-[12px] opacity-80">{f.hint}</span>}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[15px] leading-relaxed text-muted">
            Consultez également la{" "}
            <Link href={links.privacy} className="font-semibold text-ink underline underline-offset-4">
              politique de confidentialité
            </Link>{" "}
            et la{" "}
            <Link href={links.noticeIA} className="font-semibold text-ink underline underline-offset-4">
              notice d&apos;utilisation de l&apos;IA
            </Link>
            .
          </p>

          <Link
            href="/"
            className="mt-16 inline-flex items-center gap-2 text-[14px] font-semibold text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} />
            Retour à l&apos;accueil
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
