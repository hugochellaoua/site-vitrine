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
      className="sombre relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-40 sm:px-10 lg:px-16"
      style={{
        background: "radial-gradient(70% 90% at 72% 10%, #2a2d35 0%, #16171b 48%, #0b0b0c 100%)",
      }}
    >
      {/* Un grain très fin, pour que le fond ne fasse pas aplat numérique. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "4px 4px" }}
        aria-hidden="true"
      />

      <h1
        aria-label={hero.title}
        className="max-w-5xl text-left font-display text-[clamp(38px,5.6vw,78px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink"
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
        className="hero-rise mt-7 max-w-xl text-left text-[16px] leading-relaxed text-muted sm:text-[17px]"
        style={{ animationDelay: `${START + words.length * STEP + 0.25}s` }}
      >
        {hero.subtitle}
      </p>

      <div
        className="hero-rise mt-9 flex flex-wrap items-center gap-3"
        style={{ animationDelay: `${START + words.length * STEP + 0.4}s` }}
      >
        <Magnetic>
          <Link
            href={hero.cta.href}
            className="group inline-flex items-center gap-2.5 rounded-[4px] bg-accent px-6 py-3.5 text-[14.5px] font-medium text-white transition-opacity duration-300 hover:opacity-90"
          >
            {hero.cta.label}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <SecondaryCta locale={locale} />
      </div>

      {/* Les entreprises où exercent nos experts, en rangée encadrée. */}
      <div className="hero-rise mt-14 flex flex-col items-start gap-3" style={{ animationDelay: `${START + words.length * STEP + 0.55}s` }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{experts.logosLabel}</p>
        <div className="flex border border-hairline">
          <span className="flex h-14 items-center border-r border-hairline px-5 sm:h-16 sm:px-8">
            <CompanyLogo logo="loreal" className="!w-[92px] text-ink sm:!w-[118px]" />
          </span>
          <span className="flex h-14 items-center px-5 sm:h-16 sm:px-8">
            <CompanyLogo logo="reflection" className="!w-[118px] text-ink sm:!w-[150px]" />
          </span>
        </div>
      </div>

    </section>
  );
}
