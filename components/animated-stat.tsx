"use client";

import { useEffect, useRef, useState } from "react";


export function AnimatedStat({
  value,
  suffix = "",
  label,
  size = "text-[34px]",
  align = "left",
}: {
  value: number;
  suffix?: string;
  label: string;
  size?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  // Décompte maison : une boucle d'animation et une courbe d'accélération
  // suffisent. La bibliothèque d'animation ne servait qu'à cela ici.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    // Mouvement réduit : on affiche la valeur finale, sans décompte.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }

    let start = 0;
    function step(now: number) {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / 1600);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(step);
        }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className={align === "center" ? "text-center" : "text-left"}>
      <div className={`gradient-num font-display font-bold tabular-nums leading-none ${size}`}>
        {display}
        {suffix}
      </div>
      <div
        className={`mt-3 text-[11px] uppercase tracking-[0.14em] text-faint ${
          align === "center" ? "" : "max-w-[14ch]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
