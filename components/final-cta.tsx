"use client";

import Link from "next/link";
import { MotCandidat } from "@/components/ui/mot-candidat";
import { Magnetic } from "@/components/ui/magnetic";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";


const OFFSETS = [0, -14, 10, -8, 14, -4, 6];

export function FinalCta({ locale }: { locale: Locale }) {
  const { finalCta } = dict(locale);
  return (
    <section className="relative overflow-hidden px-6 py-40">
      {/* Fond noir uni : ni champ de points, ni lueur. */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Les sept promesses gravitent autour du logotype, comme dans la vidéo :
            elles ne sont pas une liste à lire, mais un halo de sens. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {finalCta.chips.map((chip, i) => (
            <Reveal
              key={chip}
              as="li"
              /* Décalage vertical alterné : les pastilles gravitent autour du
                 titre au lieu de s'aligner en paragraphe. Le rang du chip suffit
                 à produire l'irrégularité — inutile de tirer au hasard, ce qui
                 rendrait le rendu différent à chaque visite. */
              restY={OFFSETS[i % OFFSETS.length]}
              y={18}
              delay={0.1 + i * 0.09}
              className="chip-float flex items-center gap-2.5 rounded-[4px] border border-hairline-strong bg-chip px-4 py-2.5 text-[13px] font-medium text-ink "
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light"
                style={{ boxShadow: "0 0 10px 1px rgba(91,129,255,.9)" }}
              />
              {chip}
            </Reveal>
          ))}
        </ul>

        <Reveal
          as="h2"
          delay={0.45}
          y={18}
          className="mt-14 max-w-[18ch] text-balance font-display text-[clamp(30px,4.6vw,58px)] font-bold leading-[1.04] tracking-[-0.03em] text-ink"
        >
          <MotCandidat texte={finalCta.title} avecPoint /> <span className="text-warm">{finalCta.emphasis}</span>
        </Reveal>

        <Reveal delay={0.7} y={14} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href={finalCta.cta.href}
              className="group inline-flex items-center gap-2.5 rounded-[4px] bg-accent px-8 py-4 text-[15px] font-semibold text-white transition-opacity duration-300 hover:opacity-90"
            >
              {finalCta.cta.label}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <SecondaryCta locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
