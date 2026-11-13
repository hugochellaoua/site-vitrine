"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Un chiffre qui démarre de zéro et monte jusqu'à sa valeur quand il arrive à
 * l'écran, une seule fois. Il garde son écriture : le signe moins, la virgule
 * décimale. Qui a demandé moins de mouvement voit directement la valeur.
 */
export function Compteur({ valeur, className = "" }: { valeur: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = valeur.match(/^([^\d]*)(\d+)(?:([.,])(\d+))?(.*)$/);
  const [affiche, setAffiche] = useState(valeur);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, avant, entier, sep, dec = "", apres] = m;
    const cible = Number(`${entier}.${dec || 0}`);
    const decimales = dec.length;
    const ecrire = (v: number) => {
      const t = v.toFixed(decimales);
      setAffiche(`${avant}${sep ? t.replace(".", sep) : t}${apres}`);
    };
    ecrire(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const duree = 1600;
        const pas = (t: number) => {
          const p = Math.min(1, (t - t0) / duree);
          ecrire(cible * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(pas);
        };
        raf = requestAnimationFrame(pas);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // La valeur ne change pas pendant la vie du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {affiche}
    </span>
  );
}
