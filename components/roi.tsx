"use client";

import { useMemo, useState } from "react";
import { roi } from "@/lib/content";
import { RoiCapture } from "@/components/roi-capture";
import { Badge, SectionTitle } from "@/components/ui/section-title";

const nf = new Intl.NumberFormat("fr-FR");
const money = (v: number) => `${nf.format(Math.round(v))} €`;
const hours = (v: number) => `${nf.format(Math.round(v))} h`;
const decimal = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

type Input = { key: string; label: string; value: number; min: number; max: number; step: number; unit: string; note?: string };

const ALL_INPUTS: Input[] = [...roi.time.inputs, ...roi.speed.inputs, ...roi.quality.inputs];

export function Roi() {
  const [v, setV] = useState<Record<string, number>>(() =>
    Object.fromEntries(ALL_INPUTS.map((i) => [i.key, i.value]))
  );

  const calc = useMemo(() => {
    // Bloc 1 — le temps. Chaque ligne découle de la précédente, dans l'ordre
    // où elle est affichée : volume → pertinence → durées → total.
    const relevant = (v.applications * v.relevantRate) / 100;
    const cvHours = (v.applications * v.cvMinutes) / 60;
    const prequalHours = (relevant * v.prequalMinutes) / 60;
    const questionHours = (relevant * v.questionMinutes) / 60;
    const totalHours = cvHours + prequalHours + questionHours;
    const timeValue = totalHours * v.hourlyCost;

    // Bloc 2 — la vitesse.
    const daysSaved = (v.timeToHire * v.timeToHireCut) / 100;
    const speedValue = v.hires * daysSaved * v.dayValue;

    // Bloc 3 — la qualité.
    const badHires = (v.hires * v.badHireRate) / 100;
    const badHireTotal = badHires * v.badHireCost;
    const qualityValue = (badHireTotal * v.badHireCut) / 100;

    return {
      relevant, cvHours, prequalHours, questionHours, totalHours, timeValue,
      daysSaved, speedValue,
      badHires, badHireTotal, qualityValue,
      total: timeValue + speedValue + qualityValue,
    };
  }, [v]);

  const set = (key: string, value: number) => setV((prev) => ({ ...prev, [key]: value }));

  // Ce que verra l'équipe commerciale dans Slack : les hypothèses du visiteur,
  // puis ce qu'elles produisent. Sans ça, l'adresse e-mail seule ne dit rien.
  const recap = [
    "Simulation réalisée sur le site :",
    ...ALL_INPUTS.map((i) => `• ${i.label} : ${nf.format(v[i.key])}${i.unit}`),
    "",
    `Temps récupéré : ${hours(calc.totalHours)}/an → ${money(calc.timeValue)}`,
    `Accélération des recrutements : ${money(calc.speedValue)}`,
    `Qualité des recrutements : ${money(calc.qualityValue)}`,
    `Valeur annuelle estimée : ${money(calc.total)}`,
  ].join("\n");

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Badge>{roi.eyebrow}</Badge>
          <SectionTitle title={roi.title} emphasis={roi.emphasis} className="mt-6" />
          <p className="mx-auto mt-4 max-w-[48ch] text-[14.5px] leading-relaxed text-muted">{roi.sub}</p>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          {/* ── Bloc 1 : le temps ─────────────────────────────────────── */}
          <Block title={roi.time.title} result={money(calc.timeValue)}>
            <Fields inputs={roi.time.inputs} v={v} set={set} />
            <Chain>
              <Line value={nf.format(v.applications)} label="candidatures reçues" />
              <Op>× {v.relevantRate} % pertinentes</Op>
              <Line value={nf.format(Math.round(calc.relevant))} label="candidats pertinents" />
              <Op>× {v.prequalMinutes} min de préqualification</Op>
              <Line value={hours(calc.prequalHours)} label="de préqualification" />
              <Op>+ tri des CV ({nf.format(v.applications)} × {v.cvMinutes} min)</Op>
              <Line value={hours(calc.cvHours)} label="de tri des CV" />
              <Op>+ réponses aux questions ({nf.format(Math.round(calc.relevant))} × {v.questionMinutes} min)</Op>
              <Line value={hours(calc.questionHours)} label="de réponses aux questions" />
              <Op>total</Op>
              <Line value={hours(calc.totalHours)} label="économisées par an" strong />
              <Op>× {v.hourlyCost} €/h</Op>
              <Line value={money(calc.timeValue)} label="économisés par an" strong accent />
            </Chain>
          </Block>

          {/* ── Bloc 2 : la vitesse ───────────────────────────────────── */}
          <Block title={roi.speed.title} result={money(calc.speedValue)}>
            <Fields inputs={roi.speed.inputs} v={v} set={set} />
            <Chain>
              <Line value={nf.format(v.hires)} label="recrutements par an" />
              <Op>time-to-hire de {v.timeToHire} jours, réduit de {v.timeToHireCut} %</Op>
              <Line value={`${decimal.format(calc.daysSaved)} j`} label="gagnés par recrutement" strong />
              <Op>× {nf.format(v.hires)} recrutements × {v.dayValue} €</Op>
              <Line value={money(calc.speedValue)} label="de valeur créée par an" strong accent />
            </Chain>
          </Block>

          {/* ── Bloc 3 : la qualité ───────────────────────────────────── */}
          <Block title={roi.quality.title} result={money(calc.qualityValue)} note={roi.quality.note}>
            <Fields inputs={roi.quality.inputs} v={v} set={set} />
            <Chain>
              <Line value={nf.format(v.hires)} label="recrutements par an" />
              <Op>× {v.badHireRate} % inadéquats</Op>
              <Line value={decimal.format(calc.badHires)} label="recrutements inadéquats" />
              <Op>× {nf.format(v.badHireCost)} €</Op>
              <Line value={money(calc.badHireTotal)} label="de coût potentiel" />
              <Op>× {v.badHireCut} % évités</Op>
              <Line value={money(calc.qualityValue)} label="de valeur potentielle" strong accent />
            </Chain>
          </Block>
        </div>

        {/* ── Synthèse ─────────────────────────────────────────────────── */}
        <div className="card-surface starry mt-6 rounded-[28px] p-8 text-center md:p-10">
          <h3 className="font-display text-[19px] font-semibold text-ink">{roi.summary.title}</h3>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3">
            {[calc.timeValue, calc.speedValue, calc.qualityValue].map((amount, i) => (
              <div key={roi.summary.lines[i].key} className="flex flex-col items-center gap-1.5">
                <span className="font-display text-[24px] font-bold tabular-nums text-ink">{money(amount)}</span>
                <span className="max-w-[22ch] text-[11.5px] leading-snug text-faint">
                  {roi.summary.lines[i].label}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="gradient-num mt-8 font-display text-[clamp(44px,7vw,84px)] font-bold leading-none tabular-nums">
            {money(calc.total)}
          </div>
          <div className="mt-4 text-[12px] uppercase tracking-[0.16em] text-muted">
            {roi.summary.totalLabel}
          </div>
          <p className="mt-5 text-[11.5px] text-faint">{roi.summary.note}</p>
        </div>

        <RoiCapture recap={recap} />

        {/* ── Ce qui ne se chiffre pas ─────────────────────────────────── */}
        <div className="mt-6 rounded-[28px] border border-hairline bg-panel/20 p-8">
          <h3 className="text-center font-display text-[17px] font-semibold text-ink">
            {roi.candidate.title}
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {roi.candidate.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-hairline-strong bg-void/40 px-4 py-2 text-[12.5px] text-[#e4e5f5]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Primitives ────────────────────────────────────────────────────────── */

function Block({
  title,
  result,
  note,
  children,
}: {
  title: string;
  result: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface starry-soft starry rounded-[28px] p-8 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-5">
        <h3 className="font-display text-[19px] font-semibold text-ink">{title}</h3>
        <span className="font-display text-[22px] font-bold tabular-nums text-accent-light">{result}</span>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">{children}</div>
      {note && <p className="mt-7 text-[11.5px] text-faint">{note}</p>}
    </div>
  );
}

function Fields({
  inputs,
  v,
  set,
}: {
  inputs: readonly Input[];
  v: Record<string, number>;
  set: (k: string, val: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {inputs.map((input) => (
        <label key={input.key} className="block">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[12.5px] leading-snug text-muted">{input.label}</span>
            <span className="shrink-0 font-display text-[15px] font-semibold tabular-nums text-ink">
              {nf.format(v[input.key])}
              {input.unit}
            </span>
          </span>
          <input
            type="range"
            min={input.min}
            max={input.max}
            step={input.step}
            value={v[input.key]}
            onChange={(e) => set(input.key, Number(e.target.value))}
            className="range-accent mt-3 w-full"
            aria-label={input.label}
          />
          {input.note && <span className="mt-2 block text-[11px] leading-snug text-faint">{input.note}</span>}
        </label>
      ))}
    </div>
  );
}

/* Le raisonnement, de haut en bas : on doit pouvoir suivre d'où vient
   chaque chiffre sans jamais avoir à revenir en arrière. */
function Chain({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-1.5 lg:items-start">{children}</div>;
}

function Line({
  value,
  label,
  strong,
  accent,
}: {
  value: string;
  label: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-wrap items-baseline gap-x-2 rounded-xl px-3.5 py-2.5 ${
        accent
          ? "border border-accent/40 bg-accent-soft"
          : strong
            ? "border border-hairline-strong bg-void/40"
            : "bg-white/[0.03]"
      }`}
    >
      <span
        className={`font-display font-bold tabular-nums ${
          accent ? "text-[19px] text-ink" : strong ? "text-[17px] text-ink" : "text-[15px] text-[#e4e5f5]"
        }`}
      >
        {value}
      </span>
      <span className="text-[11.5px] text-muted">{label}</span>
    </div>
  );
}

function Op({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pl-3.5 text-[10.5px] uppercase tracking-[0.08em] text-faint">
      <span className="text-[11px]">↓</span>
      {children}
    </div>
  );
}
