import { cn } from "@/lib/cn";

/**
 * La marque : deux voix qui se répondent.
 *
 * Ni bulle ni phylactère — ceux-là renvoient au support client et datent le
 * produit. Deux arcs face à face suffisent : le grand écoute, le petit répond.
 * C'est la conversation elle-même, pas son décor.
 *
 * Noir et blanc : la marque prend la couleur du texte qui l'entoure (noire sur
 * fond clair, blanche sur fond sombre). L'arc du candidat, plus court, est un
 * ton plus léger : il répond, il n'occupe pas tout l'espace.
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
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M41 19C50 25 50 39 41 45"
        stroke="currentColor"
        strokeOpacity="0.45"
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
