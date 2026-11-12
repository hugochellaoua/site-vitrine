import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Pourquoi utiliser l'IA dans le recrutement : une page courte, lisible d'un
 * trait. Le constat d'abord (le candidat sans espace pour être écouté, le
 * recruteur sans temps pour l'écouter), puis ce que Helpify change des deux
 * côtés, puis les objections les plus fréquentes, et la source des chiffres.
 */
export function PourquoiIAPage({ locale }: { locale: Locale }) {
  const { pourquoiIA: p } = dict(locale);
  return (
    <>
      <Navbar locale={locale} />
      <main className="relative z-10">
        <section className="px-6 pb-16 pt-40 sm:px-10 sm:pt-48 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <Badge>{p.eyebrow}</Badge>
            <SectionTitle as="h1" title={p.title} emphasis={p.emphasis} className="!mx-0 mt-6 !max-w-[18ch] text-left !text-[clamp(34px,5vw,62px)]" />
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-muted">{p.intro}</p>
          </div>
        </section>

        {/* Le constat. */}
        <section className="sombre bg-void px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <h2 className="max-w-[20ch] font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{p.constat.titre}</h2>
              {p.constat.texte.map((t) => (
                <p key={t} className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">
                  {t}
                </p>
              ))}
            </div>
            <ul className="flex flex-col">
              {p.constat.points.map((c) => (
                <li key={c} className="border-t border-hairline py-6 font-display text-[clamp(19px,2vw,24px)] leading-snug tracking-[-0.02em] text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ce que Helpify change, des deux côtés. */}
        <section className="px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-[24ch] font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{p.change.titre}</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {p.change.colonnes.map((col) => (
                <Reveal key={col.titre} className="rounded-[6px] bg-chip p-8">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">{col.titre}</p>
                  <ul className="mt-6 flex flex-col gap-4">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[16px] leading-snug text-ink">
                        <Check size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ce que veulent les candidats, et ce que Helpify y répond. */}
        <section className="border-t border-hairline px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-[24ch] font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{p.attentes.titre}</h2>
            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              {p.attentes.items.map((a) => (
                <li key={a.attente} className="border-t border-hairline py-6">
                  <p className="font-display text-[19px] leading-snug tracking-[-0.02em] text-ink">{a.attente}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{a.reponse}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Les objections. */}
        <section className="border-t border-hairline px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <h2 className="max-w-[14ch] font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{p.objections.titre}</h2>
            <dl>
              {p.objections.items.map((o) => (
                <div key={o.q} className="border-t border-hairline py-7">
                  <dt className="font-display text-[20px] leading-snug tracking-[-0.02em] text-ink">{o.q}</dt>
                  <dd className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-muted">{o.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="sombre bg-void px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{p.cta.titre}</h2>
            <Link href={p.cta.href} className="group inline-flex items-center gap-2 rounded-[4px] bg-accent px-6 py-3.5 text-[15px] font-medium text-white">
              {p.cta.label}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
