"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";
import { LogoMark } from "@/components/logo-mark";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Helpify branché sur votre entreprise.
 *
 * À gauche, trois temps : Helpify comprend votre entreprise, échange avec le
 * candidat, puis vos RH décident. Le temps en cours est en clair, une fine
 * barre se remplit au-dessus de lui, puis on passe au suivant.
 *
 * À droite, le même mouvement en schéma : des blocs posés en perspective
 * autour de Helpify. Vos sources, puis vos canaux et les échanges avec les
 * candidats, puis les garde-fous. Le bloc du temps en cours s'éclaire, et ses
 * liaisons avec Helpify se mettent à couler.
 *
 * Qui a demandé moins de mouvement voit le premier temps, immobile, et peut
 * passer aux autres en cliquant.
 */

const DUREE = 5200;

/** Le plan du schéma, en pixels : trois colonnes, Helpify au centre. */
const W = 580;
const H = 400;
const LARG = 150;
const COL_G = 0;
const COL_D = W - LARG;
const CX = W / 2;
const CY = H / 2 - 18;
const CL = 128;
const yG = (i: number) => 92 + i * 56;
const yD = (i: number) => 120 + i * 56;

/** Une courbe douce d'un point à un autre, à l'horizontale aux deux bouts. */
const courbe = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
};

function Liaison({ d, actif, retard }: { d: string; actif: boolean; retard: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(244,241,234,0.16)" strokeWidth="1" />
      {actif && (
        <path
          d={d}
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="22 400"
          className="branche-eclat"
          style={{ animationDelay: `${retard}s` }}
        />
      )}
    </>
  );
}

function Puce({ x, y, actif, children }: { x: number; y: number; actif: boolean; children: string }) {
  return (
    <span
      className={`absolute flex items-center border px-3.5 text-[14px] transition-colors duration-700 ${
        actif ? "border-[#f4f1ea] bg-[#f4f1ea] text-[#121214]" : "border-white/15 bg-[#151517] text-[#cfccc4]"
      }`}
      style={{ left: x, top: y - 19, width: LARG, height: 38 }}
    >
      {children}
    </span>
  );
}

export function Branche({ locale }: { locale: Locale }) {
  const { branche, processSteps } = dict(locale);
  const [temps, setTemps] = useState(0);
  const [tour, setTour] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setTemps((x) => (x + 1) % 3), DUREE);
    return () => window.clearTimeout(t);
  }, [temps, tour]);

  const etapes = branche.steps.map((k) => processSteps.find((s) => s.key === k)).filter((s) => s !== undefined);
  const entreprise = processSteps.find((s) => s.key === "entreprise");
  const reponses = processSteps.find((s) => s.key === "reponses");
  const sources = entreprise && "sources" in entreprise ? entreprise.sources.slice(0, 4) : [];
  const echanges = reponses && "extracted" in reponses ? reponses.extracted.slice(0, 3) : [];

  const decision = processSteps.find((s) => s.key === "decision");
  const gauche = sources;
  const droite = decision && "basis" in decision ? decision.basis : branche.garde;
  const titreDroite = decision && "from" in decision ? decision.from : branche.blocs.garde;

  const choisir = (i: number) => {
    setTemps(i);
    setTour((x) => x + 1);
  };

  return (
    <section id="story" className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionTitle title={branche.title} emphasis={branche.emphasis} className="!mx-0 !max-w-[16ch] text-left" />
          <ol className="mt-12">
            {etapes.map((e, i) => {
              const actif = i === temps;
              return (
                <li key={e.key} className="relative border-t border-hairline">
                  {actif && (
                    <span
                      key={`${temps}-${tour}`}
                      className="branche-barre absolute -top-px left-0 h-px bg-ink"
                      style={{ animationDuration: `${DUREE}ms` }}
                      aria-hidden="true"
                    />
                  )}
                  <button type="button" onClick={() => choisir(i)} className="block w-full py-6 text-left">
                    <span className={`block font-display text-[19px] tracking-[-0.02em] transition-colors duration-500 ${actif ? "text-ink" : "text-faint"}`}>
                      {e.title}
                    </span>
                    <span className={`mt-2 block max-w-[46ch] text-[14px] leading-relaxed transition-colors duration-500 ${actif ? "text-muted" : "text-faint/70"}`}>
                      {e.sub}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <Link
            href={branche.cta.href}
            className="mt-8 inline-flex rounded-[4px] bg-accent px-5 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {branche.cta.label}
          </Link>
        </div>

        {/* Le schéma, de face : vos sources à gauche, Helpify au centre, ce que
            reçoivent vos RH à droite. Des éclats de lumière parcourent les
            liaisons du temps en cours. */}
        <div className="relative mx-auto h-[330px] w-full max-w-[580px] sm:h-[440px]" aria-hidden="true">
          <div
            className="absolute left-1/2 top-1/2 origin-center scale-[0.6] sm:scale-100"
            style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2 }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
              {gauche.map((_, i) => (
                <Liaison key={`g${i}`} d={courbe(COL_G + LARG, yG(i), CX - CL / 2, CY)} actif={temps === 0} retard={i * 0.25} />
              ))}
              {droite.map((_, i) => (
                <Liaison key={`d${i}`} d={courbe(CX + CL / 2, CY, COL_D, yD(i))} actif={temps === 2} retard={i * 0.25} />
              ))}
            </svg>

            <p className="absolute font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint" style={{ left: COL_G, top: yG(0) - 44 }}>
              {branche.blocs.sources}
            </p>
            {gauche.map((x, i) => (
              <Puce key={x} x={COL_G} y={yG(i)} actif={temps === 0}>
                {x}
              </Puce>
            ))}

            <div
              className={`absolute flex flex-col items-center justify-center gap-3 border transition-colors duration-700 ${
                temps === 1 ? "border-[#f4f1ea] bg-[#f4f1ea] text-[#121214]" : "border-white/20 bg-[#18181a] text-[#f4f1ea]"
              }`}
              style={{ left: CX - CL / 2, top: CY - CL / 2, width: CL, height: CL }}
            >
              <LogoMark size={34} />
              <span className="font-display text-[17px] tracking-[-0.02em]">{branche.blocs.centre}</span>
              {temps === 1 && <span className="branche-onde absolute inset-0 border border-[#f4f1ea]" />}
            </div>
            <ul className="absolute flex justify-center gap-1.5" style={{ left: CX - 130, width: 260, top: CY + CL / 2 + 40 }}>
              {echanges.map((x) => (
                <li
                  key={x}
                  className={`rounded-[3px] border px-2.5 py-1 text-[12px] transition-colors duration-700 ${
                    temps === 1 ? "border-[#f4f1ea]/60 text-[#f4f1ea]" : "border-white/10 text-[#7d7b75]"
                  }`}
                >
                  {x}
                </li>
              ))}
            </ul>

            <p className="absolute font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint" style={{ left: COL_D, top: yD(0) - 44 }}>
              {titreDroite}
            </p>
            {droite.map((x, i) => (
              <Puce key={x} x={COL_D} y={yD(i)} actif={temps === 2}>
                {x}
              </Puce>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
