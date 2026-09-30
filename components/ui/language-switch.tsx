"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Le passage d'une langue à l'autre.
 *
 * Il mène à la page équivalente, pas à l'accueil : quelqu'un qui lit les cas
 * d'usage en français et bascule en anglais veut les cas d'usage en anglais.
 * Le chemin courant sert de clé de correspondance (voir `ROUTES`) ; si la page
 * n'a pas d'équivalent, on retombe sur l'accueil de l'autre langue plutôt que
 * sur une erreur.
 *
 * Les deux libellés sont toujours affichés, celui de la langue active en
 * évidence : un visiteur doit voir qu'une autre version existe avant de
 * chercher comment y aller.
 */
export function LanguageSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname() ?? "/";
  const autre = otherLocalePath(pathname, locale);
  const cible: Locale = locale === "fr" ? "en" : "fr";

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-hairline-strong bg-white/[0.04] p-0.5 text-[11.5px] font-semibold",
        className
      )}
    >
      <span
        aria-current="true"
        className="rounded-full bg-white/[0.08] px-2.5 py-1 uppercase tracking-[0.08em] text-ink"
      >
        {locale}
      </span>
      <Link
        href={autre}
        hrefLang={cible}
        aria-label={cible === "en" ? "Switch to English" : "Passer en français"}
        className="rounded-full px-2.5 py-1 uppercase tracking-[0.08em] text-faint transition-colors hover:text-ink"
      >
        {cible}
      </Link>
    </div>
  );
}
