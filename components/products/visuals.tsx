import { Check, MessageSquare } from "lucide-react";
import { products } from "@/lib/content";
import { Constellation } from "@/components/cinematic/constellation";

const d = products.demo;

/** Bulle de conversation, au sens du produit : Helpify à gauche, candidat à droite. */
function Bubble({ from, text, tone = "accent" }: { from: string; text: string; tone?: "accent" | "warm" }) {
  const helpify = from === "helpify";
  return (
    <div
      style={{ alignSelf: helpify ? "flex-start" : "flex-end" }}
      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-snug ${
        helpify
          ? tone === "warm"
            ? "rounded-bl-sm bg-warm font-medium text-[#2a1607]"
            : "rounded-bl-sm bg-accent text-white"
          : "rounded-br-sm bg-[#f9f9fb] font-medium text-[#141037]"
      }`}
    >
      {text}
    </div>
  );
}

function ChatCard({
  messages,
  tone = "accent",
  badge,
}: {
  messages: readonly { from: string; text: string }[];
  tone?: "accent" | "warm";
  badge?: string;
}) {
  return (
    <div className="card-surface w-full max-w-md rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-hairline pb-3 text-[10.5px] uppercase tracking-[0.1em] text-faint">
        <span className="flex items-center gap-2">
          <MessageSquare size={12} className={tone === "warm" ? "text-warm" : "text-accent-light"} />
          Candidat <span className="text-hairline-strong">↔</span> Helpify
        </span>
        {badge && (
          <span className="flex items-center gap-1.5 rounded-full border border-warm/40 bg-warm-soft px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-warm-light">
            <span className="h-1 w-1 rounded-full bg-warm" />
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <Bubble key={i} from={m.from} text={m.text} tone={tone} />
        ))}
      </div>
    </div>
  );
}

/** Préqualification : la conversation devient de l'information exploitable. */
export function PrequalVisual() {
  return (
    <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:items-center lg:gap-7">
      <ChatCard messages={d.prequal.messages} />
      <div className="flex items-center gap-3">
        <span className="hidden text-lg text-faint lg:block">→</span>
        <ul className="flex flex-wrap justify-center gap-1.5 lg:max-w-[150px] lg:flex-col">
          {d.prequal.extracted.map((tag, i) => (
            <li
              key={tag}
              className="rounded-full border border-accent/35 bg-accent-soft px-3 py-1.5 text-[11px] text-[#c7d3ff]"
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

const R = 30;
const C = 2 * Math.PI * R;

/** Matching : l'évaluation, critère par critère. */
export function ScoreVisual() {
  const s = d.score;
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
              stroke="url(#prodScore)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * s.value) / 100}
            />
            <defs>
              <linearGradient id="prodScore" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8fa8ff" />
                <stop offset="100%" stopColor="#1d50fe" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[19px] font-bold leading-none text-ink">{s.value}</span>
            <span className="text-[9px] text-faint">/ 100</span>
          </div>
        </div>
        <div>
          <div className="text-[13.5px] font-semibold text-ink">{s.candidate}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-faint">Évaluation</div>
        </div>
      </div>
      <dl className="mt-4 flex flex-col gap-2.5">
        {s.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-[11.5px] text-faint">{row.label}</dt>
            <dd className="text-right text-[12px] font-medium text-[#e4e5f5]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 360 Matching : un même profil, rapproché de plusieurs postes du vivier. */
export function SynergiesVisual() {
  return <Constellation labels={[...d.synergies.roles]} center={d.synergies.center} showLogo={false} />;
}

/** Talent Ask : le candidat interroge, à n'importe quelle heure. */
export function AskVisual() {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <ChatCard messages={d.ask.messages} tone="warm" badge="Talent ask" />
      <div className="flex flex-wrap items-center justify-center gap-2">
        {d.ask.hours.map((h, i) => (
          <span
            key={h}
            className="flex items-center gap-1.5 rounded-full border border-warm/30 bg-warm-soft px-3 py-1.5 text-[11.5px] tabular-nums text-warm-light"
            style={{ animation: "pulseGlow 3s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
          >
            <Check size={11} />
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

export const VISUALS = {
  "chat-extract": PrequalVisual,
  score: ScoreVisual,
  constellation: SynergiesVisual,
  ask: AskVisual,
} as const;
