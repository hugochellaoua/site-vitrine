import { MotCandidat } from "@/components/ui/mot-candidat";
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
  const { synthesis } = dict(locale);
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{synthesis.eyebrow}</Badge>
          <SectionTitle title={synthesis.title} emphasis={synthesis.emphasis} className="mt-6" />
          <p className="mx-auto mt-5 max-w-[52ch] text-balance text-[16.5px] leading-relaxed text-muted">{synthesis.sub}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {synthesis.items.map((item, i) => {
            return (
            <Reveal
              key={item.n}
              delay={i * 0.12}
              y={26}
              className="border-t border-hairline pb-4 pt-6"
            >
              <h3 className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">
                <MotCandidat texte={item.title} />
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
