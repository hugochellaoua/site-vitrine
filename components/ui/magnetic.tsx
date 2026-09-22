"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Attire son contenu vers le curseur qui l'approche.
 *
 * L'effet ne se déclenche qu'à l'intérieur d'un rayon : au-delà, l'élément ne
 * bouge pas du tout. Un bouton qui frémit dès que la souris traverse l'écran
 * serait agité, pas vivant.
 *
 * Le déplacement est plafonné et le retour élastique, pour que la cible reste
 * cliquable là où l'œil la voit — un élément magnétique qui fuit le curseur
 * est une frustration, pas un raffinement.
 */
export function Magnetic({
  children,
  radius = 110,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function tick() {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el!.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      // On s'arrête net une fois revenu au repos : pas de boucle perpétuelle.
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    }

    function wake() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const reach = radius + Math.max(r.width, r.height) / 2;

      if (dist > reach) {
        tx = 0;
        ty = 0;
      } else {
        // L'attraction faiblit avec la distance, elle ne s'applique pas d'un bloc.
        const pull = (1 - dist / reach) * strength;
        tx = dx * pull;
        ty = dy * pull;
      }
      wake();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      el.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </span>
  );
}
