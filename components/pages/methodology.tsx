import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { StarTexture } from "@/components/star-texture";
import { CursorLight } from "@/components/cursor-light";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { Reveal } from "@/components/ui/reveal";
import { dict, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";


/**
 * Rend les `**…**` du contenu en clair sur le fond sombre.
 *
 * Le texte source les emploie pour marquer ce qui doit ressortir à la lecture.
 * On s'en tient à `<strong>` : la mise en avant est sémantique, pas seulement
 * visuelle, et un lecteur d'écran l'annonce.
 */
function Riche({ texte }: { texte: string }) {
  return (
    <>
      {texte.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Les trois étapes, décrites avec les mots de la page. */
function MethodJsonLd({ locale }: { locale: Locale }) {
  const { methodology } = dict(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: methodology.title,
    description: methodology.intro.join(" ").replace(/\*\*/g, ""),
    step: methodology.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body.join(" ").replace(/\*\*/g, ""),
      url: `${siteUrl}/methodologie#etape-${s.n}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const TEINTE_POIDS = [
  "border-warm/45 bg-warm-soft text-warm-light",
  "border-accent/45 bg-accent-soft text-accent-light",
  "border-hairline-strong bg-white/[0.05] text-muted",
];

export function MethodologyPage({ locale }: { locale: Locale }) {
  const { hero, methodology } = dict(locale);
  return (
    <>
      <MethodJsonLd locale={locale} />
      <StarTexture />
      <Galaxy />
      <CursorLight />
      <Navbar locale={locale} />

      <main className="relative z-10">
        {/* ── Ouverture ────────────────────────────────────────────────── */}
        <section className="relative px-6 pb-20 pt-36 sm:pt-44">
          <div
            className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[60vh] w-[min(1000px,92vw)] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(29,80,254,0.28) 0%, rgba(29,80,254,0.07) 46%, transparent 74%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge>{methodology.eyebrow}</Badge>
            <SectionTitle
              as="h1"
              title={methodology.title}
              emphasis={methodology.emphasis}
              className="mt-6 !max-w-[20ch] !text-[clamp(30px,4.6vw,54px)]"
            />
            {/* La première phrase porte seule : elle est courte et tranchante,
                on lui laisse sa ligne et un corps plus grand que la suivante. */}
            <p className="mt-8 font-display text-[clamp(17px,2.2vw,21px)] font-bold tracking-[-0.01em] text-ink">
              {methodology.intro[0]}
            </p>
            <p className="mx-auto mt-3.5 max-w-[58ch] text-balance text-[15.5px] leading-relaxed text-muted">
              <Riche texte={methodology.intro[1]} />
            </p>
          </div>
        </section>

        {/* ── Les trois étapes ─────────────────────────────────────────── */}
        {/* Une colonne, un filet qui relie les pastilles : le lecteur voit
            qu'il s'agit d'une suite, pas de trois idées juxtaposées. */}
        <section className="relative border-t border-hairline px-6 py-20 sm:py-24">
          <ol className="mx-auto flex max-w-2xl flex-col">
            {methodology.steps.map((step, i) => {
              const dernier = i === methodology.steps.length - 1;
              return (
                <li key={step.n} id={`etape-${step.n}`} className="scroll-mt-28">
                  <Reveal delay={i * 0.08} className="flex gap-5 sm:gap-8">
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft font-display text-[14px] font-bold tabular-nums text-accent-light">
                        {step.n}
                      </span>
                      {!dernier && (
                        <span
                          className="mt-3 w-px flex-1 bg-gradient-to-b from-accent/35 to-transparent"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className={dernier ? "pb-0" : "pb-14"}>
                      <h2 className="font-display text-[clamp(21px,2.6vw,28px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                        {step.title}
                      </h2>
                      {step.body.map((p, j) => (
                        <p
                          key={j}
                          className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-muted"
                        >
                          <Riche texte={p} />
                        </p>
                      ))}

                      {"weights" in step && step.weights && (
                        <ul className="mt-5 flex flex-wrap gap-2.5">
                          {step.weights.map((w, k) => (
                            <li
                              key={w}
                              className={`rounded-full border px-4 py-2 text-[13px] font-semibold ${TEINTE_POIDS[k]}`}
                            >
                              {w}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── La chaîne, de bout en bout ───────────────────────────────── */}
        <section className="relative border-t border-hairline px-6 py-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(22px,2.8vw,30px)] font-bold tracking-[-0.02em] text-ink">
                {methodology.chain.title}
              </h2>
            </Reveal>

            {/* Les quatre maillons. La chaîne ne passe en ligne qu'à partir du
                moment où les quatre tiennent côte à côte : la laisser se replier
                abandonnait une flèche en bout de ligne et le dernier maillon
                seul en dessous. En dessous de cette largeur, elle descend — et
                la flèche descend avec elle. */}
            <Reveal delay={0.1} className="mt-10 w-full">
              <ol className="flex flex-col items-center justify-center gap-3 lg:flex-row">
                {methodology.chain.steps.map((s, i) => (
                  <li key={s} className="flex flex-col items-center gap-3 lg:flex-row">
                    <span className="rounded-full border border-accent/35 bg-chip px-5 py-2.5 text-[13.5px] font-semibold text-ink">
                      {s}
                    </span>
                    {i < methodology.chain.steps.length - 1 && (
                      <span className="rotate-90 text-accent-light lg:rotate-0" aria-hidden="true">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2} className="mt-14">
              <p className="text-[15.5px] text-muted">{methodology.chain.lead}</p>
              {/* La phrase de conclusion : c'est elle qu'on doit retenir en
                  quittant la page, donc elle est traitée comme un titre. */}
              <p className="mx-auto mt-3 max-w-[24ch] text-balance font-display text-[clamp(23px,3.4vw,38px)] font-bold leading-[1.12] tracking-[-0.02em] text-warm">
                {methodology.chain.punch}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Conclusion ───────────────────────────────────────────────── */}
        <section className="relative border-t border-hairline px-6 py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <SectionTitle title={methodology.cta.title} emphasis={methodology.cta.emphasis} />
            <p className="mt-5 text-[15px] text-muted">{methodology.cta.sub}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={hero.cta.href}
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-shadow duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)]"
              >
                {hero.cta.label}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <SecondaryCta locale={locale} />
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
