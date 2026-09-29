"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Bouton qui déroule un bloc replié.
 *
 * Le contenu reste dans la page, simplement masqué, plutôt que d'être monté au
 * clic : il demeure ainsi lisible par les moteurs de recherche, et le dépliage
 * est instantané. Les blocs concernés portent du texte que l'on ne veut pas
 * retirer de l'index sous prétexte qu'il est replié.
 *
 * La flèche dit le sens de l'action : vers le bas quand il reste à dérouler,
 * retournée une fois le bloc ouvert.
 */
export function DisclosureButton({
  open,
  onToggle,
  label,
  labelOpen,
  controls,
  size = "lg",
  className = "",
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  /** Libellé une fois ouvert, quand « replier » se dit autrement. */
  labelOpen?: string;
  /** `id` du bloc déroulé, pour que les lecteurs d'écran fassent le lien. */
  controls: string;
  size?: "lg" | "sm";
  className?: string;
}) {
  const grand = size === "lg";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-white/[0.04] font-semibold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]",
        grand ? "px-7 py-4 text-[15px]" : "px-5 py-2.5 text-[13.5px]",
        className
      )}
    >
      {open && labelOpen ? labelOpen : label}
      <ChevronDown
        size={grand ? 17 : 15}
        aria-hidden="true"
        className={cn(
          "text-accent-light transition-transform duration-300",
          open ? "rotate-180" : "group-hover:translate-y-0.5"
        )}
      />
    </button>
  );
}

/** Le bloc déroulé lui-même — masqué tant qu'il est replié. */
export function DisclosurePanel({
  open,
  id,
  children,
  className = "",
}: {
  open: boolean;
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id={id} hidden={!open} className={className}>
      {children}
    </div>
  );
}
