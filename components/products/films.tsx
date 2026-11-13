"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Mic, Moon, Paperclip } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
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

/** Un plan : ses étapes, leur durée (uniforme, ou une par étape) et son dessin. */
type Plan = { duree: number; etapes: number; temps?: number[]; rendu: (e: number) => ReactNode };

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
      }, e === 0 ? 450 : (p.temps?.[e - 1] ?? p.duree / p.etapes));
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

/* ── Le mode oral ────────────────────────────────────────────────────── */

/** Les barres d'une voix qui parle ; immobiles et basses quand elle se tait. */
function Onde({ parle, clair = false }: { parle: boolean; clair?: boolean }) {
  return (
    <span className="flex h-5 items-center gap-[3px]">
      {[0.55, 0.9, 0.7, 1, 0.6, 0.85, 0.5].map((h, i) => (
        <span
          key={i}
          className={`block w-[3px] rounded-full ${parle ? "voix-barre" : ""} ${clair ? "bg-white" : "bg-[#121214]"}`}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.11}s`, transform: parle ? undefined : "scaleY(0.25)" }}
        />
      ))}
    </span>
  );
}

/** L'orbe de Helpify, comme en mode vocal : des anneaux s'en échappent quand il parle. */
function Orbe({ parle, taille = 64 }: { parle: boolean; taille?: number }) {
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: taille, height: taille }}>
      {parle && (
        <>
          <span className="absolute -inset-2 rounded-full bg-[#121214]/10" />
          <span className="voix-anneau absolute inset-0 rounded-full border-2 border-[#121214]" />
          <span className="voix-anneau absolute inset-0 rounded-full border-2 border-[#121214]" style={{ animationDelay: "0.8s" }} />
        </>
      )}
      <span className="relative grid h-full w-full place-items-center rounded-full bg-[#121214] text-white">
        {parle ? <Onde parle clair /> : <LogoMark size={taille * 0.42} />}
      </span>
    </span>
  );
}

/** Une transcription qui s'écrit mot à mot pendant que la personne parle. */
function Transcription({ texte, enCours }: { texte: string; enCours: boolean }) {
  const mots = texte.split(" ");
  const [n, setN] = useState(enCours ? 0 : mots.length);
  useEffect(() => {
    if (!enCours) return;
    const t = window.setInterval(() => setN((x) => (x >= mots.length ? x : x + 1)), 150);
    return () => window.clearInterval(t);
  }, [enCours, mots.length]);
  return (
    <>
      {mots.slice(0, n).join(" ")}
      {enCours && n < mots.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" />}
    </>
  );
}

type Tour = { qui: "helpify" | "candidat"; texte: string };

/**
 * Un appel en cours : en haut, qui parle (l'orbe de Helpify ou le candidat,
 * avec l'onde de sa voix) ; dessous, la transcription qui s'écrit.
 * `tours` sont les répliques déjà commencées ; la dernière est en cours tant
 * que `fini` est faux.
 */
function Appel({ titre, heure, tours, fini, nom, mots, nuit = false }: { titre: string; heure: string; tours: Tour[]; fini: boolean; nom: string; mots: { parle: string; direct: string }; nuit?: boolean }) {
  const enCours = tours.length > 0 && !fini ? tours[tours.length - 1] : null;
  const helpifyParle = enCours?.qui === "helpify";
  const candidatParle = enCours?.qui === "candidat";
  return (
    <Carte x={20} y={40} w={420}>
      <Entete
        titre={titre}
        droite={
          <span className="flex items-center gap-1.5 tabular-nums">
            {nuit && <Moon size={12} />}
            <span className="h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
            {mots.direct} · {heure}
          </span>
        }
      />
      <div className="flex items-center justify-around border-b border-[#f0f0ee] px-6 py-6">
        <span className="flex flex-col items-center gap-2.5">
          <Orbe parle={helpifyParle} />
          <span className="text-[11px] text-[#8b887f]">{helpifyParle ? `Helpify ${mots.parle}` : "Helpify"}</span>
        </span>
        <span className="flex flex-col items-center gap-2.5">
          <span className={`grid h-16 w-16 place-items-center rounded-full border transition-colors duration-300 ${candidatParle ? "border-[#121214]" : "border-[#e4e4e0]"}`}>
            {candidatParle ? <Onde parle /> : <span className="text-[13px] font-medium text-[#121214]">SK</span>}
          </span>
          <span className="text-[11px] text-[#8b887f]">{candidatParle ? `${nom} ${mots.parle}` : nom}</span>
        </span>
      </div>
      <div className="flex min-h-[150px] flex-col gap-2.5 p-4">
        {tours.map((t, i) => {
          const actif = enCours !== null && i === tours.length - 1;
          return (
            <p key={i} className="text-[12.5px] leading-snug" style={vu(true)}>
              <span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]">{t.qui === "helpify" ? "Helpify" : nom}</span>
              <span className={t.qui === "helpify" ? "text-[#57554f]" : "text-[#121214]"}>
                <Transcription key={`${i}-${actif}`} texte={t.texte} enCours={actif} />
              </span>
            </p>
          );
        })}
      </div>
    </Carte>
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
    appel: "Appel",
    parle: "parle…",
    direct: "En direct",
    parler: "Parler à Helpify",
    profil: "Ce que Sarah apporte",
    criteresSarah: ["Relation client grands comptes", "Structuration d'un service", "Anglais courant", "Expérience SaaS", "Fidélisation"],
    nbCriteres: "critères",
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
    appel: "Call",
    parle: "is speaking…",
    direct: "Live",
    parler: "Talk to Helpify",
    profil: "What Sarah brings",
    criteresSarah: ["Enterprise client relationships", "Building a function from scratch", "Fluent English", "SaaS experience", "Retention"],
    nbCriteres: "criteria",
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
      // L'appel : Helpify pose sa question, le candidat répond de vive voix, et
      // la transcription s'écrit en direct ; puis un repère la relie à la fiche.
      duree: 0,
      etapes: 4,
      temps: [2000, 1500, 900, 2400],
      rendu: (e) => {
        const tours: Tour[] = [];
        if (e >= 1) tours.push({ qui: "helpify", texte: q.text });
        if (e >= 2) tours.push({ qui: "candidat", texte: r.text });
        return (
          <>
            <Appel titre={`${m.appel} · ${role}`} heure={heure} nom={nom} mots={m} tours={tours} fini={e >= 3} />
            <Repere x={320} y={425} vers={[250, 270]} titre={prequal.extracted[0]} valeur={r.text} ok={e >= 4} />
          </>
        );
      },
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
      // Sarah répond de vive voix ; une fois sa réponse transcrite, les
      // passages qui prouvent un critère se surlignent et s'y relient.
      duree: 0,
      etapes: 4,
      temps: [3600, 1400, 1400, 1800],
      rendu: (e) => (
        <>
          <Carte x={20} y={60} w={420}>
            <Entete titre={`${m.reponse} · ${score.candidate}`} droite={<Onde parle={e === 1} />} />
            <p className="p-4 text-[14px] leading-relaxed text-[#121214]">
              {e <= 1 ? (
                <Transcription key={`m-${e}`} texte={reponse} enCours={e === 1} />
              ) : (
                <Surligne texte={reponse} passages={m.passages} actifs={e - 1} />
              )}
            </p>
          </Carte>
          <Repere x={130} y={320} vers={[120, 142]} titre={m.evalue} valeur={criteres[1]?.label} ok={e >= 2} />
          <Repere x={290} y={385} vers={[300, 168]} titre={m.evalue} valeur={criteres[0]?.label} ok={e >= 3} />
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

/** Quels critères de Sarah servent quelles offres (indices dans les offres). */
const LIENS = [
  [0, 4, 3],
  [1, 2],
  [0, 3],
  [3, 0, 1],
  [4, 1],
];

export function SynergiesFilm({ locale }: { locale: Locale }) {
  const { d } = usePoste(locale);
  const m = MOTS[locale];
  const { synergies } = d.products.demo;
  const offres = synergies.roles.slice(1, 6);
  const criteres = m.criteresSarah;
  const y = (i: number) => 112 + i * 64;
  const XG = 222;
  const XD = 258;
  const plans: Plan[] = [
    {
      // Sarah, ses critères à gauche, les autres offres à droite ; un à un,
      // chaque critère se relie aux offres où il compte.
      duree: 0,
      etapes: criteres.length + 1,
      temps: [900, 1000, 1000, 1000, 1000, 2600],
      rendu: (e) => {
        const relies = LIENS.slice(0, Math.max(0, e - 1));
        const compte = offres.map((_, k) => relies.filter((l) => l.includes(k)).length);
        return (
          <>
            <p className="absolute font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]" style={{ left: 14, top: 62 }}>
              {m.profil}
            </p>
            <p className="absolute font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]" style={{ left: XD, top: 62 }}>
              {m.vivier}
            </p>
            <svg className="absolute inset-0" width={W} height={H}>
              {LIENS.map((liens, i) =>
                liens.map((k) => {
                  const d = `M${XG} ${y(i)} C${(XG + XD) / 2} ${y(i)} ${(XG + XD) / 2} ${y(k)} ${XD} ${y(k)}`;
                  const actif = e >= i + 2;
                  const courant = e === i + 2;
                  return (
                    <path
                      key={`${i}-${k}`}
                      d={d}
                      fill="none"
                      stroke={BLEU}
                      strokeOpacity={courant ? 0.9 : 0.35}
                      strokeWidth={courant ? 1.5 : 1}
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={actif ? 0 : 1}
                      style={{ transition: "stroke-dashoffset .7s ease-out, stroke-opacity .5s" }}
                    />
                  );
                }),
              )}
            </svg>
            {criteres.map((c, i) => (
              <span
                key={c}
                className="absolute flex items-center rounded-[8px] border bg-white px-3 text-[11.5px] transition-colors duration-500"
                style={{
                  left: 14,
                  top: y(i) - 18,
                  width: XG - 14,
                  height: 36,
                  borderColor: e === i + 2 ? BLEU : "#ececea",
                  color: "#121214",
                  ...vu(e >= 1),
                }}
              >
                <span className="truncate">{c}</span>
              </span>
            ))}
            {offres.map((o, k) => (
              <span
                key={o}
                className="absolute flex items-center justify-between gap-2 rounded-[8px] border bg-white px-3 text-[11.5px] transition-all duration-500"
                style={{
                  left: XD,
                  top: y(k) - 18,
                  width: W - XD - 14,
                  height: 36,
                  borderColor: compte[k] > 0 ? "rgba(47,107,255,0.45)" : "#ececea",
                  color: compte[k] > 0 ? "#121214" : "#b3b0a8",
                  boxShadow: compte[k] > 0 ? "0 10px 24px -16px rgba(47,107,255,0.7)" : "none",
                }}
              >
                <span className="truncate">{o}</span>
                {compte[k] > 0 && (
                  <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ background: BLEU }}>
                    {compte[k]}
                  </span>
                )}
              </span>
            ))}
            <span
              className="absolute flex items-center gap-2 text-[12.5px] font-medium text-[#121214]"
              style={{ left: 14, top: 20, ...vu(e >= 1) }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#121214] text-[10px] text-white">SK</span>
              {synergies.center}
            </span>
          </>
        );
      },
    },
    {
      duree: 3200,
      etapes: 2,
      rendu: (e) => (
        <Statut
          titre={`${synergies.center} · ${offres.length} ${m.offres}`}
          sous={`${criteres.length} ${m.nbCriteres} · ${offres.slice(0, 2).join(" · ")}…`}
          badges={[m.rapproche, m.valider]}
          e={e}
        />
      ),
    },
  ];
  return <Film plans={plans} fixe={0} />;
}

export function AskFilm({ locale }: { locale: Locale }) {
  const { d, role, roleLabel } = usePoste(locale);
  const m = MOTS[locale];
  const { ask } = d.products.demo;
  const [q1, r1, q2, r2] = ask.messages;
  const nom = d.products.demo.score.candidate;
  const tours = (e: number, q: string, r: string): Tour[] => [
    ...(e >= 1 ? [{ qui: "candidat" as const, texte: q }] : []),
    ...(e >= 2 ? [{ qui: "helpify" as const, texte: r }] : []),
  ];
  const plans: Plan[] = [
    {
      // Sur l'offre, le candidat appuie pour parler à Helpify.
      duree: 2600,
      etapes: 2,
      rendu: (e) => (
        <Carte x={20} y={80} w={420}>
          <div className="p-5">
            <p className="text-[11px] text-[#8b887f]">{roleLabel}</p>
            <p className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-[#121214]">{role}</p>
            <div className="mt-4">
              <Squelette lignes={4} largeurs={[96, 88, 92, 54]} />
            </div>
            <span
              className="mt-6 flex items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-[13px] font-medium text-white transition-transform duration-200"
              style={{ background: "#121214", transform: e >= 2 ? "scale(0.97)" : "scale(1)" }}
            >
              <Mic size={15} />
              {m.parler}
            </span>
          </div>
        </Carte>
      ),
    },
    {
      duree: 0,
      etapes: 3,
      temps: [1800, 2600, 1400],
      rendu: (e) => <Appel titre={`Talent Ask · ${role}`} heure={ask.hours[0]} nom={nom} mots={m} tours={tours(e, q1.text, r1.text)} fini={e >= 3} />,
    },
    {
      duree: 0,
      etapes: 4,
      temps: [1800, 2400, 900, 2200],
      rendu: (e) => (
        <>
          <Appel titre={`Talent Ask · ${role}`} heure={ask.hours[2]} nom={nom} mots={m} tours={tours(e, q2.text, r2.text)} fini={e >= 3} nuit />
          <Repere x={330} y={420} vers={[392, 58]} titre={m.nuit} valeur={ask.hours[2]} ok={e >= 4} />
        </>
      ),
    },
    {
      duree: 3200,
      etapes: ask.hours.length,
      rendu: (e) => (
        <Carte x={40} y={110} w={380}>
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
  return <Film plans={plans} fixe={1} />;
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
