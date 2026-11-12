"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Moon, Paperclip, Send } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Les petits films des produits.
 *
 * Chaque film raconte une histoire courte, en plusieurs plans, comme une vidéo
 * de démonstration : une candidature arrive, Helpify échange, des repères
 * annotés relient ce qui a été dit à ce qui est retenu, puis le résultat
 * attend la validation de vos RH. D'un plan à l'autre, la scène passe par un
 * flou ; les éléments secondaires restent flous à l'arrière-plan.
 *
 * Tout est dessiné dans un plan fixe (W × H), mis à l'échelle de la place
 * disponible : les repères et leurs traits tombent toujours au bon endroit.
 * Les contenus viennent des exemples du site (poste, critères, échanges, Sarah
 * K.) ; rien n'est inventé pour l'animation.
 *
 * Un film ne joue que lorsqu'il est à l'écran. Qui a demandé moins de
 * mouvement voit son plan le plus parlant, immobile.
 */

const W = 460;
const H = 470;
const BLEU = "#2f6bff";

type Plan = { duree: number; etapes: number; rendu: (e: number) => ReactNode };

/* ── Le moteur ──────────────────────────────────────────────────────── */

function Film({ plans, fixe }: { plans: Plan[]; fixe: number }) {
  const cadre = useRef<HTMLDivElement>(null);
  const [echelle, setEchelle] = useState(1);
  const [plan, setPlan] = useState(fixe);
  const [etape, setEtape] = useState(plans[fixe].etapes);

  // Mise à l'échelle du plan fixe sur la largeur disponible.
  useEffect(() => {
    const el = cadre.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEchelle(Math.min(1.15, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = cadre.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    let actif = false;
    let k = 0;
    let e = 0;
    const avance = () => {
      setPlan(k);
      setEtape(e);
      const p = plans[k];
      t = window.setTimeout(() => {
        e += 1;
        if (e > p.etapes) {
          k = (k + 1) % plans.length;
          e = 0;
        }
        if (actif) avance();
      }, e === 0 ? 450 : p.duree / p.etapes);
    };
    const io = new IntersectionObserver(
      ([x]) => {
        if (x.isIntersecting && !actif) {
          actif = true;
          k = 0;
          e = 0;
          avance();
        } else if (!x.isIntersecting && actif) {
          actif = false;
          window.clearTimeout(t);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
    // Les plans sont construits une fois par rendu de la page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={cadre} className="w-full" aria-hidden="true">
      <div className="relative mx-auto overflow-hidden" style={{ width: W * echelle, height: H * echelle }}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${echelle})` }}>
          {plans.map((p, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-[opacity,filter,transform] duration-700 ease-out"
              style={{
                opacity: i === plan ? 1 : 0,
                filter: i === plan ? "blur(0px)" : "blur(10px)",
                transform: i === plan ? "scale(1)" : "scale(0.97)",
              }}
            >
              {p.rendu(i === plan ? etape : 0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Les éléments ───────────────────────────────────────────────────── */

const vu = (ok: boolean): CSSProperties => ({
  opacity: ok ? 1 : 0,
  transform: ok ? "translateY(0)" : "translateY(8px)",
  transition: "opacity .5s ease-out, transform .5s ease-out",
});

function Carte({ x, y, w, h, flou = false, children, style }: { x: number; y: number; w: number; h?: number; flou?: boolean; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="absolute rounded-[10px] border border-[#ececea] bg-white"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        boxShadow: "0 18px 40px -22px rgba(18,18,20,0.28)",
        filter: flou ? "blur(3px)" : undefined,
        opacity: flou ? 0.55 : 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Des lignes grises : le texte que l'on ne lit pas. */
function Squelette({ lignes = 3, largeurs = [92, 78, 60] }: { lignes?: number; largeurs?: number[] }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lignes }, (_, i) => (
        <span key={i} className="block h-[7px] rounded-full bg-[#eeeeec]" style={{ width: `${largeurs[i % largeurs.length]}%` }} />
      ))}
    </div>
  );
}

function Entete({ titre, droite }: { titre: string; droite?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-[#f0f0ee] px-4 py-2.5 text-[11px] text-[#8b887f]">
      <span className="truncate">{titre}</span>
      {droite}
    </div>
  );
}

function Points() {
  return (
    <span className="flex w-max items-center gap-1 rounded-[12px] bg-[#f3f3f1] px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-[#9a978f]" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function Bulle({ helpify, children, ok }: { helpify: boolean; children: ReactNode; ok: boolean }) {
  return (
    <p
      className={`max-w-[84%] rounded-[12px] px-3.5 py-2.5 text-[12.5px] leading-snug ${
        helpify ? "rounded-bl-[3px] bg-[#121214] text-white" : "self-end rounded-br-[3px] bg-[#f3f3f1] text-[#121214]"
      }`}
      style={vu(ok)}
    >
      {children}
    </p>
  );
}

/**
 * Un repère annoté : une petite étiquette (point bleu, intitulé, valeur) et le
 * trait fin qui la relie à ce qu'elle désigne.
 */
function Repere({ x, y, vers, titre, valeur, ok }: { x: number; y: number; vers: [number, number]; titre: string; valeur?: string; ok: boolean }) {
  const [vx, vy] = vers;
  const L = Math.hypot(vx - x, vy - y) + 40;
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 overflow-visible" width={W} height={H}>
        <path
          d={`M${x} ${y} C${(x + vx) / 2} ${y} ${(x + vx) / 2} ${vy} ${vx} ${vy}`}
          fill="none"
          stroke={BLEU}
          strokeWidth="1"
          strokeDasharray={L}
          strokeDashoffset={ok ? 0 : L}
          style={{ transition: "stroke-dashoffset .7s ease-out" }}
        />
        <circle cx={vx} cy={vy} r={ok ? 3.5 : 0} fill="white" stroke={BLEU} strokeWidth="1.5" style={{ transition: "r .3s .5s" }} />
      </svg>
      <div
        className="absolute rounded-[8px] border border-[#ececea] bg-white px-2.5 py-1.5 shadow-[0_10px_24px_-14px_rgba(18,18,20,0.35)]"
        style={{ left: x, top: y, transform: "translate(-50%, -50%)", ...vu(ok) }}
      >
        <span className="flex items-center gap-1.5 text-[10px] text-[#8b887f]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLEU }} />
          {titre}
        </span>
        {valeur && <span className="mt-0.5 block whitespace-nowrap text-[12px] font-medium text-[#121214]">{valeur}</span>}
      </div>
    </>
  );
}

function Pastille({ sombre = false, children, ok = true }: { sombre?: boolean; children: ReactNode; ok?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-medium ${
        sombre ? "bg-[#121214] text-white" : "border border-[#dcdcd8] text-[#121214]"
      }`}
      style={vu(ok)}
    >
      {children}
    </span>
  );
}

/** Le plan final commun : la ligne du candidat nette, les autres floues. */
function Statut({ titre, sous, badges, e }: { titre: string; sous: string; badges: [string, string]; e: number }) {
  return (
    <>
      <Carte x={36} y={150} w={388} h={64} flou>
        <div className="p-4">
          <Squelette lignes={2} largeurs={[46, 30]} />
        </div>
      </Carte>
      <Carte x={20} y={228} w={420} style={vu(e >= 1)}>
        <div className="flex items-center gap-3 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#121214] text-[11px] font-medium text-white">SK</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13.5px] font-medium text-[#121214]">{titre}</span>
            <span className="block truncate text-[11.5px] text-[#8b887f]">{sous}</span>
          </span>
          <span className="flex flex-col items-end gap-1">
            <Pastille sombre ok={e >= 1}>
              <Check size={10} strokeWidth={3} />
              {badges[0]}
            </Pastille>
            <Pastille ok={e >= 2}>{badges[1]}</Pastille>
          </span>
        </div>
      </Carte>
      <Carte x={36} y={330} w={388} h={64} flou>
        <div className="p-4">
          <Squelette lignes={2} largeurs={[52, 34]} />
        </div>
      </Carte>
    </>
  );
}

const MOTS = {
  fr: {
    nouvelle: "Nouvelle candidature",
    pieces: ["CV.pdf", "Profil LinkedIn"],
    conversation: "Conversation · Helpify",
    fiche: "Fiche candidat",
    collecte: "Collectée",
    complete: "Fiche complète",
    valider: "À valider par vous",
    criteres: "Critères et importance",
    reponse: "Réponse du candidat",
    evalue: "Évalué",
    evaluation: "Évaluation",
    vivier: "Vivier · offres d'emploi",
    rapproche: "Rapprochée",
    offres: "autres offres",
    question: "Posez votre question…",
    nuit: "En pleine nuit",
    repondu: "Répondu",
    h24: "24h/24",
    passages: ["écrit les process, recruté trois personnes", "suivi de satisfaction"],
  },
  en: {
    nouvelle: "New application",
    pieces: ["CV.pdf", "LinkedIn profile"],
    conversation: "Conversation · Helpify",
    fiche: "Candidate profile",
    collecte: "Collected",
    complete: "Profile complete",
    valider: "For you to validate",
    criteres: "Criteria and weight",
    reponse: "Candidate's answer",
    evalue: "Assessed",
    evaluation: "Assessment",
    vivier: "Talent pool · open roles",
    rapproche: "Matched",
    offres: "other roles",
    question: "Ask your question…",
    nuit: "In the middle of the night",
    repondu: "Answered",
    h24: "24/7",
    passages: ["wrote the processes, hired three people", "satisfaction tracking"],
  },
} as const;

/** Met en évidence, dans un texte, les passages donnés, un par un. */
function Surligne({ texte, passages, actifs }: { texte: string; passages: readonly string[]; actifs: number }) {
  const morceaux: ReactNode[] = [];
  let reste = texte;
  passages.forEach((p, i) => {
    const k = reste.indexOf(p);
    if (k < 0) return;
    morceaux.push(reste.slice(0, k));
    morceaux.push(
      <span
        key={p}
        className="rounded-[3px] transition-colors duration-500"
        style={{ background: i < actifs ? "rgba(47,107,255,0.12)" : "transparent", boxShadow: i < actifs ? `inset 0 -1px 0 ${BLEU}` : "none" }}
      >
        {p}
      </span>,
    );
    reste = reste.slice(k + p.length);
  });
  morceaux.push(reste);
  return <>{morceaux}</>;
}

/* ── Les quatre films ───────────────────────────────────────────────── */

function usePoste(locale: Locale) {
  const d = dict(locale);
  const besoin = d.processSteps.find((s) => s.key === "besoin");
  const echange = d.processSteps.find((s) => s.key === "reponses");
  return {
    d,
    role: besoin && "role" in besoin ? besoin.role : "",
    roleLabel: besoin && "roleLabel" in besoin ? besoin.roleLabel : "",
    criteres: besoin && "fields" in besoin ? besoin.fields : [],
    echange: echange && "messages" in echange ? echange.messages : [],
  };
}

export function PrequalFilm({ locale }: { locale: Locale }) {
  const { d, role } = usePoste(locale);
  const m = MOTS[locale];
  const { prequal, score } = d.products.demo;
  const [q, r] = prequal.messages;
  const nom = score.candidate;
  const heure = d.products.demo.ask.hours[0];
  const plans: Plan[] = [
    {
      duree: 2600,
      etapes: 3,
      rendu: (e) => (
        <>
          <Carte x={40} y={110} w={380} h={70} flou>
            <div className="p-4">
              <Squelette lignes={2} largeurs={[55, 35]} />
            </div>
          </Carte>
          <Carte x={20} y={190} w={420} style={vu(e >= 1)}>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3f3f1] text-[11px] font-medium text-[#121214]">SK</span>
                <span className="flex-1">
                  <span className="block text-[11px] text-[#8b887f]">{m.nouvelle}</span>
                  <span className="block text-[14px] font-medium text-[#121214]">
                    {nom} · {role}
                  </span>
                </span>
                <span className="text-[11px] tabular-nums text-[#8b887f]">{heure}</span>
              </div>
              <div className="mt-4 flex gap-2">
                {m.pieces.map((p, i) => (
                  <span key={p} className="flex items-center gap-1.5 rounded-[6px] border border-[#ececea] px-2.5 py-2 text-[11.5px] text-[#121214]" style={vu(e >= 2 + i)}>
                    <Paperclip size={12} className="text-[#8b887f]" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Carte>
          <Carte x={40} y={330} w={380} h={70} flou>
            <div className="p-4">
              <Squelette lignes={2} largeurs={[48, 30]} />
            </div>
          </Carte>
        </>
      ),
    },
    {
      duree: 5200,
      etapes: 5,
      rendu: (e) => (
        <>
          <Carte x={20} y={60} w={420} h={250}>
            <Entete titre={m.conversation} droite={<span className="tabular-nums">{heure}</span>} />
            <div className="flex flex-col gap-2.5 p-4">
              {e === 1 ? <Points /> : <Bulle helpify ok={e >= 2}>{q.text}</Bulle>}
              {e === 3 ? <span className="self-end"><Points /></span> : <Bulle helpify={false} ok={e >= 4}>{r.text}</Bulle>}
            </div>
          </Carte>
          <Repere x={300} y={400} vers={[392, 172]} titre={prequal.extracted[0]} valeur={r.text} ok={e >= 5} />
        </>
      ),
    },
    {
      duree: 3600,
      etapes: prequal.extracted.length,
      rendu: (e) => (
        <Carte x={20} y={80} w={420}>
          <Entete titre={`${m.fiche} · ${nom}`} />
          <ul className="flex flex-col gap-2 p-4">
            {prequal.extracted.map((x, i) => {
              const ok = e >= i + 1;
              return (
                <li key={x} className="flex items-center justify-between rounded-[8px] border px-3 py-2.5 text-[12.5px] transition-colors duration-500" style={{ borderColor: ok ? "rgba(47,107,255,0.35)" : "#ececea", background: ok ? "rgba(47,107,255,0.05)" : "white" }}>
                  <span className={ok ? "text-[#121214]" : "text-[#9a978f]"}>
                    {x}
                    {i === 0 && <span className="ml-2 font-medium" style={vu(ok)}>{r.text}</span>}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: BLEU, ...vu(ok) }}>
                    {m.collecte}
                    <span className="grid h-4 w-4 place-items-center rounded-full text-white" style={{ background: BLEU }}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Carte>
      ),
    },
    { duree: 3200, etapes: 2, rendu: (e) => <Statut titre={nom} sous={role} badges={[m.complete, m.valider]} e={e} /> },
  ];
  return <Film plans={plans} fixe={2} />;
}

export function MatchingFilm({ locale }: { locale: Locale }) {
  const { d, role, criteres, echange } = usePoste(locale);
  const m = MOTS[locale];
  const { score } = d.products.demo;
  const reponse = echange[1]?.text ?? "";
  const R = 34;
  const C = 2 * Math.PI * R;
  const plans: Plan[] = [
    {
      duree: 3000,
      etapes: criteres.length,
      rendu: (e) => (
        <Carte x={20} y={90} w={420}>
          <Entete titre={`${m.criteres} · ${role}`} />
          <ul className="flex flex-col gap-2 p-4">
            {criteres.map((c, i) => (
              <li key={c.label} className="flex items-center justify-between rounded-[8px] border border-[#ececea] px-3 py-2.5 text-[12.5px] text-[#121214]" style={vu(e >= i + 1)}>
                {c.label}
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]">{c.weight}</span>
              </li>
            ))}
          </ul>
        </Carte>
      ),
    },
    {
      duree: 4800,
      etapes: 3,
      rendu: (e) => (
        <>
          <Carte x={20} y={70} w={420}>
            <Entete titre={`${m.reponse} · ${score.candidate}`} />
            <p className="p-4 text-[14px] leading-relaxed text-[#121214]">
              <Surligne texte={reponse} passages={m.passages} actifs={e} />
            </p>
          </Carte>
          <Repere x={130} y={320} vers={[120, 150]} titre={m.evalue} valeur={criteres[1]?.label} ok={e >= 1} />
          <Repere x={290} y={385} vers={[300, 176]} titre={m.evalue} valeur={criteres[0]?.label} ok={e >= 2} />
        </>
      ),
    },
    {
      duree: 4200,
      etapes: score.rows.length + 1,
      rendu: (e) => (
        <Carte x={20} y={70} w={420}>
          <Entete titre={`${m.evaluation} · ${role}`} />
          <div className="flex items-center gap-4 border-b border-[#f0f0ee] p-4">
            <div className="relative h-[84px] w-[84px]">
              <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
                <circle cx="42" cy="42" r={R} fill="none" stroke="#eeeeec" strokeWidth="6" />
                <circle cx="42" cy="42" r={R} fill="none" stroke="#121214" strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={e >= 1 ? C * (1 - score.value / 100) : C} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)" }} />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[22px] font-medium text-[#121214]" style={vu(e >= 1)}>
                {score.value}
              </span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#121214]">{score.candidate}</p>
              <p className="text-[11px] text-[#8b887f]">/ 100</p>
            </div>
          </div>
          <dl className="flex flex-col gap-1 p-4">
            {score.rows.map((row, i) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 py-1.5" style={vu(e >= i + 2)}>
                <dt className="text-[11.5px] text-[#8b887f]">{row.label}</dt>
                <dd className="text-right text-[12.5px] font-medium text-[#121214]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Carte>
      ),
    },
    { duree: 3200, etapes: 2, rendu: (e) => <Statut titre={`${score.candidate} · ${score.value}/100`} sous={role} badges={[m.evaluation, m.valider]} e={e} /> },
  ];
  return <Film plans={plans} fixe={2} />;
}

export function SynergiesFilm({ locale }: { locale: Locale }) {
  const { d } = usePoste(locale);
  const m = MOTS[locale];
  const { synergies } = d.products.demo;
  const [premier, ...autres] = synergies.roles;
  const CX = W / 2;
  const CY = 250;
  const points = autres.map((_, i) => {
    const a = (i / autres.length) * Math.PI * 2 - Math.PI / 2;
    return { x: CX + Math.cos(a) * 132, y: CY + Math.sin(a) * 150 };
  });
  const plans: Plan[] = [
    {
      duree: 2400,
      etapes: 2,
      rendu: (e) => (
        <Carte x={50} y={200} w={360} style={vu(e >= 1)}>
          <div className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#121214] text-[12px] font-medium text-white">SK</span>
            <span className="flex-1">
              <span className="block text-[14px] font-medium text-[#121214]">{synergies.center}</span>
              <span className="block text-[11.5px] text-[#8b887f]">{premier}</span>
            </span>
            <Pastille ok={e >= 2}>{m.vivier.split(" · ")[0]}</Pastille>
          </div>
        </Carte>
      ),
    },
    {
      duree: 5200,
      etapes: autres.length,
      rendu: (e) => (
        <>
          <svg className="absolute inset-0" width={W} height={H}>
            {points.map((p, i) => {
              const L = Math.hypot(p.x - CX, p.y - CY);
              return (
                <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={BLEU} strokeOpacity={0.5} strokeWidth="1" strokeDasharray={L} strokeDashoffset={e >= i + 1 ? 0 : L} style={{ transition: "stroke-dashoffset .6s ease-out" }} />
              );
            })}
          </svg>
          {points.map((p, i) => (
            <span
              key={autres[i]}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[8px] border bg-white px-3 py-2 text-[12px] transition-all duration-500"
              style={{
                left: p.x,
                top: p.y,
                borderColor: e >= i + 1 ? "rgba(47,107,255,0.4)" : "#ececea",
                color: e >= i + 1 ? "#121214" : "#b3b0a8",
                boxShadow: e >= i + 1 ? "0 10px 24px -14px rgba(47,107,255,0.6)" : "none",
              }}
            >
              {autres[i]}
            </span>
          ))}
          <span className="absolute grid h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#121214] text-[12.5px] font-medium text-white shadow-[0_0_0_10px_rgba(18,18,20,0.06)]" style={{ left: CX, top: CY }}>
            {synergies.center}
          </span>
        </>
      ),
    },
    {
      duree: 3200,
      etapes: 2,
      rendu: (e) => (
        <Statut titre={`${synergies.center} · ${autres.length} ${m.offres}`} sous={autres.slice(0, 3).join(" · ")} badges={[m.rapproche, m.valider]} e={e} />
      ),
    },
  ];
  return <Film plans={plans} fixe={1} />;
}

export function AskFilm({ locale }: { locale: Locale }) {
  const { d, role, roleLabel } = usePoste(locale);
  const m = MOTS[locale];
  const { ask } = d.products.demo;
  const [q1, r1, q2, r2] = ask.messages;
  const plans: Plan[] = [
    {
      duree: 3000,
      etapes: 3,
      rendu: (e) => (
        <Carte x={20} y={90} w={420}>
          <div className="p-5">
            <p className="text-[11px] text-[#8b887f]">{roleLabel}</p>
            <p className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-[#121214]">{role}</p>
            <div className="mt-4">
              <Squelette lignes={4} largeurs={[96, 88, 92, 54]} />
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-[8px] border border-[#e4e4e0] px-3 py-2.5">
              <span className="flex-1 truncate text-[12.5px]" style={{ color: e >= 2 ? "#121214" : "#a9a69e" }}>
                {e >= 2 ? q1.text : m.question}
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#121214] text-white" style={{ transform: e >= 3 ? "scale(0.9)" : "scale(1)", transition: "transform .2s" }}>
                <Send size={13} />
              </span>
            </div>
          </div>
        </Carte>
      ),
    },
    {
      duree: 3600,
      etapes: 3,
      rendu: (e) => (
        <Carte x={20} y={90} w={420} h={260}>
          <Entete titre={`Talent Ask · ${role}`} droite={<span className="tabular-nums">{ask.hours[0]}</span>} />
          <div className="flex flex-col gap-2.5 p-4">
            <Bulle helpify={false} ok>{q1.text}</Bulle>
            {e === 1 ? <Points /> : <Bulle helpify ok={e >= 2}>{r1.text}</Bulle>}
          </div>
        </Carte>
      ),
    },
    {
      duree: 4000,
      etapes: 4,
      rendu: (e) => (
        <>
          <Carte x={20} y={90} w={420} h={260}>
            <Entete
              titre={`Talent Ask · ${role}`}
              droite={
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Moon size={12} />
                  {ask.hours[2]}
                </span>
              }
            />
            <div className="flex flex-col gap-2.5 p-4">
              <Bulle helpify={false} ok={e >= 1}>{q2.text}</Bulle>
              {e === 2 ? <Points /> : <Bulle helpify ok={e >= 3}>{r2.text}</Bulle>}
            </div>
          </Carte>
          <Repere x={330} y={395} vers={[400, 108]} titre={m.nuit} valeur={ask.hours[2]} ok={e >= 4} />
        </>
      ),
    },
    {
      duree: 3200,
      etapes: ask.hours.length,
      rendu: (e) => (
        <Carte x={40} y={130} w={380}>
          <Entete titre={`Talent Ask · ${role}`} droite={<span>{m.h24}</span>} />
          <ul className="flex flex-col gap-2 p-4">
            {ask.hours.map((h, i) => (
              <li key={h} className="flex items-center justify-between rounded-[8px] border border-[#ececea] px-3 py-2.5 text-[12.5px]" style={vu(e >= i + 1)}>
                <span className="tabular-nums text-[#121214]">{h}</span>
                <Pastille sombre>
                  <Check size={10} strokeWidth={3} />
                  {m.repondu}
                </Pastille>
              </li>
            ))}
          </ul>
        </Carte>
      ),
    },
  ];
  return <Film plans={plans} fixe={2} />;
}

const FILMS = {
  "chat-extract": PrequalFilm,
  score: MatchingFilm,
  constellation: SynergiesFilm,
  ask: AskFilm,
} as const;

/** Le film d'un produit, choisi par son type d'illustration (voir scenes.tsx). */
export function ProductFilm({ visual, locale }: { visual: keyof typeof FILMS; locale: Locale }) {
  const F = FILMS[visual];
  return <F locale={locale} />;
}
