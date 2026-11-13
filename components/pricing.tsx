import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { dict, type Locale } from "@/lib/i18n";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { AnimatedStat } from "@/components/animated-stat";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { CalculRoi } from "@/components/calcul-roi";

export function Pricing({ locale }: { locale: Locale }) {
  const { pricing } = dict(locale);
  return (
    // Les tarifs à gauche, le calculateur de ROI à côté : on y arrive par
    // « Tarifs » comme par « Calculer mon ROI ».
    <section id="tarifs" className="relative scroll-mt-20 px-6 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col items-center text-center lg:sticky lg:top-28 lg:items-start lg:text-left">
        <Badge>{pricing.eyebrow}</Badge>
        <SectionTitle title={pricing.title} emphasis={pricing.emphasis} className="mt-6 lg:!mx-0" />
        <p className="mt-3 text-[15px] text-muted">{pricing.sub}</p>

        <div className="mt-12 flex flex-col items-center lg:items-start">
          <AnimatedStat
            value={pricing.stat}
            suffix="%"
            label={pricing.statLabel}
            size="text-[clamp(56px,9vw,96px)]"
            align="responsive"
          />
        </div>

        <div className="mt-12 flex flex-col items-center gap-2.5 lg:items-start">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Magnetic>
            <Link
              href={pricing.cta.href}
              className="inline-block rounded-[4px] bg-gradient-to-br from-accent-light to-accent px-8 py-4 text-[15px] font-semibold text-white transition-shadow duration-300"
            >
              {pricing.cta.label}
            </Link>
          </Magnetic>
          <SecondaryCta locale={locale} />
          </div>
          <span className="text-[12.5px] text-faint">{pricing.ctaSub}</span>
          {/* Vers l'application, qui est sur un autre domaine. */}
          <a
            href={pricing.altLink.href}
            className="mt-2 text-[13px] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {pricing.altLink.label}
          </a>
        </div>
      </div>

      <CalculRoi locale={locale} />
      </div>
    </section>
  );
}
