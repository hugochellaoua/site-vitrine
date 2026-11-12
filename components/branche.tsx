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

/** Côté d'un bloc et épaisseur, en pixels, sur le plan du schéma. */
const B = 128;
const EP = 26;

type Bloc = { id: string; x: number; y: number; titre: string; items: string[]; temps: number[] };

function Boite({ bloc, actif }: { bloc: Bloc; actif: boolean }) {
  const dessus = actif ? "bg-[#b3ac9c] text-[#121214] border-[#cfc8b8]" : "bg-[#151517] text-[#cfccc4] border-white/40";
  const cote = actif ? "bg-[#8d8778] border-[#cfc8b8]" : "bg-[#0d0d0e] border-white/30";
  return (
    <div
      className="absolute transition-transform duration-700"
      style={{
        left: bloc.x - B / 2,
        top: bloc.y - B / 2,
        width: B,
        height: B,
        transformStyle: "preserve-3d",
        transform: `translateZ(${actif ? 14 : 0}px)`,
      }}
    >
      {/* Les deux côtés visibles, puis le dessus, qui porte le texte. */}
      <div
        className={`absolute left-0 border transition-colors duration-700 ${cote}`}
        style={{ top: B, width: B, height: EP, transformOrigin: "top", transform: "rotateX(90deg)" }}
      />
      <div
        className={`absolute top-0 border transition-colors duration-700 ${cote}`}
        style={{ left: B, width: EP, height: B, transformOrigin: "left", transform: "rotateY(-90deg)" }}
      />
      <div
        className={`absolute inset-0 border p-3.5 transition-colors duration-700 ${dessus}`}
        style={{ transform: `translateZ(${EP}px)` }}
      >
        <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.22em]">{bloc.titre}</p>
        <ul className="mt-2 flex flex-col gap-0.5 text-[11px] italic leading-snug opacity-80">
          {bloc.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
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
  const diffusion = processSteps.find((s) => s.key === "diffusion");
  const reponses = processSteps.find((s) => s.key === "reponses");
  const sources = entreprise && "sources" in entreprise ? entreprise.sources.slice(0, 4) : [];
  const canaux = diffusion && "channels" in diffusion ? diffusion.channels.slice(0, 3) : [];
  const echanges = reponses && "extracted" in reponses ? reponses.extracted.slice(0, 3) : [];

  const P = 560;
  const C = P / 2;
  const blocs: Bloc[] = [
    { id: "sources", x: P - 82, y: 82, titre: branche.blocs.sources, items: sources, temps: [0] },
    { id: "canaux", x: 82, y: 82, titre: branche.blocs.canaux, items: canaux, temps: [1] },
    { id: "echanges", x: 82, y: P - 82, titre: branche.blocs.echanges, items: echanges, temps: [1] },
    { id: "garde", x: P - 82, y: P - 82, titre: branche.blocs.garde, items: branche.garde, temps: [2] },
  ];

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

        {/* Le schéma : un plan incliné, les blocs posés dessus. */}
        <div className="relative mx-auto h-[300px] w-full max-w-[560px] sm:h-[480px]" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 origin-center scale-[0.5] sm:scale-[0.85]" style={{ width: P, height: P, marginLeft: -P / 2, marginTop: -P / 2 }}>
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-42deg)" }}
            >
              <svg viewBox={`0 0 ${P} ${P}`} className="absolute inset-0 h-full w-full overflow-visible">
                {blocs.map((b) => {
                  const actif = b.temps.includes(temps);
                  return (
                    <line
                      key={b.id}
                      x1={b.x}
                      y1={b.y}
                      x2={C}
                      y2={C}
                      stroke={actif ? "#f4f1ea" : "rgba(244,241,234,0.28)"}
                      strokeWidth={actif ? 1.6 : 1}
                      strokeDasharray="5 7"
                      className={actif ? "branche-flux" : ""}
                      style={{ transition: "stroke .6s" }}
                    />
                  );
                })}
              </svg>
              {blocs.map((b) => (
                <Boite key={b.id} bloc={b} actif={b.temps.includes(temps)} />
              ))}
              {/* Helpify, au centre. */}
              <div className="absolute" style={{ left: C - 72, top: C - 72, width: 144, height: 144, transformStyle: "preserve-3d" }}>
                <div className="absolute left-0 border border-white/40 bg-[#26262a]" style={{ top: 144, width: 144, height: 40, transformOrigin: "top", transform: "rotateX(90deg)" }} />
                <div className="absolute top-0 border border-white/40 bg-[#1b1b1e]" style={{ left: 144, width: 40, height: 144, transformOrigin: "left", transform: "rotateY(-90deg)" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-white/50 bg-[#2e2e33]" style={{ transform: "translateZ(40px)" }}>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#cfccc4]">{branche.blocs.centre}</p>
                  <span className="grid h-12 w-12 place-items-center bg-[#0d0d0e]">
                    <LogoMark size={26} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
