import { LogoMark } from "@/components/logo-mark";

/**
 * Sources qui convergent vers un point central.
 * Disposition radiale à partir de la tablette ; en dessous, l'espace ne permet
 * pas de placer des étiquettes sur un cercle sans qu'elles se touchent, donc on
 * bascule sur une liste — même information, aucune collision possible.
 */
export function Constellation({
  labels,
  center,
  showLogo = true,
}: {
  labels: string[];
  center: string;
  /** Le centre n'est pas toujours Helpify : sur 360 Matching, c'est un candidat. */
  showLogo?: boolean;
}) {
  const n = labels.length;
  const points = labels.map((label, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      left: 50 + Math.cos(angle) * 42,
      top: 50 + Math.sin(angle) * 42,
    };
  });

  return (
    <>
      <div className="relative mx-auto hidden aspect-square w-[min(430px,44vh)] sm:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <g stroke="rgba(143,168,255,0.28)" strokeWidth="0.3" fill="none">
            {points.map((p, i) => (
              <path key={i} d={`M50,50 L${p.left},${p.top}`} />
            ))}
          </g>
          <g fill="#8fa8ff">
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.left}
                cy={p.top}
                r="0.8"
                style={{
                  animation: "pulseGlow 2.8s ease-in-out infinite",
                  animationDelay: `${i * 0.28}s`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            ))}
          </g>
        </svg>

        {points.map((p, i) => (
          <div
            key={i}
            className="absolute w-[31%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-hairline-strong bg-panel/70 px-2 py-1.5 text-center text-[10.5px] leading-tight text-[#dfe3ff] backdrop-blur-sm"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
          >
            {p.label}
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
          <div
            className="absolute -inset-10 -z-10 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(30,79,255,0.34) 0%, rgba(30,79,255,0) 70%)" }}
          />
          {showLogo && <LogoMark size={20} />}
          <span className="font-display text-[15px] font-semibold text-ink">{center}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:hidden">
        <div className="flex flex-wrap justify-center gap-1.5">
          {labels.map((l) => (
            <span
              key={l}
              className="rounded-full border border-hairline bg-panel/50 px-2.5 py-1 text-[10.5px] text-[#dfe3ff]"
            >
              {l}
            </span>
          ))}
        </div>
        <span className="text-faint">↓</span>
        <div className="relative flex items-center gap-2 rounded-full border border-accent/45 bg-accent-soft px-4 py-2">
          <div
            className="absolute -inset-5 -z-10 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(30,79,255,0.3) 0%, rgba(30,79,255,0) 72%)" }}
          />
          {showLogo && <LogoMark size={16} />}
          <span className="text-[13px] font-semibold text-ink">{center}</span>
        </div>
      </div>
    </>
  );
}
