"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { ArrowUpRight, Check, FileText, Info, Loader, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { dict, type Locale } from "@/lib/i18n";
import type { DemoContent, DemoStep } from "@/lib/demo-types";
import { LogoMark } from "@/components/logo-mark";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * La démonstration : un échange entre Helpify et un candidat, qui se joue seul.
 *
 * Ce n'est pas un fichier vidéo mais une scène écrite. Elle ne pèse presque
 * rien, se traduit avec le reste du site, reste nette à toute taille, et son
 * texte est lisible par les moteurs de recherche et les lecteurs d'écran. Elle
 * démarre quand on arrive dessus, s'arrête quand on la quitte, et se rejoue
 * d'un clic. Qui a demandé moins de mouvement la voit d'emblée en entier.
 *
 * Le rythme tient en quelques réglages : chaque message reste à l'écran le
 * temps de sa lecture, comptée en mots.
 */

const ATTENTE_DEPART = 700;
/** Durée des trois points, avant qu'un message apparaisse. */
const SAISIE = { helpify: 1100, candidate: 900 } as const;
/** Pause avant la suite d'un message : un socle, plus un temps par mot. */
const LECTURE_DE_BASE = 500;
const PAR_MOT = 170;
/** Ces deux scènes se jouent seules en CSS ; on attend la fin de leur animation. */
const PAUSE_PROFIL = 3800;
const PAUSE_ANALYSE = 3300;

const mots = (t: string) => t.trim().split(/\s+/).length;

function pause(e: DemoStep): number {
  if (e.type === "profile") return PAUSE_PROFIL;
  if (e.type === "analysis") return PAUSE_ANALYSE;
  return LECTURE_DE_BASE + mots(e.text) * PAR_MOT;
}

/**
 * Espaces insécables avant « ? ! : ; % » et dans les guillemets : sans elles,
 * une bulle étroite peut renvoyer le point d'exclamation seul à la ligne.
 */
const typo = (s: string) => s.replace(/ ([?!:;%»])/g, " $1").replace(/« /g, "« ");

const retard = (secondes: number) => ({ "--d": `${secondes}s` }) as CSSProperties;

const SANS_ANIMATION = "(prefers-reduced-motion: reduce)";
function abonnerMouvement(f: () => void) {
  const m = window.matchMedia(SANS_ANIMATION);
  m.addEventListener("change", f);
  return () => m.removeEventListener("change", f);
}
const mouvementReduit = () => window.matchMedia(SANS_ANIMATION).matches;

