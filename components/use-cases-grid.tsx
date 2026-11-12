import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Les neuf cas d'usage en grille, sur l'accueil : le nom de la situation et la
 * promesse en une ligne, chacun menant à son détail sur la page des cas
 * d'usage. Le visiteur repère sa situation sans lire la page entière.
 */
export function UseCasesGrid({ locale }: { locale: Locale }) {
  const { useCases } = dict(locale);
  const base = locale === "en" ? "/en/use-cases" : "/cas-d-usage";
  return (
    <section className="relative border-y border-hairline bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{useCases.eyebrow}</Badge>
          <SectionTitle title={useCases.title} emphasis={useCases.emphasis} className="mt-6" />
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((u, i) => (
            <Reveal key={u.id} as="li" delay={(i % 3) * 0.06}>
              <Link href={`${base}#${u.id}`} className="group flex gap-4">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-[14px] font-bold ${
                    u.tone === "iris" ? "bg-iris-soft text-iris" : "bg-accent-soft text-accent"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-display text-[16px] font-bold text-ink">
                    {u.menu}
                    <ArrowRight size={14} className="text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </span>
                  <span className="mt-1 block text-[14px] leading-snug text-muted">{u.promise}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
