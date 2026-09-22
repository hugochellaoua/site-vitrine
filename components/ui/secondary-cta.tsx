import Link from "next/link";
import { learnMore } from "@/lib/content";

/**
 * « En savoir plus » — le second palier d'engagement.
 *
 * Toujours en contour : la hiérarchie doit se lire d'un coup d'œil. Le bleu
 * plein reste réservé à l'action la plus engageante (réserver) ; celle-ci est
 * l'alternative pour qui n'est pas encore prêt à bloquer un créneau. Là où un
 * « Réserver » existe, elle se place à côté de lui, jamais à sa place.
 *
 * Elle mène à la page de contact du site.
 */
export function SecondaryCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href={learnMore.href}
      className={`inline-flex items-center rounded-full border border-hairline-strong bg-white/[0.04] px-7 py-4 text-[15px] font-semibold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] ${className}`}
    >
      {learnMore.label}
    </Link>
  );
}
