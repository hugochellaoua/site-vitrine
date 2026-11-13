"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

/**
 * La bande qui défile : « Les recruteurs qui… », puis une ligne après l'autre,
 * ce que Helpify leur permet. La ligne en cours est en noir, les voisines
 * s'estompent au-dessus et au-dessous, et la liste remonte doucement.
 *
 * Qui a demandé moins de mouvement voit toutes les lignes, immobiles.
 */
const PAS = 2400;
const HAUTEUR = 1.45; // hauteur d'une ligne, en em

const REQUETE = "(prefers-reduced-motion: reduce)";
const abonner = (fn: () => void) => {
  const mq = window.matchMedia(REQUETE);
  mq.addEventListener("change", fn);
  return () => mq.removeEventListener("change", fn);
};

export function Defile({ locale }: { locale: Locale }) {
  const { defile } = dict(locale);
  const n = defile.lignes.length;
  const [i, setI] = useState(0);
  const immobile = useSyncExternalStore(abonner, () => window.matchMedia(REQUETE).matches, () => false);

  useEffect(() => {
    if (immobile) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % n), PAS);
    return () => window.clearInterval(t);
  }, [n, immobile]);

  return (
    <section className="relative overflow-hidden border-y border-hairline px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="font-display tracking-[-0.03em]">
          <p className="text-[clamp(30px,4.2vw,54px)] leading-[1.1] tracking-[-0.04em] text-ink">{defile.lead}</p>
          {immobile ? (
            <ul className="mt-3 text-[clamp(19px,2.2vw,27px)] leading-[1.3] text-faint">
              {defile.lignes.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          ) : (
            // Cinq lignes visibles : la ligne en cours au milieu, deux de part et
            // d'autre, de plus en plus pâles.
            <div className="relative mt-3 overflow-hidden text-[clamp(19px,2.2vw,27px)]" style={{ height: `${HAUTEUR * 3}em` }} aria-live="polite">
              <ul
                className="transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ transform: `translateY(${(1 - i) * HAUTEUR}em)` }}
              >
                {defile.lignes.map((l, k) => {
                  const d = Math.abs(k - i);
                  return (
                    <li
                      key={l}
                      className="whitespace-nowrap transition-colors duration-700"
                      style={{ height: `${HAUTEUR}em`, color: d === 0 ? "var(--ink)" : d === 1 ? "rgba(18,18,20,0.22)" : "rgba(18,18,20,0.08)" }}
                      aria-hidden={d !== 0}
                    >
                      {l}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <Link
          href={defile.cta.href}
          className="group inline-flex items-center gap-2 self-end rounded-[4px] border border-hairline-strong px-5 py-3 text-[14px] text-ink transition-colors hover:border-ink/50 lg:self-center"
        >
          {defile.cta.label}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
