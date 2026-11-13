import { dict, type Locale } from "@/lib/i18n";
import { CompanyLogo } from "@/components/ui/company-logos";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Les experts qui entourent l'équipe.
 *
 * Section volontairement basse : trois fiches courtes, côte à côte, et une seule
 * phrase d'introduction. Elle sert à rassurer, pas à raconter — un visiteur doit
 * la saisir d'un regard avant de passer aux bénéfices chiffrés.
 *
 * Trois mises en page selon la largeur, pour que le texte reste confortable :
 *  — large : trois colonnes, chaque fiche en pile ;
 *  — moyenne : une fiche par ligne, l'identité à gauche et le descriptif à droite
 *    (trois colonnes y seraient trop étroites pour un texte de cette longueur) ;
 *  — étroite : une fiche par ligne, en pile.
 *
 * Les fiches ne sont pas cliquables : aucun lien n'est fourni, et une surface qui
 * réagit au survol promet une action qui n'existe pas.
 */

/** Initiales pour l'avatar, en attendant des photos : deux premiers mots du nom. */
function initiales(nom: string) {
  return nom
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot.charAt(0).toUpperCase())
    .join("");
}

export function Experts({ locale }: { locale: Locale }) {
  const { experts } = dict(locale);
  return (
    <section id="experts" className="relative px-6 py-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <SectionTitle title={experts.title} emphasis={experts.emphasis} />
          <p className="mt-5 max-w-2xl text-balance text-[15.5px] leading-relaxed text-muted">
            {experts.intro}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {experts.items.map((expert, i) => (
            <Reveal key={expert.name} as="li" delay={i * 0.1} y={22} className="h-full">
              <div className="lit-card flex h-full flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-10 lg:flex-col lg:items-stretch lg:gap-4">
                <div className="sm:w-[44%] sm:shrink-0 lg:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-[14px] font-semibold tracking-wide text-white ring-4 ring-accent/20"
                    >
                      {initiales(expert.name)}
                    </span>
                    {expert.logo && <CompanyLogo logo={expert.logo} className="text-ink/80" />}
                  </div>
                  <h3 className="mt-4 font-display text-[19px] font-bold leading-tight tracking-[-0.015em] text-ink">
                    {expert.name}
                  </h3>
                  {/* Hauteur réservée à deux lignes : les descriptifs démarrent alors au
                      même niveau d'une fiche à l'autre, même si la fonction de l'une
                      tient sur une ligne et celle d'une autre sur deux. */}
                  <p className="mt-1.5 text-[14px] font-medium leading-snug text-ink/85 lg:min-h-[2.4rem]">
                    {expert.role}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-muted sm:flex-1">{expert.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
