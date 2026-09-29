import { Check, MessageSquare, UserCheck, X } from "lucide-react";
import { processSteps } from "@/lib/content";
import { LogoMark } from "@/components/logo-mark";
import { Constellation } from "./constellation";

type Step = (typeof processSteps)[number];

/**
 * Les étapes où le candidat est le sujet — c'est lui qui interroge, qu'on
 * interroge, qui choisit son heure, à qui l'on répond. Elles passent en orange.
 * Les autres restent bleues : elles parlent du produit et du recruteur.
 *
 * Ce partage donne au déroulé un rythme visible sans qu'aucun texte ait à
 * l'expliquer : le milieu du process appartient au talent.
 */
const TALENT_STEPS = new Set(["questions", "reponses", "always", "reponse"]);

/**
 * Mise en page commune à toutes les étapes.
 *
 * Numéro, titre et sous-titre ont exactement le même traitement typographique
 * d'une étape à l'autre, et occupent toujours la même place. C'est cette
 * régularité qui fait comprendre, sans l'écrire, qu'on lit un déroulé :
 * seul le contenu change, jamais la grille de lecture.
 */
function StepLayout({ step, children }: { step: Step; children: React.ReactNode }) {
  const warm = TALENT_STEPS.has(step.key);
  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      <div className="flex items-baseline gap-3">
        <span
          className={`font-display text-[clamp(30px,4vw,46px)] font-bold leading-none tabular-nums ${
            warm ? "text-warm" : "text-accent-light"
          }`}
        >
          {step.n}
        </span>
        <h2 className="max-w-[17ch] text-balance font-display text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
          {step.title}
        </h2>
      </div>
      <p className="mt-3.5 max-w-[46ch] text-balance text-center text-[13px] leading-relaxed text-muted sm:text-[14.5px]">
        {step.sub}
      </p>
      <div className="mt-8 flex w-full items-center justify-center sm:mt-10">{children}</div>
    </div>
  );
}

/**
 * Fil de conversation.
 *
 * `probe` bascule les prises de parole de Helpify en orange : c'est le moment
 * où il cesse de renseigner le candidat pour l'interroger. Le produit marque
 * cet instant d'un badge « Talent ask » — il change de rôle, donc de couleur.
 */
