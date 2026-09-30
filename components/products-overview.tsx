import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";

/**
 * Les quatre produits, en aperçu sur l'accueil.
 *
 * Placée avant les bénéfices chiffrés : on ne juge pas un résultat sans savoir
 * de quoi il découle. Chaque carte mène à son ancre sur la page produits, pour
 * que le visiteur atterrisse directement sur celui qui l'intéresse.
 *
 * Le nom du produit est traité comme un titre à part entière — c'est ce qu'on
 * doit retenir, et c'est la seule information qu'un lecteur pressé lira.
 */
export function ProductsOverview({ locale }: { locale: Locale }) {
  const { products, ui } = dict(locale);
  return (
    <section id="produits" className="relative scroll-mt-28 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{products.home.eyebrow}</Badge>
          <SectionTitle title={products.home.title} emphasis={products.home.emphasis} className="mt-6" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {products.items.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <Link
                href={`/produits#${product.id}`}
                className="lit-card group flex h-full flex-col px-7 py-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-display text-[clamp(20px,2.2vw,26px)] font-bold leading-none tracking-[-0.02em] text-warm">
                  {product.name}
                </p>
                <h3 className="mt-4 font-display text-[17.5px] font-bold leading-snug text-ink">
                  {product.headline}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{product.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent-light">
                  {ui.learnMore}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/produits"
            className="group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-white/[0.04] px-7 py-4 text-[15px] font-semibold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]"
          >
            {products.home.link}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
