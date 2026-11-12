import Link from "next/link";
import { ArrowRight, Clock, Eye, KeyRound, Scale, UserCheck } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { Badge, SectionTitle } from "@/components/ui/section-title";

/**
 * Vos données : les engagements de la plateforme sur les candidatures, en cinq
 * cartes, avec les liens vers les textes qui les fondent (notice IA,
 * politique de confidentialité). C'est la question que pose tout DRH avant
 * d'aller plus loin ; on y répond sur l'accueil, sans l'envoyer lire un texte
 * juridique.
 */
const ICONES = [UserCheck, Eye, KeyRound, Clock, Scale];

export function Donnees({ locale }: { locale: Locale }) {
  const { donnees } = dict(locale);
  return (
    <section id="donnees" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{donnees.eyebrow}</Badge>
          <SectionTitle title={donnees.title} emphasis={donnees.emphasis} className="mt-6" />
          <p className="mt-5 max-w-xl text-balance text-[16px] leading-relaxed text-muted">{donnees.intro}</p>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {donnees.items.map((item, i) => {
            const Icone = ICONES[i % ICONES.length];
            return (
              <Reveal key={item.title} as="li" delay={i * 0.06} className="border-t border-hairline pt-6 pr-4">
                <span className="grid h-9 w-9 place-items-center text-ink">
                  <Icone size={19} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display text-[17px] leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {donnees.links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group inline-flex items-center gap-1.5 rounded-[4px] px-4 py-2.5 text-[13.5px] font-medium ${
                i === 0 ? "bg-ink text-void" : "border border-hairline-strong text-ink"
              }`}
            >
              {l.label}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
