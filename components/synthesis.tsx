import { MotCandidat } from "@/components/ui/mot-candidat";
import { dict, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Ce que le process produit, en trois chiffres.
 *
 * La mise en page reprend le plan « Résultats mesurés » du produit : une carte
 * par bénéfice, arête supérieure allumée, le chiffre en très grand et son unité
 * en petit juste après. Le chiffre porte l'argument ; le texte ne fait que le
 * nommer. C'est ce qui distingue une preuve d'un paragraphe.
 */
/**
 * Une teinte par chiffre, dans l'ordre des trois voix du site : le produit, le
 * candidat, la méthode — ces deux dernières partageant le violet. Trois cartes identiques ne se distingueraient que par
 * leur contenu ; ainsi, on retient aussi laquelle parle de quoi.
 */
const TEINTES = [
  { arete: "", chiffre: "text-accent-light", unite: "text-accent-light/70" },
  { arete: "lit-card--iris", chiffre: "text-iris", unite: "text-iris/70" },
  { arete: "lit-card--iris", chiffre: "text-iris", unite: "text-iris/70" },
] as const;

export function Synthesis({ locale }: { locale: Locale }) {
  const { synthesis } = dict(locale);
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{synthesis.eyebrow}</Badge>
          <SectionTitle title={synthesis.title} emphasis={synthesis.emphasis} className="mt-6" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {synthesis.items.map((item, i) => {
            const teinte = TEINTES[i % TEINTES.length];
            return (
            <Reveal
              key={item.n}
              delay={i * 0.12}
              y={26}
              className={`lit-card px-7 py-8 ${teinte.arete}`}
            >
              <h3 className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink">
                <MotCandidat texte={item.title} />
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`font-display text-[clamp(44px,5vw,64px)] font-bold leading-none tracking-[-0.04em] ${teinte.chiffre}`}
                >
                  {item.value}
                </span>
                <span
                  className={`font-display text-[22px] font-bold leading-none ${teinte.unite}`}
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
