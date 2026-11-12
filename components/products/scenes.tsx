"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Les quatre produits en action : pour chacun, une fenêtre de la plateforme
 * qui joue seule, en boucle, ce que fait le produit.
 *
 *  — Préqualification : Helpify pose sa question, le candidat répond, et la
 *    fiche se remplit des informations collectées.
 *  — Matching : l'évaluation du candidat se calcule et ses points apparaissent.
 *  — 360 Matching : le même profil se relie, un à un, aux autres postes.
 *  — Talent Ask : le candidat pose ses questions, à n'importe quelle heure, et
 *    Helpify répond.
 *
 * Ce ne sont pas des fichiers vidéo mais des scènes écrites : nettes à toute
 * taille, légères, traduites avec le reste du site. Tout le texte vient des
 * exemples de la page produits ; rien n'est inventé pour l'animation.
 *
 * Une scène ne démarre que lorsqu'elle est à l'écran, et s'arrête quand on la
 * quitte. Qui a demandé moins de mouvement la voit d'emblée dans son état
 * final.
 */

/** Fait avancer une scène d'étape en étape, en boucle, tant qu'elle est visible. */
function useScene(temps: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [etape, setEtape] = useState(temps.length - 1);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    let n = 0;
    let actif = false;
    const suivant = () => {
      setEtape(n);
      t = window.setTimeout(() => {
        n = (n + 1) % temps.length;
        if (actif) suivant();
      }, temps[n]);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !actif) {
          actif = true;
          n = 0;
          suivant();
        } else if (!e.isIntersecting && actif) {
          actif = false;
          window.clearTimeout(t);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
    // Les durées sont des constantes de module.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, etape };
}

/** Classe d'apparition : invisible et un peu plus bas avant son tour. */
const montre = (visible: boolean) =>
  `transition-[opacity,transform] duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;

/** La fenêtre de la plateforme : barre de titre, puis la scène. */
function Fenetre({ titre, etiquette, children }: { titre: string; etiquette?: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-[18px] border border-hairline bg-white text-left shadow-[0_30px_70px_-34px_rgba(14,22,68,0.45)]">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
        <span className="ml-2 truncate text-[12px] text-faint">{titre}</span>
        {etiquette && (
          <span className="ml-auto shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-accent">{etiquette}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function Points({ cote }: { cote: "helpify" | "candidate" }) {
  return (
    <span
      className={`flex w-max items-center gap-1.5 rounded-2xl px-4 py-3 ${
        cote === "helpify" ? "rounded-bl-md bg-accent-soft text-accent" : "self-end rounded-br-md bg-[#f1f3f9] text-faint"
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-current" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function Bulle({ from, children, visible, ton = "accent" }: { from: string; children: ReactNode; visible: boolean; ton?: "accent" | "iris" }) {
  const helpify = from === "helpify";
  return (
    <p
      className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${montre(visible)} ${
        helpify
          ? `rounded-bl-md text-white ${ton === "iris" ? "bg-iris" : "bg-accent"}`
          : "self-end rounded-br-md bg-[#f1f3f9] text-ink"
      }`}
    >
      {children}
    </p>
  );
}

const MOTS = {
  fr: {
    candidature: "Candidature · Customer Success Manager",
    fiche: "Fiche candidat",
    evaluation: "Évaluation",
    vivier: "Vivier · offres d'emploi",
    talentAsk: "Talent Ask · questions du candidat",
    h24: "24h/24",
  },
  en: {
    candidature: "Application · Customer Success Manager",
    fiche: "Candidate profile",
    evaluation: "Assessment",
    vivier: "Talent pool · open roles",
    talentAsk: "Talent Ask · candidate questions",
    h24: "24/7",
  },
} as const;

/* ── Préqualification ───────────────────────────────────────────────── */
const T_PREQUAL = [600, 1200, 1500, 1000, 1300, 650, 650, 650, 3600];

export function PrequalScene({ locale }: { locale: Locale }) {
  const { prequal } = dict(locale).products.demo;
  const m = MOTS[locale];
  const { ref, etape } = useScene(T_PREQUAL);
  const [question, reponse] = prequal.messages;
  return (
    <div ref={ref} className="flex w-full justify-center" aria-hidden="true">
      <Fenetre titre={m.candidature}>
        <div className="grid min-h-[300px] sm:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-2.5 border-b border-hairline p-4 sm:border-b-0 sm:border-r">
            {etape === 1 ? <Points cote="helpify" /> : <Bulle from="helpify" visible={etape >= 2}>{question.text}</Bulle>}
            {etape === 3 ? <Points cote="candidate" /> : <Bulle from="candidate" visible={etape >= 4}>{reponse.text}</Bulle>}
          </div>
          <div className="p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-faint">{m.fiche}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {prequal.extracted.map((x, i) => {
                const fait = etape >= 4 + i;
                return (
                  <li
                    key={x}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-[12.5px] transition-colors duration-500 ${
                      fait ? "border-accent/30 bg-accent-soft text-ink" : "border-hairline text-faint"
                    }`}
                  >
                    <span>
                      {x}
                      {i === 0 && fait && <span className="mt-0.5 block text-[12px] font-semibold text-accent">{reponse.text}</span>}
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                        fait ? "scale-100 bg-accent text-white" : "scale-75 bg-[#eceff7] text-transparent"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Fenetre>
    </div>
  );
}

/* ── Matching ───────────────────────────────────────────────────────── */
const T_SCORE = [500, 1700, 600, 600, 600, 600, 3800];

