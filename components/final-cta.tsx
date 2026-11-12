"use client";

import Link from "next/link";
import { MotCandidat } from "@/components/ui/mot-candidat";
import { Magnetic } from "@/components/ui/magnetic";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";



export function FinalCta({ locale }: { locale: Locale }) {
  const { finalCta } = dict(locale);
  return (
    <section className="relative overflow-hidden px-6 py-40">
      {/* Fond noir uni : ni champ de points, ni lueur. */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">

        <Reveal
          as="h2"
          delay={0.45}
          y={18}
          className="max-w-[18ch] text-balance font-display text-[clamp(34px,5vw,64px)] font-normal leading-[1.04] tracking-[-0.03em] text-ink"
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
