import { cn } from "@/lib/cn";

export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hf-spark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%" stopColor="#1e4fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#1e4fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M14 8C6 8 4 14 4 22V38C4 46 8 50 16 50H20L14 60L26 50H48C56 50 60 46 60 38V22C60 14 56 8 48 8H14Z"
        fill="#f5f4ff"
        fillOpacity="0.1"
        stroke="#f5f4ff"
        strokeOpacity="0.4"
      />
      <circle cx="32" cy="30" r="9" fill="url(#hf-spark)" opacity="0.55" />
      <g stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round">
        <line x1="32" y1="24" x2="32" y2="36" />
        <line x1="26" y1="30" x2="38" y2="30" />
        <line x1="28" y1="26" x2="36" y2="34" opacity="0.55" />
        <line x1="28" y1="34" x2="36" y2="26" opacity="0.55" />
      </g>
      <circle cx="52" cy="14" r="3" fill="#1e4fff" />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-display text-base font-semibold text-ink", className)}>
      <LogoMark size={26} />
      Helpify
    </div>
  );
}
