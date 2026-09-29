import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { pricing } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { AnimatedStat } from "@/components/animated-stat";
import { SecondaryCta } from "@/components/ui/secondary-cta";

export function Pricing() {
  return (
    <section id="tarifs" className="relative px-6 py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Badge>{pricing.eyebrow}</Badge>
        <SectionTitle title={pricing.title} emphasis={pricing.emphasis} className="mt-6" />
        <p className="mt-3 text-[15px] text-muted">{pricing.sub}</p>

        <div className="mt-14 flex flex-col items-center">
          <AnimatedStat
            value={pricing.stat}
            suffix="%"
            label={pricing.statLabel}
            size="text-[clamp(56px,9vw,96px)]"
            align="center"
          />
        </div>

        <div className="mt-14 flex flex-col items-center gap-2.5">
          <div className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href={pricing.cta.href}
              className="inline-block rounded-full bg-gradient-to-br from-accent-light to-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-18px_rgba(30,79,255,0.7)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-16px_rgba(30,79,255,0.85)]"
            >
              {pricing.cta.label}
            </Link>
          </Magnetic>
          <SecondaryCta />
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
    </section>
  );
}
