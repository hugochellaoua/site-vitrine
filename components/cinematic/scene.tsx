import type { ReactNode } from "react";

/**
 * Une étape du process.
 *
 * La visibilité est *discrète* : à une position de scroll donnée, exactement une
 * étape est active. Le fondu est confié à des transitions CSS décalées — la
 * sortante s'efface entièrement avant que l'entrante n'apparaisse, si bien que
 * deux textes ne sont jamais lisibles en même temps.
 *
 * L'état ne dépend que de la position de scroll : le comportement est donc
 * identique en descente, en remontée et après un saut brutal.
 *
 * Le décalage vertical (`top`) réserve la place du repère d'étape, qui reste
 * affiché en permanence au-dessus.
 */
export function Scene({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div
      data-active={active}
      className="scene pointer-events-none absolute inset-x-0 bottom-8 top-40 flex items-center justify-center px-5 sm:top-44"
    >
      {children}
    </div>
  );
}
