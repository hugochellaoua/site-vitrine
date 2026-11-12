import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { dict, type Locale } from "@/lib/i18n";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { CompanyLogo } from "@/components/ui/company-logos";

const STEP = 0.05;
// Le titre s'affiche presque immédiatement. Il attendait auparavant la fin du
// lever de rideau (1,05 s) : or c'est lui que Google chronomètre pour juger la
// vitesse perçue de la page, et un visiteur qui hésite part avant.
const START = 0.28;

// Les meilleurs talents en violet et en italique : la même police, penchée,
// pour distinguer la fin du titre sans ajouter de caractère.
// Le titre en deux tons, comme toute la page : le début en clair, la fin en
// gris. L'orange de Helpify ne reste que dans le logo.
const TON = { warm: "text-ink", iris: "text-[#8e8f96]" } as const;

/**
 * Le hero.
 *
 * Son apparition est confiée à des animations CSS, pas à une bibliothèque :
 * c'est le titre le plus important de la page, et il doit se lire même si le
 * JavaScript tarde, échoue, ou si l'onglet démarre en arrière-plan — auquel cas
 * une boucle d'animation pilotée par script resterait figée sur son état
 * initial, donc invisible. Avec `animation-fill-mode: backwards`, l'état final
 * est toujours atteint, et la préférence « mouvement réduit » l'affiche d'emblée.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero, experts } = dict(locale);
  // Le titre est découpé mot à mot pour être levé en cascade ; le découpage
  // dépend donc de la langue et vit dans le composant, plus au chargement.
  const words = hero.segments.flatMap((s) => s.texte.split(" ").map((mot) => ({ mot, ton: s.ton })));
  return (
    <section
      id="top"
      // La seule grande zone sombre de l'accueil : l'indigo du site, éclairé
      // par le bas d'une lueur bleue puis orange. L'aperçu du produit vient
      // ensuite chevaucher son bas.
      className="sombre relative flex flex-col items-center overflow-hidden px-6 pb-64 pt-40 sm:pb-72 sm:pt-48"
      style={{
        background: "radial-gradient(70% 90% at 72% 10%, #2a2d35 0%, #16171b 48%, #0b0b0c 100%)",
      }}
    >

      <h1
        aria-label={hero.title}
        className="max-w-6xl text-center font-display text-[clamp(36px,5.8vw,80px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink"
      >
        <span aria-hidden="true">
          {words.map(({ mot, ton }, i) => (
            <span
              key={`${mot}-${i}`}
              className={`hero-rise mr-[0.24em] inline-block ${ton ? TON[ton] : ""}`}
              style={{ animationDelay: `${START + i * STEP}s` }}
            >
              {mot}
            </span>
          ))}
        </span>
      </h1>

      <p
        className="hero-rise mt-9 max-w-xl text-balance text-center text-[16.5px] leading-relaxed text-muted sm:text-[18px]"
        style={{ animationDelay: `${START + words.length * STEP + 0.25}s` }}
      >
        {hero.subtitle}
      </p>

      <div
        className="hero-rise mt-11 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: `${START + words.length * STEP + 0.4}s` }}
      >
        <Magnetic>
          <Link
            href={hero.cta.href}
            className="group inline-flex items-center gap-2.5 rounded-[4px] bg-accent px-8 py-4 text-[15px] font-semibold text-white transition-shadow duration-300"
          >
            {hero.cta.label}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <SecondaryCta locale={locale} />
      </div>

      {/* Les entreprises où exercent nos experts, en rangée encadrée. */}
      <div className="hero-rise mt-14 flex flex-col items-center gap-3" style={{ animationDelay: `${START + words.length * STEP + 0.55}s` }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{experts.logosLabel}</p>
        <div className="flex border border-hairline">
          <span className="flex h-16 items-center border-r border-hairline px-8">
            <CompanyLogo logo="loreal" className="!w-[118px] text-ink" />
          </span>
          <span className="flex h-16 items-center px-8">
            <CompanyLogo logo="reflection" className="!w-[150px] text-ink" />
          </span>
        </div>
      </div>

    </section>
  );
}
