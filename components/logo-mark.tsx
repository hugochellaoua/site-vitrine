import { cn } from "@/lib/cn";

/**
 * La marque : deux voix qui se répondent.
 *
 * Ni bulle ni phylactère — ceux-là renvoient au support client et datent le
 * produit. Deux arcs face à face suffisent : le grand écoute, le petit répond.
 * C'est la conversation elle-même, pas son décor.
 *
 * Les couleurs disent qui parle, selon la règle tenue partout sur le site :
 * le bleu (celui des boutons, `--accent`) est Helpify, l'orange est le talent.
 * L'arc du candidat est volontairement plus court — il répond, il n'occupe pas
 * tout l'espace.
 */
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
      <path
        d="M27 10C14 19 14 45 27 54"
        stroke="#1d50fe"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M41 19C50 25 50 39 41 45"
        stroke="#ffa046"
        strokeWidth="7"
        strokeLinecap="round"
      />
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