export function DemoConversation({ locale }: { locale: Locale }) {
  const { demo } = dict(locale);
  const etapes = demo.steps;
  const total = etapes.length;

  const reduit = useSyncExternalStore(abonnerMouvement, mouvementReduit, () => false);
  /** Étapes déjà affichées. */
  const [n, setN] = useState(0);
  /** Les trois points de l'étape suivante sont à l'écran. */
  const [saisie, setSaisie] = useState(false);
  const [enVue, setEnVue] = useState(false);
  const [enPause, setEnPause] = useState(false);
  const carte = useRef<HTMLDivElement>(null);
  const fil = useRef<HTMLDivElement>(null);

  const vus = reduit ? total : n;
  const fini = vus >= total;
  const joue = enVue && !enPause && !fini && !reduit;
  const prochaine = etapes[n];

  // La démonstration ne tourne que sous les yeux du visiteur.
  useEffect(() => {
    const el = carte.current;
    if (!el) return;
    // Sans IntersectionObserver, on la joue plutôt que de la laisser vide.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setEnVue(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([entree]) => setEnVue(entree.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Le déroulé : une minuterie à la fois, relancée à chaque changement d'état.
  // Mettre en pause l'annule ; reprendre la relance où l'on s'était arrêté.
  useEffect(() => {
    if (!joue) return;
    const avant = n === 0 ? ATTENTE_DEPART : pause(etapes[n - 1]);
    let delai = avant;
    let suite = () => setN(n + 1);
    if (prochaine.type === "message") {
      if (!saisie) {
        suite = () => setSaisie(true);
      } else {
        delai = SAISIE[prochaine.from];
        suite = () => {
          setSaisie(false);
          setN(n + 1);
        };
      }
    }
    const t = window.setTimeout(suite, delai);
    return () => window.clearTimeout(t);
  }, [joue, n, saisie, etapes, prochaine]);

  // Le fil suit la conversation vers le bas.
  useEffect(() => {
    const el = fil.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduit ? "auto" : "smooth" });
  }, [vus, saisie, reduit]);

  function rejouer() {
    setN(0);
    setSaisie(false);
    setEnPause(false);
    fil.current?.scrollTo({ top: 0 });
  }

  function basculer() {
    if (fini) rejouer();
    else setEnPause(joue);
  }

  return (
    <section id="demo" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <Badge tone="iris">{demo.eyebrow}</Badge>
          <SectionTitle title={demo.title} emphasis={demo.emphasis} className="mt-6" />
          <p className="mx-auto mt-5 max-w-xl text-balance text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
            {demo.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1} y={30} className="mt-12">
          <div ref={carte} className="card-surface mx-auto w-full max-w-[680px] overflow-hidden rounded-[28px]">
            <div className="flex items-center gap-3 border-b border-hairline px-5 py-4 sm:px-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] ring-1 ring-hairline-strong">
                <LogoMark size={20} />
              </span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-ink">{demo.header.name}</div>
                <div className="truncate text-[11.5px] text-faint">{demo.header.role}</div>
              </div>
            </div>

            {/* L'animation est décorative pour un lecteur d'écran : il reçoit la
                transcription complète plus bas, d'un seul tenant. */}
            <div
              ref={fil}
              aria-hidden="true"
              className={cn(
                "px-5 py-5 sm:px-6",
                reduit ? "" : "h-[470px] sm:h-[520px]",
                joue ? "overflow-hidden" : "overflow-y-auto",
              )}
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0, #000 26px)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 26px)",
              }}
            >
              <div className="flex flex-col gap-3.5">
                {etapes.slice(0, vus).map((e, i) => (
                  <Scene key={i} etape={e} demo={demo} />
                ))}
                {!reduit && saisie && prochaine?.type === "message" && (
                  <Saisie de={prochaine.from} initiale={demo.candidate.initial} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-hairline px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <Link
                href={demo.notice.href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline-strong bg-white/5 px-4 py-2.5 text-[12.5px] font-semibold leading-snug text-ink transition-colors hover:border-accent-light hover:bg-white/10"
              >
                <Info size={14} className="shrink-0 text-accent-light" />
                <span className="text-left">{demo.notice.label}</span>
                <ArrowUpRight size={13} className="shrink-0 opacity-70" />
              </Link>
              {!reduit && (
                <button
                  type="button"
                  onClick={basculer}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-[12.5px] font-medium text-muted transition-colors hover:text-ink"
                >
                  {fini ? <RotateCcw size={14} /> : joue ? <Pause size={14} /> : <Play size={14} />}
                  {fini ? demo.controls.replay : joue ? demo.controls.pause : demo.controls.play}
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-[11.5px] text-faint">{demo.fiction}</p>
        </Reveal>

        <ol className="sr-only">
          {etapes.map((e, i) => (
            <li key={i}>{transcription(e, demo)}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function transcription(e: DemoStep, demo: DemoContent): string {
  if (e.type === "profile") return `${demo.candidate.name} : ${demo.candidate.cv}, ${demo.candidate.linkedin}`;
  if (e.type === "analysis") return `${demo.header.name} : ${demo.analysis.reading} ${demo.analysis.points.join(", ")}`;
  return `${e.from === "helpify" ? demo.header.name : demo.candidate.name} : ${e.text.replace(/\*\*/g, "").replace(/\n/g, " ")}`;
}

/* ── Les scènes ────────────────────────────────────────────────────────── */

function Scene({ etape, demo }: { etape: DemoStep; demo: DemoContent }) {
  if (etape.type === "profile") return <Depot demo={demo} />;
  if (etape.type === "analysis") return <Analyse demo={demo} />;
  return <Bulle de={etape.from} texte={etape.text} initiale={demo.candidate.initial} />;
}

/**
 * Le sens des bulles est celui du produit et du process, plus bas dans la page :
 * Helpify parle en bleu à gauche, le candidat répond en blanc à droite.
 */
function Bulle({ de, texte, initiale }: { de: "helpify" | "candidate"; texte: string; initiale: string }) {
  const helpify = de === "helpify";
  return (
    <div className={cn("demo-in flex items-end gap-2.5", !helpify && "justify-end")}>
      {helpify && <AvatarHelpify />}
      <div
        className={cn(
          "flex max-w-[84%] flex-col gap-2.5 rounded-2xl px-4 py-3 text-[14px] leading-relaxed sm:text-[14.5px]",
          helpify ? "rounded-bl-sm bg-accent text-white" : "rounded-br-sm bg-[#f9f9fb] font-medium text-[#141037]",
        )}
      >
        {/* Un saut de ligne dans le texte ouvre un paragraphe : une bulle d'un seul bloc se lit mal. */}
        {texte.split("\n").map((paragraphe, i) => (
          <p key={i}>
            <Gras texte={typo(paragraphe)} />
          </p>
        ))}
      </div>
      {!helpify && <AvatarCandidat initiale={initiale} />}
    </div>
  );
}

/** `**mot**` met en gras : les noms propres surtout, qui guident l'œil dans une bulle. */
function Gras({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\*\*(.+?)\*\*/g).map((morceau, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold">
            {morceau}
          </strong>
        ) : (
          morceau
        ),
      )}
    </>
  );
}

function Saisie({ de, initiale }: { de: "helpify" | "candidate"; initiale: string }) {
  const helpify = de === "helpify";
  return (
    <div className={cn("demo-in flex items-end gap-2.5", !helpify && "justify-end")}>
      {helpify && <AvatarHelpify />}
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-2xl px-4 py-3.5",
          helpify ? "rounded-bl-sm bg-accent/30" : "rounded-br-sm bg-white/15",
        )}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-white/85" style={retard(i * 0.15)} />
        ))}
      </div>
      {!helpify && <AvatarCandidat initiale={initiale} />}
    </div>
  );
}

/** Le candidat dépose son CV, puis colle le lien de son profil LinkedIn. */
function Depot({ demo }: { demo: DemoContent }) {
  const c = demo.candidate;
  return (
    <div className="demo-in flex items-end justify-end gap-2.5">
      <div className="flex w-full max-w-[84%] flex-col gap-2 rounded-2xl rounded-br-sm bg-[#f9f9fb] p-2.5 text-[#141037] sm:max-w-[350px]">
        <Piece icone={<FileText size={16} className="text-accent" />} nom={c.cv} detail={c.cvSize} debut={0.3} />
        <Piece icone={<MarqueLinkedIn />} nom={c.linkedin} debut={1.9} />
      </div>
      <AvatarCandidat initiale={c.initial} />
    </div>
  );
}

/** Une pièce jointe : elle apparaît, se charge, puis se coche. */
function Piece({
  icone,
  nom,
  detail,
  debut,
}: {
  icone: React.ReactNode;
  nom: string;
  detail?: string;
  debut: number;
}) {
  return (
    <div className="demo-in flex items-center gap-3 rounded-xl bg-[#141037]/[0.06] px-3 py-2.5" style={retard(debut)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white">{icone}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold">{nom}</span>
        <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[#141037]/10">
          <span className="demo-bar block h-full rounded-full bg-accent" style={retard(debut + 0.25)} />
        </span>
      </span>
      {detail && <span className="shrink-0 text-[11px] text-[#141037]/55">{detail}</span>}
      <span
        className="demo-pop grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success text-white"
        style={retard(debut + 1.4)}
      >
        <Check size={12} strokeWidth={3} />
      </span>
    </div>
  );
}

/** Helpify lit le profil : un état de travail, puis quelques repères tirés du CV. */
function Analyse({ demo }: { demo: DemoContent }) {
  const a = demo.analysis;
  return (
    <div className="demo-in flex items-end gap-2.5">
      <AvatarHelpify />
      <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-hairline-strong bg-white/[0.05] px-4 py-3">
        <div className="grid text-[12.5px] font-medium text-[#e4e5f5]">
          <span className="demo-reading flex items-center gap-2 [grid-area:1/1]">
            <Loader size={13} className="animate-spin text-accent-light" />
            {a.reading}
          </span>
          <span className="demo-done flex items-center gap-2 [grid-area:1/1]">
            <Check size={13} strokeWidth={3} className="text-success" />
            {a.done}
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {a.points.map((p, i) => (
            <span
              key={p}
              className="demo-pop rounded-full border border-iris/35 bg-iris-soft px-3 py-1.5 text-[12px] font-medium text-iris-light"
              style={retard(0.6 + i * 0.55)}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AvatarHelpify() {
  return (
    <span className="mb-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.07] ring-1 ring-hairline-strong">
      <LogoMark size={15} />
    </span>
  );
}

function AvatarCandidat({ initiale }: { initiale: string }) {
  return (
    <span className="mb-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-iris/40 bg-iris-soft text-[11px] font-bold text-iris-light">
      {initiale}
    </span>
  );
}

/** Le logo de LinkedIn, tel que le pied de page l'emploie : il garde son bleu. */
function MarqueLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}
