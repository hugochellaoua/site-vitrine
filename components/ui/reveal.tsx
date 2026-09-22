"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Apparition d'un bloc à son entrée dans l'écran.
 *
 * Remplace la bibliothèque d'animation, qui pesait plus de quarante kilo-octets
 * pour ne faire, ici, que cela : révéler des éléments au défilement. Le travail
 * est confié au CSS ; le script se contente de poser un attribut quand le bloc
 * devient visible.
 *
 * `once` par défaut : une fois révélé, un bloc le reste. Rejouer l'animation au
 * retour en arrière donnerait une page instable.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  restY = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** Décalage conservé une fois le bloc révélé (mise en quinconce). */
  restY?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sans IntersectionObserver, on affiche sans animer plutôt que de masquer.
    // Le passage par une frame évite de modifier l'état pendant l'effet lui-même.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-rest": `${restY}px`,
          "--reveal-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
