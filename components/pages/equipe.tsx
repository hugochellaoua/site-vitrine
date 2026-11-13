import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { CompanyLogo } from "@/components/ui/company-logos";
import { Reveal } from "@/components/ui/reveal";
import { dict, type Locale } from "@/lib/i18n";

/**
 * L'équipe : les groupes vont par deux sur une ligne, chacun sous son
 * intitulé en chasse fixe. Chaque fiche montre la photo de la personne, ou ses
 * initiales en attendant. Chaque fiche porte les initiales (en attendant des
 * photos), le nom, la fonction, le logo de l'entreprise s'il y en a un, ce
 * que la personne apporte, et son expérience en évidence.
 */
export function EquipePage({ locale }: { locale: Locale }) {
  const { equipe } = dict(locale);
  return (
    <>
      <Navbar locale={locale} />
      <main className="relative z-10">
        <section className="px-6 pb-12 pt-40 sm:px-10 sm:pt-48 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <Badge>{equipe.eyebrow}</Badge>
            <SectionTitle as="h1" title={equipe.title} emphasis={equipe.emphasis} className="!mx-0 mt-6 !max-w-[16ch] text-left !text-[clamp(34px,5vw,62px)]" />
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            {/* Les groupes vont par deux sur une ligne : les fondateurs, puis les
                experts. Chaque groupe prend autant de colonnes que de personnes. */}
            {[equipe.groupes.slice(0, 2), equipe.groupes.slice(2)].map((rangee, r) => {
              const total = rangee.reduce((n, g) => n + g.membres.length, 0);
              return (
                <div
                  key={r}
                  className="grid gap-x-4 gap-y-10 border-t border-hairline py-10 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
                  style={{ ["--n" as string]: total }}
                >
                  {rangee.map((g) => (
                    <div key={g.titre} className="flex flex-col gap-4 md:[grid-column:span_var(--s)]" style={{ ["--s" as string]: g.membres.length }}>
                      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-faint">{g.titre}</p>
                      <ul className="grid flex-1 gap-4 md:[grid-template-columns:repeat(var(--s),minmax(0,1fr))]">
                        {g.membres.map((m, i) => (
                          <Reveal key={m.nom} as="li" delay={i * 0.08} className="flex flex-col rounded-[6px] bg-chip p-7">
                            <div className="flex items-start justify-between gap-4">
                              {m.photo ? (
                                <Image src={m.photo} alt={m.nom} width={144} height={144} className="h-[72px] w-[72px] shrink-0 rounded-full object-cover contrast-[1.08] grayscale" />
                              ) : (
                                <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-ink font-display text-[18px] text-void">{m.initiales}</span>
                              )}
                              {m.logo && <CompanyLogo logo={m.logo} className="mt-2 text-ink" />}
                            </div>
                            <p className="mt-6 font-display text-[24px] leading-tight tracking-[-0.03em] text-ink">{m.nom}</p>
                            <p className="mt-1 text-[14.5px] text-muted">{m.role}</p>
                            <ul className="mt-5 flex flex-col gap-2">
                              {m.points.map((pt) => (
                                <li key={pt} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                                  <span className="mt-[9px] h-1 w-1 shrink-0 bg-ink" />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                            {m.experience && (
                              <p className="mt-auto pt-6">
                                <span className="block border-t border-hairline pt-5 font-display text-[18px] tracking-[-0.02em] text-ink">{m.experience}</span>
                              </p>
                            )}
                          </Reveal>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        <section className="sombre bg-void px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{equipe.cta.titre}</h2>
            <Link href={equipe.cta.href} className="group inline-flex items-center gap-2 rounded-[4px] bg-accent px-6 py-3.5 text-[15px] font-medium text-white">
              {equipe.cta.label}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
