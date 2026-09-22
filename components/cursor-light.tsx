"use client";

import { useEffect } from "react";

/**
 * La lumière que le curseur porte sur les surfaces.
 *
 * Une seule écoute déléguée sur le document, et un seul élément traité à la
 * fois : celui que l'on désigne. Mesurer toutes les cartes à chaque mouvement
 * de souris coûterait un recalcul de mise en page par carte et par image —
 * ici, c'est un seul, sur l'élément survolé.
 *
 * Le rendu lui-même est en CSS (voir `.card-surface::after`) : le script se
 * contente de publier les coordonnées locales.
 */
export function CursorLight() {
  useEffect(() => {
    // Sans pointeur fin (tactile), il n'y a rien à éclairer.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let lit: HTMLElement | null = null;
    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    function apply() {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
    }

    function onMove(e: PointerEvent) {
      const target =
        (e.target as HTMLElement | null)?.closest<HTMLElement>(".card-surface") ?? null;

      if (target !== lit) {
        if (lit) lit.removeAttribute("data-lit");
        if (target) target.setAttribute("data-lit", "true");
        lit = target;
      }
      if (!target) return;

      const r = target.getBoundingClientRect();
      pending = { el: target, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame) frame = requestAnimationFrame(apply);
    }

    function onLeave() {
      if (lit) lit.removeAttribute("data-lit");
      lit = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (lit) lit.removeAttribute("data-lit");
    };
  }, []);

  return null;
}
