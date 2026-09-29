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
  tone = "neutral",
  className = "",
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  /** Libellé une fois ouvert, quand « replier » se dit autrement. */
  labelOpen?: string;
  /** `id` du bloc déroulé, pour que les lecteurs d'écran fassent le lien. */
  controls: string;
  size?: "xl" | "lg" | "sm";
  /** `warm` met le bouton en orange, pour le détacher sans prendre la place du
   *  bleu plein, qui reste réservé à l'action la plus engageante. */
  tone?: "neutral" | "warm";
  className?: string;
}) {
  const chaud = tone === "warm";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={cn(
        "group inline-flex items-center rounded-full border font-semibold backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300",
        chaud
          // La lueur orange donne au bouton la présence d'une vraie invitation :
          // sans elle, un contour se perd dans une page sombre parcourue vite.
          ? "border-warm/55 bg-warm-soft text-warm-light shadow-[0_18px_50px_-18px_rgba(255,160,70,0.5)] hover:border-warm/80 hover:bg-warm/20 hover:shadow-[0_24px_64px_-16px_rgba(255,160,70,0.7)]"
          : "border-hairline-strong bg-white/[0.04] text-ink hover:border-white/30 hover:bg-white/[0.08]",
        size === "xl"
          // Large et mince plutôt que haut et court : la barre traverse la
          // moitié de la page sur un grand écran, et prend toute la largeur
          // disponible moins les marges sur un petit.
          ? "w-full max-w-[640px] justify-center gap-3 px-6 py-3 text-[16.5px]"
          : size === "lg"
            ? "gap-2.5 px-7 py-4 text-[15px]"
            : "gap-2.5 px-5 py-2.5 text-[13.5px]",
        className
      )}
    >
      {open && labelOpen ? labelOpen : label}
      <ChevronDown
        size={size === "xl" ? 20 : size === "lg" ? 17 : 15}
        aria-hidden="true"
        className={cn(
          "transition-transform duration-300",
          chaud ? "text-warm" : "text-accent-light",
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