export function ScoreScene({ locale }: { locale: Locale }) {
  const { score } = dict(locale).products.demo;
  const m = MOTS[locale];
  const { ref, etape } = useScene(T_SCORE);
  const R = 30;
  const C = 2 * Math.PI * R;
  const rempli = etape >= 1;
  return (
    <div ref={ref} className="flex w-full justify-center" aria-hidden="true">
      <Fenetre titre={m.candidature} etiquette={m.evaluation}>
        <div className="min-h-[300px] p-5">
          <div className="flex items-center gap-4 border-b border-hairline pb-4">
            <div className="relative h-[76px] w-[76px] shrink-0">
              <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
                <circle cx="38" cy="38" r={R} fill="none" stroke="rgba(14,22,68,0.08)" strokeWidth="6" />
                <circle
                  cx="38"
                  cy="38"
                  r={R}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={rempli ? C * (1 - score.value / 100) : C}
                  style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1)" }}
                />
              </svg>
              <span className={`absolute inset-0 grid place-items-center font-display text-[20px] font-bold text-ink ${montre(rempli)}`}>
                {score.value}
              </span>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink">{score.candidate}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-faint">{m.evaluation}</p>
            </div>
          </div>
          <dl className="mt-4 flex flex-col gap-2">
            {score.rows.map((row, i) => (
              <div key={row.label} className={`flex items-baseline justify-between gap-4 rounded-lg px-1 py-1.5 ${montre(etape >= 2 + i)}`}>
                <dt className="text-[12px] text-faint">{row.label}</dt>
                <dd className="text-right text-[12.5px] font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Fenetre>
    </div>
  );
}

/* ── 360 Matching ───────────────────────────────────────────────────── */
const T_SYNERGIES = [500, 700, 700, 700, 700, 700, 700, 3600];

export function SynergiesScene({ locale }: { locale: Locale }) {
  const { synergies } = dict(locale).products.demo;
  const m = MOTS[locale];
  const { ref, etape } = useScene(T_SYNERGIES);
  const W = 480;
  const H = 300;
  const roles = synergies.roles;
  const points = roles.map((_, i) => {
    const a = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
    return { x: W / 2 + Math.cos(a) * 170, y: H / 2 + Math.sin(a) * 108 };
  });
  return (
    <div ref={ref} className="flex w-full justify-center" aria-hidden="true">
      <Fenetre titre={m.vivier}>
        <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
            {points.map((p, i) => {
              const L = Math.hypot(p.x - W / 2, p.y - H / 2);
              const relie = etape >= 1 + i;
              return (
                <line
                  key={i}
                  x1={W / 2}
                  y1={H / 2}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--accent)"
                  strokeOpacity={0.45}
                  strokeWidth={1.5}
                  strokeDasharray={L}
                  strokeDashoffset={relie ? 0 : L}
                  style={{ transition: "stroke-dashoffset .6s ease-out" }}
                />
              );
            })}
          </svg>
          {points.map((p, i) => {
            const relie = etape >= 1 + i;
            return (
              <span
                key={roles[i]}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] transition-all duration-500 ${
                  relie ? "border-accent/35 bg-white text-ink shadow-[0_6px_16px_-8px_rgba(29,80,254,0.5)]" : "border-hairline bg-[#f6f7fb] text-faint"
                }`}
                style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
              >
                {roles[i]}
              </span>
            );
          })}
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-[12px] font-semibold text-white ring-8 ring-accent/15">
            {synergies.center}
          </span>
        </div>
      </Fenetre>
    </div>
  );
}

/* ── Talent Ask ─────────────────────────────────────────────────────── */
const T_ASK = [500, 1100, 1200, 1500, 1400, 1100, 1200, 1500, 3600];

function Question({ texte, heure, visible }: { texte: string; heure: string; visible: boolean }) {
  return (
    <div className={`flex flex-col items-end gap-1 ${montre(visible)}`}>
      <p className="max-w-[86%] rounded-2xl rounded-br-md bg-[#f1f3f9] px-4 py-2.5 text-[13px] leading-snug text-ink">{texte}</p>
      <span className="text-[10.5px] tabular-nums text-faint">{heure}</span>
    </div>
  );
}

export function AskScene({ locale }: { locale: Locale }) {
  const { ask } = dict(locale).products.demo;
  const m = MOTS[locale];
  const { ref, etape } = useScene(T_ASK);
  const [q1, r1, q2, r2] = ask.messages;
  // Les questions arrivent à toute heure : la première en journée, la
  // seconde en pleine nuit.
  const heures = [ask.hours[0], ask.hours[2]];
  return (
    <div ref={ref} className="flex w-full justify-center" aria-hidden="true">
      <Fenetre titre={m.talentAsk} etiquette={m.h24}>
        <div className="flex min-h-[300px] flex-col gap-2.5 p-4">
          {etape === 1 ? <Points cote="candidate" /> : <Question texte={q1.text} heure={heures[0]} visible={etape >= 2} />}
          {etape === 3 ? <Points cote="helpify" /> : <Bulle from="helpify" ton="iris" visible={etape >= 4}>{r1.text}</Bulle>}
          {etape === 5 ? <Points cote="candidate" /> : <Question texte={q2.text} heure={heures[1]} visible={etape >= 6} />}
          {etape === 7 ? <Points cote="helpify" /> : <Bulle from="helpify" ton="iris" visible={etape >= 8}>{r2.text}</Bulle>}
        </div>
      </Fenetre>
    </div>
  );
}

const SCENES = {
  "chat-extract": PrequalScene,
  score: ScoreScene,
  constellation: SynergiesScene,
  ask: AskScene,
} as const;

/**
 * La scène d'un produit, choisie par son type d'illustration. Le choix se fait
 * ici, côté navigateur : une page rendue sur le serveur ne peut pas piocher
 * elle-même dans un objet de composants clients.
 */
export function ProductScene({ visual, locale }: { visual: keyof typeof SCENES; locale: Locale }) {
  const Scene = SCENES[visual];
  return <Scene locale={locale} />;
}
