import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { ProductScene } from "@/components/products/scenes";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Les quatre produits, un bloc chacun : le texte d'un côté, l'illustration de
 * l'autre sur un fond pastel, et l'alternance gauche/droite d'un bloc à
 * l'autre. Chaque bloc porte le chiffre du bénéfice auquel le produit
 * contribue le plus, repris tel quel de la section des bénéfices.
 *
 * Textes et illustrations sont ceux de la page produits : l'accueil en donne
 * l'essentiel, la page produits le détail.
 */

/** Le bénéfice associé à chaque produit (index dans `synthesis.items`). */
const BENEFICE: Record<string, number> = {
  prequalification: 0,
  matching: 2,
  "360-matching": 3,
  "talent-ask": 1,
};
const FOND = ["bg-[#e9efff]", "bg-[#efeaff]", "bg-[#e9efff]", "bg-[#fff1e3]"];
const CHIFFRE = ["text-accent", "text-iris", "text-warm", "text-iris"];

export function ProductBlocks({ locale }: { locale: Locale }) {
  const { products, synthesis, ui } = dict(locale);
  const base = locale === "en" ? "/en/products" : "/produits";
  return (
    <section id="produits" className="relative scroll-mt-28 px-6 pb-12 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{products.home.eyebrow}</Badge>
          <SectionTitle title={products.home.title} emphasis={products.home.emphasis} className="mt-6" />
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-24">
          {products.items.map((product, i) => {
              const b = synthesis.items[BENEFICE[product.id] ?? 0];
            const inverse = i % 2 === 1;
            return (
              <div
                key={product.id}
                className={`flex flex-col items-center gap-10 lg:gap-16 ${inverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                <Reveal className="w-full lg:w-1/2">
                  <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-warm">{product.name}</p>
                  <h3 className="mt-3 max-w-[20ch] text-balance font-display text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
                    {product.headline}
                  </h3>
                  <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-muted">{product.body}</p>
                  <div className="mt-7 flex items-end gap-3">
                    <span className={`font-display text-[44px] font-bold leading-none tracking-[-0.04em] ${CHIFFRE[i % 4]}`}>
                      {b.value}
                      <span className="ml-0.5 text-[22px]">{b.unit}</span>
                    </span>
                    <span className="max-w-[22ch] pb-1 text-[13.5px] leading-snug text-muted">{b.label}</span>
                  </div>
                  <Link
                    href={`${base}#${product.id}`}
                    className="group mt-8 inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-white px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-accent/40"
                  >
                    {ui.discover} {product.name}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Reveal>
                <Reveal delay={0.1} className="w-full lg:w-1/2">
                  <div className={`flex min-h-[380px] items-center justify-center rounded-[28px] p-6 sm:p-10 ${FOND[i % 4]}`}>
                    <ProductScene visual={product.visual} locale={locale} />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
