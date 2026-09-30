import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
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
 * Données structurées de la page.
 *
 * Une liste ordonnée des neuf cas, décrits avec les mots exacts de la page :
 * le problème sert de nom, la réponse de description. C'est ce que lira un
 * moteur de réponse à qui l'on demande « comment trier trop de candidatures ».
 */
function UseCasesJsonLd({ locale }: { locale: Locale }) {
  const { useCases } = dict(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: useCases.title,
    description: useCases.intro,
    itemListElement: useCases.items.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.menu,
      item: {
        "@type": "CreativeWork",
        name: u.problem,
        abstract: u.promise,
        text: u.answer.join(" "),
        url: `${siteUrl}/cas-d-usage#${u.id}`,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function UseCasesPage({ locale }: { locale: Locale }) {
  const { hero, useCases, ui } = dict(locale);
  return (
    <>
      <UseCasesJsonLd locale={locale} />
      <StarTexture />
      <Galaxy />
      <CursorLight />
      <Navbar locale={locale} />

      <main className="relative z-10">
        {/* ── Ouverture ────────────────────────────────────────────────── */}
        <section className="relative px-6 pb-14 pt-36 sm:pt-44">
          <div
            className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[60vh] w-[min(1000px,92vw)] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(29,80,254,0.28) 0%, rgba(29,80,254,0.07) 46%, transparent 74%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge>{useCases.eyebrow}</Badge>
            <SectionTitle
              as="h1"
              title={useCases.title}
              emphasis={useCases.emphasis}
              className="mt-6 !max-w-[24ch] !text-[clamp(30px,4.6vw,54px)]"
            />
            <p className="mx-auto mt-5 max-w-[54ch] text-balance text-[15.5px] leading-relaxed text-muted">
              {useCases.intro}
            </p>
          </div>
        </section>

        {/* ── Sommaire : se reconnaître en un coup d'œil ───────────────── */}
        {/* Neuf problèmes posés côte à côte, chacun suivi de sa réponse en une
            ligne. Le visiteur n'a pas à lire la page entière pour trouver sa
            situation : il la repère ici, puis y saute. */}
        <section className="relative px-6 pb-24">
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.items.map((u, i) => (
              <li key={u.id} className="flex">
                <Reveal delay={i * 0.05} className="flex w-full">
                  <Link
                    href={`#${u.id}`}
                    className="card-surface group flex w-full flex-col rounded-2xl px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="font-display text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-ink">
                      {u.menu}
                    </span>
                    <span className="mt-2.5 text-[13px] leading-snug text-muted">
                      <span
                        className={u.tone === "warm" ? "text-warm" : "text-accent-light"}
                        aria-hidden="true"
                      >
                        →{" "}
                      </span>
                      {u.promise}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Les neuf cas, en détail ──────────────────────────────────── */}
        {useCases.items.map((u, i) => {
          const warm = u.tone === "warm";
          return (
            <section
              key={u.id}
              id={u.id}
              className="relative scroll-mt-28 border-t border-hairline px-6 py-20 sm:py-24"
            >
              <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
                {/* Le problème, dans les mots du recruteur. Il passe avant la
                    réponse — on ne vend rien à quelqu'un qui ne s'est pas
                    d'abord reconnu. */}
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-[13px] font-bold tabular-nums text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
                    <Badge tone={u.tone}>{u.menu}</Badge>
                  </div>

                  <blockquote
                    className={`lit-card mt-6 px-7 py-7 ${warm ? "lit-card--warm" : ""}`}
                  >
                    <span
                      className={`block font-display text-[40px] font-bold leading-[0.6] ${
                        warm ? "text-warm/60" : "text-accent-light/60"
                      }`}
                      aria-hidden="true"
                    >
                      &laquo;
                    </span>
                    <p className="mt-3 text-balance font-display text-[clamp(19px,2.1vw,23px)] font-bold leading-snug tracking-[-0.02em] text-ink">
                      {u.problem}
                    </p>
                  </blockquote>
                </Reveal>

                {/* La réponse. */}
                <Reveal delay={0.1}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                    {ui.helpifyAnswer}
                  </p>
                  <h2
                    className={`mt-3 max-w-[22ch] text-balance font-display text-[clamp(23px,2.9vw,32px)] font-bold leading-[1.12] tracking-[-0.02em] ${
                      warm ? "text-warm" : "text-ink"
                    }`}
                  >
                    {u.promise}
                  </h2>

                  {u.answer.map((p, j) => (
                    <p key={j} className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}

                  {u.benefits && (
                    <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {u.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <Check
                            size={15}
                            className={`mt-0.5 shrink-0 ${warm ? "text-warm" : "text-accent-light"}`}
                            aria-hidden="true"
                          />
                          <span className="text-[14px] leading-snug text-ink">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {u.keyMessage && (
                    // Le message clé : la phrase que l'on veut voir retenue,
                    // détachée du paragraphe pour qu'elle se lise seule.
                    <p
                      className={`mt-7 border-l-2 pl-5 font-display text-[clamp(16px,1.9vw,19px)] font-bold leading-snug tracking-[-0.01em] ${
                        warm ? "border-warm text-warm" : "border-accent text-accent-light"
                      }`}
                    >
                      {u.keyMessage}
                    </p>
                  )}

                  {u.nuance && (
                    <p className="mt-7 max-w-[52ch] border-t border-hairline pt-4 text-[13.5px] leading-relaxed text-faint">
                      {u.nuance}
                    </p>
                  )}
                </Reveal>
              </div>
            </section>
          );
        })}

        {/* ── Conclusion ───────────────────────────────────────────────── */}
        <section className="relative border-t border-hairline px-6 py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <SectionTitle title={useCases.cta.title} emphasis={useCases.cta.emphasis} />
            <p className="mt-5 text-[15px] text-muted">{useCases.cta.sub}</p>
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
