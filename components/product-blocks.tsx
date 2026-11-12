import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { ProductFilm } from "@/components/products/films";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Les quatre produits, une grande carte chacun : le texte sur fond beige d'un
 * côté, la plateforme en action sur fond sombre de l'autre, et l'alternance
 * gauche/droite d'une carte à l'autre. Chaque bloc porte le chiffre du bénéfice auquel le produit
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

        <div className="mt-14 flex flex-col gap-4">
          {products.items.map((product, i) => {
            const b = synthesis.items[BENEFICE[product.id] ?? 0];
            const inverse = i % 2 === 1;
            return (
              <Reveal key={product.id} className={`grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[6px] lg:grid-cols-2 ${inverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="flex flex-col bg-chip p-8 sm:p-11">
                  <span className="self-start bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-void">{product.name}</span>
                  <h3 className="mt-5 max-w-[22ch] text-balance font-display text-[clamp(26px,2.8vw,36px)] leading-[1.08] text-ink">
                    {product.headline}
                  </h3>
                  {"tag" in product && product.tag && (
                    <p className="mt-4 inline-flex items-center gap-2 font-display text-[15px] font-medium text-ink">
                      <span className="h-1.5 w-1.5 bg-ink" />
                      {product.tag}
                    </p>
                  )}
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">{product.body}</p>
                  <div className="mt-auto flex items-baseline gap-3 pt-10">
                    <span className="font-display text-[52px] font-light leading-none tracking-[-0.05em] text-ink">
                      {b.value}
                      <span className="ml-1 text-[26px]">{b.unit}</span>
                    </span>
                    <span className="max-w-[24ch] text-[13px] leading-snug text-muted">{b.label}</span>
                  </div>
                  <Link
                    href={`${base}#${product.id}`}
                    className="group mt-7 inline-flex items-center gap-2 self-start rounded-[4px] border border-hairline-strong bg-white px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-ink/40"
                  >
                    {ui.discover} {product.name}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                <div
                  className="flex min-h-[420px] items-center justify-center p-6 sm:p-10"
                  style={{ background: "#fbfbfa" }}
                >
                  <div className="w-full min-w-0">
                    <ProductFilm visual={product.visual} locale={locale} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
