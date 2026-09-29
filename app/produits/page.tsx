import type { Metadata } from "next";
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
import { VISUALS } from "@/components/products/visuals";
import { products, hero } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  // Le titre vise les termes réellement tapés ; la page, elle, garde la voix
  // de l'entreprise. Les deux n'ont pas à dire la même chose.
  title: "Produits — Préqualification, matching et réponses candidats",
  description:
    "Quatre produits intégrés à votre ATS : préqualification des candidats, matching au-delà du CV, 360 Matching sur tout le vivier, et Talent Ask qui répond 24h/24.",
  alternates: { canonical: "/produits" },
  openGraph: {
    title: "Quatre produits. Une seule conversation.",
    description:
      "Préqualifier, matcher, révéler les synergies, répondre aux candidats : les quatre produits Helpify, intégrés à votre ATS.",
    url: "/produits",
  },
};

/**
 * Données structurées de la page.
 *
 * Une liste ordonnée de quatre produits, décrits avec les mots exacts de la
 * page. C'est ce que lisent les moteurs de réponse quand on leur demande « que
 * fait Helpify » — mieux vaut qu'ils citent la bonne formulation.
 */
function ProductsJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: products.title,
    itemListElement: products.items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: `Helpify ${p.name}`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Recrutement",
        operatingSystem: "Web",
        description: p.body,
        url: `${siteUrl}/produits#${p.id}`,
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

export default function ProduitsPage() {
  return (
    <>
      <ProductsJsonLd />
      <StarTexture />
      <Galaxy />
      <CursorLight />
      <Navbar />

      <main className="relative z-10">
        {/* ── Ouverture ────────────────────────────────────────────────── */}
        <section className="relative px-6 pb-16 pt-36 sm:pt-44">
          <div
            className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[60vh] w-[min(1000px,92vw)] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(29,80,254,0.28) 0%, rgba(29,80,254,0.07) 46%, transparent 74%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge>{products.eyebrow}</Badge>
            <SectionTitle
              as="h1"
              title={products.title}
              emphasis={products.emphasis}
              className="mt-6 !max-w-[22ch] !text-[clamp(32px,5vw,58px)]"
            />
            {products.intro.map((p, i) => (
              <p
                key={i}
                className="mx-auto mt-5 max-w-[56ch] text-balance text-[15.5px] leading-relaxed text-muted"
              >
                {p}
              </p>
            ))}

            {/* Les quatre verbes du texte source, rendus comme un parcours. */}
            <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3">
              {products.verbs.map((verb, i) => (
                <li key={verb} className="flex items-center gap-2.5">
                  <a
                    href={`#${products.items[i].id}`}
                    className="rounded-full border border-accent/35 bg-chip px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent/70"
                  >
                    {verb}
                  </a>
                  {i < products.verbs.length - 1 && (
                    <span className="text-faint" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-[46ch] text-balance text-[15px] leading-relaxed text-ink">
              {products.outro}
            </p>
          </div>
        </section>

        {/* ── Les quatre produits ──────────────────────────────────────── */}
        {products.items.map((product, i) => {
          const Visual = VISUALS[product.visual];
          // On alterne le côté du visuel : l'œil repart à gauche à chaque
          // produit, ce qui marque la rupture entre deux blocs sans trait.
          const reversed = i % 2 === 1;

          return (
            <section
              key={product.id}
              id={product.id}
              className="relative scroll-mt-28 border-t border-hairline px-6 py-24"
            >
              <div
                className={`mx-auto flex max-w-5xl flex-col items-center gap-12 lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Le texte précède le visuel dans le document, et non
                    l'inverse : sur un écran étroit les deux colonnes s'empilent,
                    et l'illustration arrivait alors avant qu'on sache de quel
                    produit elle parle. On lit maintenant le nom, la promesse,
                    l'explication — puis l'image qui les représente. Côte à côte,
                    l'alternance gauche/droite est inchangée. */}
                <Reveal className="w-full lg:w-1/2">
                  {/* Le nom du produit porte la page : il doit s'imposer avant
                      le titre, pas se cacher dans une pastille. L'orange le
                      détache du bleu employé partout ailleurs. */}
                  <p className="font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-none tracking-[-0.02em] text-warm">
                    {product.name}
                  </p>

                  <h2 className="mt-4 max-w-[20ch] text-balance font-display text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
                    {product.headline}
                  </h2>

                  <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-muted">{product.body}</p>

                  <Link
                    href={hero.cta.href}
                    className="group mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent-light transition-colors hover:text-ink"
                  >
                    Voir {product.name} en démo
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Reveal>

                <Reveal delay={0.1} className="flex w-full justify-center lg:w-1/2">
                  <Visual />
                </Reveal>
              </div>
            </section>
          );
        })}

        {/* ── Conclusion ───────────────────────────────────────────────── */}
        <section className="relative border-t border-hairline px-6 py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <SectionTitle title={products.cta.title} emphasis={products.cta.emphasis} />
            <p className="mt-5 text-[15px] text-muted">{products.cta.sub}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={hero.cta.href}
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-shadow duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)]"
              >
                {hero.cta.label}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <SecondaryCta />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
