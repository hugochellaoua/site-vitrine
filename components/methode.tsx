"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Comment Helpify mène l'entretien, en cinq temps.
 *
 * À gauche, les temps : le temps en cours est en clair, une fine barre se
 * remplit au-dessus de lui, puis on passe au suivant ; un clic en choisit un.
 * À droite, ce que produit chaque temps, dans une carte de la plateforme :
 * les critères et leurs comportements observables, les questions, la question
 * adaptée au CV, l'échange et sa relance, puis l'analyse.
 *
 * Dessous, une ligne rappelle que les quatre produits sont cumulables.
 * Qui a demandé moins de mouvement voit le premier temps, et peut cliquer.
 */

const DUREE = 4800;

function Carte({ visible, titre, droite, children }: { visible: boolean; titre: string; droite?: ReactNode; children: ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 top-0 rounded-[10px] bg-white text-[#121214] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-[opacity,transform,filter] duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        filter: visible ? "blur(0)" : "blur(6px)",
      }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between border-b border-[#f0f0ee] px-5 py-3 text-[12px] text-[#8b887f]">
        <span>{titre}</span>
        {droite}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Methode({ locale }: { locale: Locale }) {
  const { methode, processSteps, products } = dict(locale);
  const [temps, setTemps] = useState(0);
  const [tour, setTour] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setTemps((x) => (x + 1) % methode.etapes.length), DUREE);
    return () => window.clearTimeout(t);
  }, [temps, tour, methode.etapes.length]);

  const besoin = processSteps.find((s) => s.key === "besoin");
  const echange = processSteps.find((s) => s.key === "reponses");
  const role = besoin && "role" in besoin ? besoin.role : "";
  const criteres = besoin && "fields" in besoin ? besoin.fields : [];
  const reponse = echange && "messages" in echange ? echange.messages[1]?.text ?? "" : "";
  const { score } = products.demo;
  const d = methode.demo;

  const choisir = (i: number) => {
    setTemps(i);
    setTour((x) => x + 1);
  };

  return (
    <section id="story" className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionTitle title={methode.title} emphasis={methode.emphasis} className="!mx-0 !max-w-[16ch] text-left" />
          <ol className="mt-12">
            {methode.etapes.map((e, i) => {
              const actif = i === temps;
              return (
                <li key={e.titre} className="relative border-t border-hairline">
                  {actif && (
                    <span
                      key={`${temps}-${tour}`}
                      className="branche-barre absolute -top-px left-0 h-px bg-ink"
                      style={{ animationDuration: `${DUREE}ms` }}
                      aria-hidden="true"
                    />
                  )}
                  <button type="button" onClick={() => choisir(i)} className="flex w-full gap-5 py-5 text-left">
                    <span className={`font-mono text-[12px] transition-colors duration-500 ${actif ? "text-ink" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block font-display text-[19px] tracking-[-0.02em] transition-colors duration-500 ${actif ? "text-ink" : "text-faint"}`}>
                        {e.titre}
                      </span>
                      <span
                        className="grid transition-[grid-template-rows,opacity] duration-500"
                        style={{ gridTemplateRows: actif ? "1fr" : "0fr", opacity: actif ? 1 : 0 }}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[46ch] pt-2 text-[14.5px] leading-relaxed text-muted">{e.texte}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Ce que produit le temps en cours, dans une carte de la plateforme. */}
        <div className="relative min-h-[420px] lg:mt-24" aria-hidden="true">
          <Carte visible={temps === 0} titre={`${d.offre} · ${role}`}>
            <ul className="flex flex-col gap-2.5">
              {criteres.map((c, i) => (
                <li key={c.label} className="rounded-[8px] border border-[#ececea] px-3.5 py-2.5">
                  <span className="flex items-center justify-between gap-3 text-[13.5px]">
                    {c.label}
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]">{c.weight}</span>
                  </span>
                  <span className="mt-1 block text-[12px] text-[#8b887f]">
                    {d.observable} : {d.observables[i]}
                  </span>
                </li>
              ))}
            </ul>
          </Carte>

          <Carte visible={temps === 1} titre={`${d.questions} · ${role}`}>
            <ol className="flex flex-col gap-2.5">
              {d.exemples.map((q, i) => (
                <li key={q} className="flex gap-3 rounded-[8px] border border-[#ececea] px-3.5 py-3 text-[13.5px] leading-snug">
                  <span className="font-mono text-[11px] text-[#8b887f]">{String(i + 1).padStart(2, "0")}</span>
                  {q}
                </li>
              ))}
            </ol>
          </Carte>

          <Carte visible={temps === 2} titre={`${score.candidate} · ${role}`}>
            <div className="flex gap-4 rounded-[8px] border border-[#ececea] p-4">
              <FileText size={28} strokeWidth={1.3} className="shrink-0 text-[#8b887f]" />
              <div className="flex-1">
                <p className="text-[13px] font-medium">{d.cv}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <span className="block h-[7px] w-[88%] rounded-full bg-[#eeeeec]" />
                  <span className="block h-[7px] w-[74%] rounded-full bg-[#2f6bff]/30" />
                  <span className="block h-[7px] w-[60%] rounded-full bg-[#eeeeec]" />
                </div>
              </div>
            </div>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-[#2f6bff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f6bff]" />
              {d.adaptee}
            </p>
            <p className="mt-2 rounded-[10px] rounded-bl-[3px] bg-[#121214] px-4 py-3 text-[13.5px] leading-snug text-white">{d.exemples[0]}</p>
          </Carte>

          <Carte visible={temps === 3} titre={`${score.candidate} · ${role}`}>
            <p className="ml-auto max-w-[88%] rounded-[10px] rounded-br-[3px] bg-[#f3f3f1] px-4 py-3 text-[13.5px] leading-snug">{reponse}</p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-[#2f6bff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f6bff]" />
              {d.relance}
            </p>
            <p className="mt-2 max-w-[88%] rounded-[10px] rounded-bl-[3px] bg-[#121214] px-4 py-3 text-[13.5px] leading-snug text-white">{d.relanceTexte}</p>
          </Carte>

          <Carte
            visible={temps === 4}
            titre={`${d.analyse} · ${score.candidate}`}
            droite={<span className="rounded-full border border-[#dcdcd8] px-2.5 py-0.5 text-[11px] text-[#121214]">{d.valider}</span>}
          >
            <dl className="flex flex-col">
              {score.rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-[#f0f0ee] py-2.5 last:border-0">
                  <dt className="text-[12.5px] text-[#8b887f]">{r.label}</dt>
                  <dd className="text-right text-[13.5px] font-medium">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Carte>
        </div>
      </div>

      {/* Les produits se cumulent : ils reposent tous sur cet entretien. */}
      <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-6 border-t border-hairline pt-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-display text-[clamp(22px,2.4vw,30px)] tracking-[-0.03em] text-ink">{methode.cumul.title}</p>
          <p className="mt-2 text-[15px] text-muted">{methode.cumul.texte}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {products.items.map((p) => (
            <span key={p.id} className="rounded-[4px] border border-hairline-strong px-3 py-2 text-[13.5px] text-ink">
              {p.name}
            </span>
          ))}
          <Link href={methode.cta.href} className="ml-2 rounded-[4px] bg-accent px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90">
            {methode.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
