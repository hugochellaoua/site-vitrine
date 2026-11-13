import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/section-title";
import type { LegalDoc } from "@/lib/legal";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Gabarit commun aux pages juridiques.
 *
 * Ces pages se lisent, elles ne se contemplent pas : mesure de ligne courte,
 * hiérarchie de titres nette, aucun effet. Le décor du site reste présent
 * (ciel, menu, pied de page) pour qu'on sache qu'on n'a pas quitté Helpify.
 */
/**
 * Remet les niveaux de titre à plat, sans trou.
 *
 * Les documents viennent de fichiers Word dont les niveaux sont ceux de leur
 * auteur : la notice IA et les CGU n'utilisent que des `h3`, et la politique de
 * confidentialité passe par endroits du `h2` au `h4`. Tels quels, ils produisent
 * une hiérarchie trouée — un lecteur d'écran annonce des sections imbriquées
 * qui ne le sont pas, et les moteurs lisent mal le plan du document.
 *
 * On parcourt donc les blocs dans l'ordre en conservant la structure *relative*
 * voulue par l'auteur : un titre plus profond que le précédent descend d'un
 * cran, jamais de deux ; un titre moins profond remonte au niveau de l'ancêtre
 * qui lui correspond. Le premier niveau part de `h2`, juste sous le `h1` de la
 * page.
 */
function normaliserNiveaux(blocs: LegalDoc["blocks"]) {
  const pile: { source: number; rendu: number }[] = [];
  return blocs.map((b) => {
    const source = /^h([2-6])$/.exec(b.k)?.[1];
    if (!source) return b;
    const n = Number(source);
    while (pile.length && pile[pile.length - 1].source >= n) pile.pop();
    const rendu = Math.min(pile.length ? pile[pile.length - 1].rendu + 1 : 2, 4);
    pile.push({ source: n, rendu });
    return { ...b, k: `h${rendu}` };
  });
}

export function LegalPage({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const { ui } = dict(locale);
  const blocs = normaliserNiveaux(doc.blocks);
  return (
    <>
      <Galaxy />
      <Navbar locale={locale} />
      <main className="relative z-10 px-6 pb-24 pt-36 sm:pt-44">
        <article className="mx-auto max-w-[68ch]">
          <Badge>Informations légales</Badge>
          <h1 className="mt-6 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            {doc.title}
          </h1>
          {doc.updated && <p className="mt-4 text-[13px] text-faint">{doc.updated}</p>}

          <div className="mt-12 flex flex-col">
            {blocs.map((b, i) => {
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
            {ui.backHome}
          </Link>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
