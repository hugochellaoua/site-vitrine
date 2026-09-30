import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { dict, type Locale } from "@/lib/i18n";
import { SecondaryCta } from "@/components/ui/secondary-cta";

const STEP = 0.05;
// Le titre s'affiche presque immédiatement. Il attendait auparavant la fin du
// lever de rideau (1,05 s) : or c'est lui que Google chronomètre pour juger la
// vitesse perçue de la page, et un visiteur qui hésite part avant.
const START = 0.28;

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
  const { hero } = dict(locale);
  // Le titre est découpé mot à mot pour être levé en cascade ; le découpage
  // dépend donc de la langue et vit dans le composant, plus au chargement.
  const words = hero.title.split(" ");
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-32"
    >
      {/* La lueur bleue derrière le titre, comme dans la vidéo. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(29,80,254,0.30) 0%, rgba(29,80,254,0.08) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <h1
        aria-label={`${hero.title} ${hero.emphasis}`}
        className="max-w-5xl text-center font-display text-[clamp(38px,6.4vw,86px)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
      >
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="hero-rise mr-[0.24em] inline-block"
              style={{ animationDelay: `${START + i * STEP}s` }}
            >
              {word}
            </span>
          ))}
          <span
            className="hero-rise inline-block text-warm"
            style={{ animationDelay: `${START + words.length * STEP}s` }}
          >
            {hero.emphasis}
          </span>
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
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-shadow duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)]"
          >
            {hero.cta.label}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <SecondaryCta locale={locale} />
      </div>

      <div
        className="hero-rise absolute bottom-10 flex flex-col items-center gap-2.5"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="text-[10.5px] uppercase tracking-[0.18em] text-faint">{hero.scrollHint}</span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/10">
          <span className="scroll-cue absolute inset-x-0 block h-4 bg-gradient-to-b from-transparent via-accent-light to-transparent" />
        </span>
      </div>
    </section>
  );
}
