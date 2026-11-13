import Link from "next/link";
import { ArrowRight, Clock, Eye, KeyRound, Scale, UserCheck } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Vos données, en bandeau : le titre à gauche, l'engagement principal et le
 * lien vers la notice IA à droite, puis une rangée de cinq garanties séparées
 * par de fins filets. Chaque garantie reprend un engagement écrit dans la
 * notice IA, la politique de confidentialité ou les CGU du site.
 */
const ICONES = [UserCheck, Eye, KeyRound, Clock, Scale];

export function Donnees({ locale }: { locale: Locale }) {
  const { donnees, footer } = dict(locale);
  return (
    <section id="donnees" className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionTitle title={donnees.title} emphasis={donnees.emphasis} className="!mx-0 !max-w-[15ch] text-left" />
          <div>
            <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">{donnees.items[0].body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={donnees.links[0].href}
                className="group inline-flex items-center gap-2 rounded-[4px] border border-hairline-strong px-5 py-3 text-[14px] text-ink transition-colors hover:border-ink/60"
              >
                {donnees.links[0].label}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <span className="text-[13px] text-faint">{footer.badges[0]}</span>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {donnees.items.map((item, i) => {
            const Icone = ICONES[i % ICONES.length];
            return (
              <li key={item.title} className={`pr-6 ${i > 0 ? "lg:border-l lg:border-hairline lg:pl-6" : ""}`}>
                <Icone size={44} strokeWidth={1.1} className="text-ink/85" aria-hidden="true" />
                <p className="mt-6 max-w-[16ch] text-[15.5px] leading-snug text-ink">{item.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