function Chat({
  messages,
  probe = false,
}: {
  messages: readonly { from: string; text: string }[];
  probe?: boolean;
}) {
  return (
    <div className="card-surface w-full max-w-md rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-hairline pb-3 text-[10.5px] uppercase tracking-[0.1em] text-faint">
        <span className="flex items-center gap-2">
          <MessageSquare size={12} className={probe ? "text-warm" : "text-accent-light"} />
          Candidat <span className="text-hairline-strong">↔</span> Helpify
        </span>
        {probe && (
          <span className="flex items-center gap-1.5 rounded-full border border-warm/40 bg-warm-soft px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-warm-light">
            <span className="h-1 w-1 rounded-full bg-warm" />
            Talent ask
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <div
            key={i}
            /* Sens des bulles repris du produit : Helpify parle en bleu à
               gauche, le candidat répond en blanc à droite. */
            className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-snug ${
              m.from === "helpify"
                ? probe
                  ? "rounded-bl-sm bg-warm font-medium text-[#2a1607]"
                  : "rounded-bl-sm bg-accent text-white"
                : "rounded-br-sm bg-[#f9f9fb] font-medium text-[#141037]"
            }`}
            style={{ alignSelf: m.from === "helpify" ? "flex-start" : "flex-end" }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 01 — Helpify apprend votre entreprise */
function Entreprise({ step }: { step: Extract<Step, { key: "entreprise" }> }) {
  return <Constellation labels={[...step.sources]} center={step.center} />;
}

/* 02 — Vous cadrez le poste */
function Besoin({ step }: { step: Extract<Step, { key: "besoin" }> }) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <div className="card-surface w-full rounded-3xl p-6">
        <div className="text-[10.5px] uppercase tracking-[0.1em] text-accent-light">{step.roleLabel}</div>
        <div className="mt-2 font-display text-[21px] font-semibold text-ink">{step.role}</div>
        <div className="mt-5 text-[10px] uppercase tracking-[0.12em] text-faint">
          {step.fieldsLabel}
        </div>
        <div className="mt-2.5 flex flex-col gap-2">
          {step.fields.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-void/40 px-3.5 py-2.5 text-[12.5px] text-[#e4e5f5]"
              style={{ animation: "pulseGlow 2.6s ease-in-out infinite", animationDelay: `${i * 0.2}s` }}
            >
              <span className="min-w-0 truncate">{f.label}</span>
              {/* Le poids du critère, lu d'un coup d'œil : l'orange marque ce
                  qui est éliminatoire, le gris ce qui n'est qu'un plus. */}
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                  f.weight === "Primordial"
                    ? "bg-warm-soft text-warm-light"
                    : f.weight === "Important"
                      ? "bg-accent-soft text-accent-light"
                      : "bg-white/[0.06] text-muted"
                }`}
              >
                {f.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-accent/45 bg-accent-soft px-5 py-2.5 text-[12.5px] font-semibold text-ink">
        <Check size={13} className="text-accent-light" />
        {step.status}
      </div>
    </div>
  );
}

/* 03 — Vous diffusez un lien unique */
function Diffusion({ step }: { step: Extract<Step, { key: "diffusion" }> }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center gap-2 rounded-full border border-hairline-strong bg-panel/60 px-5 py-2.5 font-mono text-[12.5px] text-accent-light backdrop-blur-sm">
        <LogoMark size={15} />
        {step.link}
      </div>
      <svg viewBox="0 0 200 30" className="h-8 w-full max-w-md" aria-hidden="true">
        <g stroke="rgba(143,168,255,0.3)" strokeWidth="0.6" fill="none">
          <path d="M100,0 C100,16 20,12 20,30" />
          <path d="M100,0 C100,16 60,12 60,30" />
          <path d="M100,0 L100,30" />
          <path d="M100,0 C100,16 140,12 140,30" />
          <path d="M100,0 C100,16 180,12 180,30" />
        </g>
      </svg>
      <div className="flex max-w-lg flex-wrap justify-center gap-2">
        {step.channels.map((c, i) => (
          <span
            key={c}
            className="rounded-full border border-hairline bg-panel/40 px-3.5 py-1.5 text-[11.5px] text-muted"
            style={{ animation: "pulseGlow 3.2s ease-in-out infinite", animationDelay: `${i * 0.16}s` }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 05 — Helpify interroge : la conversation devient de la donnée structurée */
function Reponses({ step }: { step: Extract<Step, { key: "reponses" }> }) {
  return (
    <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
      <Chat messages={step.messages} probe />
      <div className="flex items-center gap-3">
        <span className="hidden text-lg text-faint lg:block">→</span>
        <ul className="flex flex-wrap justify-center gap-1.5 lg:max-w-[150px] lg:flex-col">
          {step.extracted.map((tag, i) => (
            <li
              key={tag}
              className="rounded-full border border-warm/35 bg-warm-soft px-3 py-1.5 text-[11px] text-warm-light"
              style={{ animation: "pulseGlow 2.8s ease-in-out infinite", animationDelay: `${i * 0.22}s` }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 06 — Disponible en continu.
   Une horloge dont les aiguilles tournent sans fin dit la disponibilité
   permanente bien plus vite qu'une phrase ; les horaires restent en second
   plan pour montrer que les candidats arrivent à n'importe quelle heure. */
function Always({ step }: { step: Extract<Step, { key: "always" }> }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,160,70,0.32) 0%, rgba(255,160,70,0) 70%)" }}
          />
          <svg width="88" height="88" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
            {/* Repères des heures */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const r1 = i % 3 === 0 ? 34 : 38;
              return (
                <line
                  key={i}
                  x1={50 + Math.sin(a) * r1}
                  y1={50 - Math.cos(a) * r1}
                  x2={50 + Math.sin(a) * 41}
                  y2={50 - Math.cos(a) * 41}
                  stroke={i % 3 === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={i % 3 === 0 ? 2 : 1.2}
                  strokeLinecap="round"
                />
              );
            })}
            {/* Aiguilles : des tours complets, à deux vitesses. */}
            <g style={{ transformOrigin: "50px 50px", animation: "spin 8s linear infinite" }}>
              <line x1="50" y1="50" x2="50" y2="24" stroke="var(--warm)" strokeWidth="2.6" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: "50px 50px", animation: "spin 48s linear infinite" }}>
              <line x1="50" y1="50" x2="50" y2="33" stroke="#f5f4ff" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="50" cy="50" r="3" fill="var(--warm)" />
          </svg>
        </div>

        <span className="font-display text-[clamp(40px,6vw,68px)] font-bold leading-none tracking-[-0.03em] tabular-nums text-warm">
          24/7
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {step.times.map((t, i) => (
          <span
            key={t}
            className="rounded-full border border-hairline bg-panel/40 px-3.5 py-1.5 text-[11.5px] tabular-nums text-muted"
            style={{ animation: "pulseGlow 3s ease-in-out infinite", animationDelay: `${i * 0.35}s` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 07 — L'évaluation */
const R = 30;
const C = 2 * Math.PI * R;

function Evaluation({ step }: { step: Extract<Step, { key: "evaluation" }> }) {
  return (
    <div className="card-surface w-full max-w-md rounded-3xl p-6">
      <div className="flex items-center gap-4 border-b border-hairline pb-4">
        <div className="relative h-[72px] w-[72px] shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
            <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            <circle
              cx="36"
              cy="36"
              r={R}
              fill="none"
              stroke="url(#evalGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * step.score) / 100}
            />
            <defs>
              <linearGradient id="evalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8fa8ff" />
                <stop offset="100%" stopColor="#1e4fff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[19px] font-bold leading-none text-ink">{step.score}</span>
            <span className="text-[9px] text-faint">/ 100</span>
          </div>
        </div>
        <div>
          <div className="text-[13.5px] font-semibold text-ink">{step.candidate}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-faint">Évaluation</div>
        </div>
      </div>
      <dl className="mt-4 flex flex-col gap-2.5">
        {step.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-[11.5px] text-faint">{row.label}</dt>
            <dd className="text-right text-[12px] font-medium text-[#e4e5f5]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* 08 — La shortlist */
function Shortlist({ step }: { step: Extract<Step, { key: "shortlist" }> }) {
  return (
    <div className="flex w-full max-w-[280px] flex-col items-center gap-1.5">
      {step.funnel.map((s, i) => {
        const last = i === step.funnel.length - 1;
        return (
          <div key={s.label} className="flex w-full flex-col items-center gap-1.5">
            <div
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-center ${
                last ? "border-accent/50 bg-accent-soft text-ink" : "border-hairline bg-panel/40 text-muted"
              }`}
              style={{ width: `${100 - i * 14}%` }}
            >
              <span className="font-display text-[15px] font-bold tabular-nums">{s.value}</span>
              <span className="text-[10.5px]">{s.label}</span>
            </div>
            {!last && <span className="text-[10px] leading-none text-faint">↓</span>}
          </div>
        );
      })}
    </div>
  );
}

/* 09 — La réponse au candidat */
function Reponse({ step }: { step: Extract<Step, { key: "reponse" }> }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center gap-3">
        {step.decisions.map((d, i) => (
          <span
            key={d}
            className="flex items-center gap-2 rounded-full border border-hairline bg-panel/40 px-4 py-2 text-[12px] text-[#e4e5f5]"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                i === 0 ? "bg-success/15 text-success" : "bg-error/15 text-error"
              }`}
            >
              {i === 0 ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
            </span>
            {d}
          </span>
        ))}
      </div>

      <div className="my-4 h-8 w-px bg-gradient-to-b from-hairline-strong to-accent/60" />

      <div className="card-surface w-full max-w-md rounded-3xl p-5">
        <div className="flex items-center justify-between border-b border-hairline pb-3 text-[10.5px] uppercase tracking-[0.1em] text-faint">
          Réponse personnalisée
          <span className="flex items-center gap-1.5 text-accent-light">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            Générée
          </span>
        </div>
        <div className="mt-3.5 flex flex-col gap-2 text-left">
          <p className="text-[12.5px] text-[#e4e5f5]">{step.email.greeting}</p>
          <p className="text-[12.5px] text-[#e4e5f5]">{step.email.lead}</p>
          <ul className="flex flex-col gap-1.5 pl-1">
            {step.email.points.map((point, i) => (
              <li
                key={i}
                className="flex gap-2 text-[12px] leading-snug text-muted"
                style={{ animation: "pulseGlow 3.4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-light" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-[12.5px] text-[#e4e5f5]">{step.email.closing}</p>
        </div>
      </div>
    </div>
  );
}

/* 09 — La décision revient aux RH.
   Deux blocs et une flèche : l'évaluation d'un côté, la décision humaine de
   l'autre. C'est la seule étape où le produit s'arrête et passe la main —
   le visuel doit le dire sans phrase. */
function Decision({ step }: { step: Extract<Step, { key: "decision" }> }) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
      <div className="card-surface w-full max-w-[230px] rounded-2xl px-5 py-5 text-center">
        <p className="text-[10.5px] uppercase tracking-[0.12em] text-faint">{step.from}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {step.basis.map((c, i) => (
            <li
              key={c}
              className="flex items-center justify-center gap-2 rounded-lg border border-hairline bg-void/40 px-3 py-2 text-[11.5px] text-[#dfe3ff]"
              style={{ animation: "pulseGlow 2.8s ease-in-out infinite", animationDelay: `${i * 0.22}s` }}
            >
              <Check size={11} className="text-accent-light" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <span className="rotate-90 text-lg text-faint sm:rotate-0" aria-hidden="true">
        →
      </span>

      {/* La décision appartient au candidat autant qu'au recruteur : elle est
          humaine, donc en orange, comme tout ce qui touche au talent. */}
      <div className="w-full max-w-[230px] rounded-2xl border border-warm/40 bg-warm-soft px-5 py-6 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-warm/20 text-warm">
          <UserCheck size={20} />
        </span>
        <p className="mt-4 font-display text-[17px] font-bold text-ink">{step.owner}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-warm-light">{step.verdict}</p>
      </div>
    </div>
  );
}

/** Aiguillage : chaque étape rend sa propre preuve visuelle. */
export function StepScene({ step }: { step: Step }) {
  let visual: React.ReactNode = null;

  switch (step.key) {
    case "entreprise":
      visual = <Entreprise step={step} />;
      break;
    case "besoin":
      visual = <Besoin step={step} />;
      break;
    case "diffusion":
      visual = <Diffusion step={step} />;
      break;
    case "questions":
      visual = <Chat messages={step.messages} />;
      break;
    case "reponses":
      visual = <Reponses step={step} />;
      break;
    case "always":
      visual = <Always step={step} />;
      break;
    case "evaluation":
      visual = <Evaluation step={step} />;
      break;
    case "shortlist":
      visual = <Shortlist step={step} />;
      break;
    case "decision":
      visual = <Decision step={step} />;
      break;
    case "reponse":
      visual = <Reponse step={step} />;
      break;
  }

  return <StepLayout step={step}>{visual}</StepLayout>;
}
