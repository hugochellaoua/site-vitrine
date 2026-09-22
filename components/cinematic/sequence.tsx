"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react";
import Link from "next/link";
import { processIntro, processOutro, processSteps } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { Reveal } from "@/components/ui/reveal";
import { STEP_COUNT } from "./config";
import { Scene } from "./scene";
import { StepScene } from "./scenes";

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px), (prefers-reduced-motion: reduce)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

export function CinematicSequence() {
  const compact = useIsCompact();
  return (
    <>
      {compact ? <Stacked /> : <Cinematic />}
      <Outro />
    </>
  );
}

/**
 * Desktop : le process se déroule à l'écran pendant que l'on scrolle.
 * L'étape active est dérivée de la position de scroll — donc réversible,
 * et toujours juste après un saut brutal.
 */
function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const indexRef = useRef(0);
  // Exposé par l'effet ci-dessous pour que les flèches puissent piloter
  // exactement la même animation que la molette.
  const goToRef = useRef<((i: number) => void) | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    function measure() {
      if (!node) return;
      const vh = window.innerHeight;
      const offset = window.scrollY - node.offsetTop;

      // Un palier de scroll = une hauteur d'écran = une étape. L'arrondi fait
      // que l'on bascule pile au milieu du palier, jamais en bordure.
      const i = Math.min(STEP_COUNT - 1, Math.max(0, Math.round(offset / vh)));
      indexRef.current = i;
      setActive(i);
    }
    function onScroll() {
      measure();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /**
   * Avance pas-à-pas.
   *
   * Une impulsion — molette, trackpad, touche — vaut exactement une étape,
   * qu'elle soit douce ou brusque. Deux garde-fous rendent cela fiable :
   *
   *  1. un verrou pendant l'animation, pour ignorer les événements qui
   *     continuent d'arriver ;
   *  2. une exigence de silence (l'inertie d'un trackpad émet des événements
   *     pendant une seconde après le geste) : tant que la molette n'est pas
   *     retombée au calme, l'impulsion suivante n'est pas comptée.
   *
   * Aux deux extrémités de la séquence, la main est rendue à la page : on ne
   * retient jamais le visiteur qui veut en sortir.
   */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let locked = false;
    let armed = true;
    let idle: ReturnType<typeof setTimeout>;

    function engaged() {
      if (!node) return false;
      const offset = window.scrollY - node.offsetTop;
      return offset >= -2 && offset <= node.offsetHeight - window.innerHeight + 2;
    }

    function glideTo(i: number) {
      if (!node) return;
      locked = true;
      const from = window.scrollY;
      const to = node.offsetTop + i * window.innerHeight;
      const delta = to - from;
      const duration = 620;
      let t0: number | null = null;

      function tick(ts: number) {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        // `behavior: "instant"` est indispensable : la page déclare
        // `scroll-behavior: smooth`, et sans cette précision le navigateur
        // lisserait à son tour chacun de nos repositionnements. Les deux
        // animations se superposeraient et le défilement dépasserait sa cible.
        window.scrollTo({ top: from + delta * eased, behavior: "instant" });
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          indexRef.current = i;
          setActive(i);
          locked = false;
        }
      }
      requestAnimationFrame(tick);
    }

    function advance(dir: number) {
      const next = indexRef.current + dir;
      // Hors bornes : on laisse la page reprendre son cours normal.
      if (next < 0 || next > STEP_COUNT - 1) return false;
      glideTo(next);
      return true;
    }

    goToRef.current = (i: number) => {
      if (locked || i < 0 || i > STEP_COUNT - 1) return;
      glideTo(i);
    };

    function onWheel(e: WheelEvent) {
      if (!engaged()) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = indexRef.current + dir;
      if (next < 0 || next > STEP_COUNT - 1) return; // on sort de la séquence

      e.preventDefault();

      // Toute activité de molette repousse le moment où l'on réarme. L'inertie
      // d'un trackpad émet des événements bien après le geste : c'est ce délai
      // de silence qui garantit qu'une impulsion, même violente, ne vaut qu'un pas.
      clearTimeout(idle);
      idle = setTimeout(() => {
        armed = true;
      }, 260);

      if (locked || !armed) return;
      armed = false;
      advance(dir);
    }

    function onKey(e: KeyboardEvent) {
      if (!engaged() || locked) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;
      if (advance(down ? 1 : -1)) e.preventDefault();
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(idle);
      goToRef.current = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const step = processSteps[active];

  return (
    <section id="story" ref={ref} className="relative">
      <div className="sticky top-0 z-10 h-[100svh] w-full overflow-hidden">
        {/* Repère de progression : uniquement la position dans le déroulé.
            Aucun texte ici — le titre de l'étape appartient à la scène, et une
            même information ne doit pas s'afficher à deux endroits. */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-[150] flex flex-col items-center gap-2.5 px-5 sm:top-28">
          <div className="flex items-center gap-1.5">
            {processSteps.map((s, i) => (
              <span
                key={s.key}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 26 : 11,
                  background: i <= active ? "var(--accent-light)" : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-faint tabular-nums">
            Étape {step.n} sur {STEP_COUNT}
          </span>
        </div>

        {processSteps.map((s, i) => (
          <Scene key={s.key} active={i === active}>
            <StepScene step={s} />
          </Scene>
        ))}

        {/* Navigation au clic : même trajet que la molette, pour qui préfère
            avancer sans scroller. Désactivée aux extrémités plutôt que masquée,
            afin que la position des repères ne bouge jamais. */}
        <div className="absolute right-5 top-1/2 z-[160] flex -translate-y-1/2 flex-col items-center gap-2 lg:right-8">
          <StepArrow
            icon="first"
            label="Première étape"
            disabled={active === 0}
            onClick={() => goToRef.current?.(0)}
          />
          <StepArrow
            icon="prev"
            label="Étape précédente"
            disabled={active === 0}
            onClick={() => goToRef.current?.(active - 1)}
          />
          <StepArrow
            icon="next"
            label="Étape suivante"
            disabled={active === STEP_COUNT - 1}
            onClick={() => goToRef.current?.(active + 1)}
          />
          <StepArrow
            icon="last"
            label="Dernière étape"
            disabled={active === STEP_COUNT - 1}
            onClick={() => goToRef.current?.(STEP_COUNT - 1)}
          />
        </div>
      </div>

      {/* Paliers de scroll : un écran par étape, chacun servant de point
          d'ancrage. C'est ce qui fait qu'un geste — lent ou brusque — avance
          d'exactement une étape, au lieu d'en traverser plusieurs. */}
      <div className="-mt-[100svh]" aria-hidden="true">
        {processSteps.map((s) => (
          <div key={s.key} className="h-[100svh]" />
        ))}
      </div>
    </section>
  );
}

const ARROW_ICONS = {
  first: ChevronsUp,
  prev: ChevronUp,
  next: ChevronDown,
  last: ChevronsDown,
} as const;

function StepArrow({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: keyof typeof ARROW_ICONS;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = ARROW_ICONS[icon];
  const jump = icon === "first" || icon === "last";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`glass-panel flex items-center justify-center rounded-full text-muted transition-all duration-300 hover:text-ink enabled:hover:border-white/30 disabled:cursor-default disabled:opacity-20 ${
        jump ? "h-8 w-8" : "h-10 w-10 enabled:hover:-translate-y-0.5"
      }`}
    >
      <Icon size={jump ? 14 : 17} />
    </button>
  );
}

/* Mobile / mouvement réduit : le process devient une liste d'étapes lisible. */
function Stacked() {
  return (
    <section id="story" className="relative flex flex-col gap-20 py-20">
      {processSteps.map((s) => (
        <Block key={s.key}>
          <StepScene step={s} />
        </Block>
      ))}
    </section>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={26} className="flex flex-col items-center px-5">
      {children}
    </Reveal>
  );
}

/* Titre du process, posé juste avant la séquence. */
export function ProcessIntro() {
  return (
    <section className="relative flex flex-col items-center px-6 pb-4 pt-24 text-center sm:pt-32">
      <Badge>{processIntro.eyebrow}</Badge>
      <SectionTitle
        title={processIntro.title}
        emphasis={processIntro.emphasis}
        className="mt-6"
      />
      <p className="mx-auto mt-3.5 text-[14.5px] text-muted">{processIntro.sub}</p>
    </section>
  );
}

function Outro() {
  return (
    <div className="relative flex flex-col items-center gap-3 px-6 pb-8 pt-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={processOutro.cta.href}
          className="rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-shadow duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)]"
        >
          {processOutro.cta.label}
        </Link>
        <SecondaryCta />
      </div>
      <span className="text-[12px] text-faint">{processOutro.sub}</span>
    </div>
  );
}
