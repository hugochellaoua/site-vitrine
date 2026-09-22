import { integrations } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { LogoMark } from "@/components/logo-mark";

const RINGS = [
  { r: 30, count: 5, dur: "38s" },
  { r: 44, count: 7, dur: "52s" },
];

export function Integrations() {
  return (
    <section id="integrations" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge>{integrations.eyebrow}</Badge>
          <SectionTitle
            title={integrations.title}
            emphasis={integrations.emphasis}
            className="mt-6"
          />
        </div>

        {/* Le réseau : orbites concentriques autour du point central.
            Les noms sont listés dessous plutôt que posés sur les orbites —
            aucun risque de collision, quelle que soit la largeur d'écran. */}
        <div className="relative mx-auto mt-14 aspect-square w-[min(320px,72vw)]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {RINGS.map((ring) => (
              <circle
                key={ring.r}
                cx="50"
                cy="50"
                r={ring.r}
                fill="none"
                stroke="rgba(143,168,255,0.16)"
                strokeWidth="0.3"
              />
            ))}
            {RINGS.map((ring, ri) => (
              <g key={ri} style={{ transformOrigin: "50px 50px", animation: `spin ${ring.dur} linear infinite` }}>
                {Array.from({ length: ring.count }).map((_, i) => {
                  const a = (i / ring.count) * Math.PI * 2;
                  return (
                    <circle
                      key={i}
                      cx={50 + Math.cos(a) * ring.r}
                      cy={50 + Math.sin(a) * ring.r}
                      r="1.1"
                      fill="#8fa8ff"
                      opacity="0.75"
                    />
                  );
                })}
              </g>
            ))}
            <g stroke="rgba(143,168,255,0.2)" strokeWidth="0.25" fill="none">
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return <path key={i} d={`M50,50 L${50 + Math.cos(a) * 44},${50 + Math.sin(a) * 44}`} />;
              })}
            </g>
          </svg>

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            <div
              className="absolute -inset-9 -z-10 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(30,79,255,0.36) 0%, rgba(30,79,255,0) 70%)" }}
            />
            <LogoMark size={20} />
            <span className="font-display text-[15px] font-semibold text-ink">{integrations.center}</span>
          </div>
        </div>

        {/* Bandeau défilant : la liste passe en continu plutôt que de s'étaler
            sur toute la page. Elle se met en pause au survol, pour qu'on puisse
            chercher un outil précis. */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
          <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
            {[...integrations.logos, ...integrations.logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap rounded-full border border-hairline bg-panel/30 px-5 py-2.5 font-display text-[14px] text-muted transition-colors duration-300 hover:border-hairline-strong hover:text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-[12px] text-faint">{integrations.note}</p>
      </div>
    </section>
  );
}
