import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/section-title";
import type { LegalDoc } from "@/lib/legal";

/**
 * Gabarit commun aux pages juridiques.
 *
 * Ces pages se lisent, elles ne se contemplent pas : mesure de ligne courte,
 * hiérarchie de titres nette, aucun effet. Le décor du site reste présent
 * (ciel, menu, pied de page) pour qu'on sache qu'on n'a pas quitté Helpify.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Galaxy />
      <Navbar />
      <main className="relative z-10 px-6 pb-24 pt-36 sm:pt-44">
        <article className="mx-auto max-w-[68ch]">
          <Badge>Informations légales</Badge>
          <h1 className="mt-6 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            {doc.title}
          </h1>
          {doc.updated && <p className="mt-4 text-[13px] text-faint">{doc.updated}</p>}

          <div className="mt-12 flex flex-col">
            {doc.blocks.map((b, i) => {
              if (b.k === "h2")
                return (
                  <h2
                    key={i}
                    className="mt-12 border-t border-hairline pt-8 font-display text-[21px] font-bold tracking-[-0.02em] text-ink first:mt-0 first:border-0 first:pt-0"
                  >
                    {b.t}
                  </h2>
                );
              if (b.k === "h3")
                return (
                  <h3 key={i} className="mt-9 font-display text-[17px] font-bold text-ink">
                    {b.t}
                  </h3>
                );
              if (b.k === "h4")
                return (
                  <h4 key={i} className="mt-7 text-[15px] font-semibold text-accent-light">
                    {b.t}
                  </h4>
                );
              if (b.k === "li")
                return (
                  <p key={i} className="mt-2.5 flex gap-3 pl-1 text-[15px] leading-relaxed text-muted">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-light" aria-hidden="true" />
                    <span>{b.t}</span>
                  </p>
                );
              return (
                <p key={i} className="mt-4 text-[15px] leading-relaxed text-muted">
                  {b.t}
                </p>
              );
            })}
          </div>

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
