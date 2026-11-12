import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Ce que le process produit, en quatre chiffres.
 *
 * La mise en page reprend le plan « Résultats mesurés » du produit : une carte
 * par bénéfice, arête supérieure allumée, le chiffre en très grand et son unité
 * en petit juste après. Le chiffre porte l'argument ; le texte ne fait que le
 * nommer. C'est ce qui distingue une preuve d'un paragraphe.
 */

export function Synthesis({ locale }: { locale: Locale }) {
  const { synthesis, hero } = dict(locale);
  return (
    <section className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <Badge>{synthesis.eyebrow}</Badge>
          <SectionTitle title={synthesis.title} emphasis={synthesis.emphasis} className="!mx-0 mt-6 !max-w-[14ch] text-left" />
          <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-muted">{synthesis.sub}</p>
          <Link
            href={hero.cta.href}
            className="mt-8 inline-flex rounded-[4px] bg-accent px-5 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {hero.cta.label}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {synthesis.items.map((item, i) => {
            return (
            <Reveal
              key={item.n}
              delay={i * 0.12}
              y={26}
              className="border-t border-hairline pb-10 pt-6"
            >
              <h3 className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">
                {item.title}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="font-display text-[clamp(52px,5.6vw,76px)] font-light leading-none tracking-[-0.05em] text-ink"
                >
                  {item.value}
                </span>
                <span
                  className="font-display text-[28px] font-light leading-none text-ink"
                >
                  {item.unit}
                </span>
              </div>

              <p className="mt-4 text-[13.5px] leading-snug text-muted">{item.label}</p>
              <p className="mt-5 border-t border-hairline pt-4 text-[10.5px] uppercase tracking-[0.14em] text-faint">
                {item.steps}
              </p>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
