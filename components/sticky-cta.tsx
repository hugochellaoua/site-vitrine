"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero, learnMore } from "@/lib/content";

/**
 * Barre d'action fixe, sur mobile uniquement.
 *
 * Elle n'apparaît qu'une fois le hero dépassé : tant que les boutons d'origine
 * sont à l'écran, la répéter serait du bruit. Sur ordinateur, le menu reste
 * visible en permanence et porte déjà le bouton — la barre n'a pas lieu d'être.
 */
export function StickyCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > window.innerHeight * 0.9);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-void/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Link
          href={learnMore.href}
          tabIndex={shown ? undefined : -1}
          className="flex-1 rounded-full border border-hairline-strong bg-white/[0.04] px-4 py-3 text-center text-[14px] font-semibold text-ink"
        >
          {learnMore.label}
        </Link>
        <Link
          href={hero.cta.href}
          tabIndex={shown ? undefined : -1}
          className="flex flex-[1.3] items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[14px] font-semibold text-white shadow-[0_12px_36px_-12px_rgba(29,80,254,0.9)]"
        >
          {hero.cta.label}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
