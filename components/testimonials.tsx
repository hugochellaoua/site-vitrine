import { testimonials } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";

/**
 * Témoignages clients.
 *
 * La section est entièrement construite, mais elle ne s'affiche qu'en
 * développement : le contenu actuel n'est fait que d'emplacements. Publier de
 * faux avis serait trompeur pour les visiteurs et constitue une pratique
 * commerciale interdite.
 *
 * Pour la mettre en ligne : remplacer les citations dans `lib/content.ts` par
 * de vrais propos recueillis avec l'accord de leur auteur, puis supprimer la
 * condition ci-dessous et la bannière d'avertissement.
 */
export function Testimonials() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{testimonials.eyebrow}</Badge>
          <SectionTitle title={testimonials.title} emphasis={testimonials.emphasis} className="mt-6" />
        </div>

        <p className="mx-auto mt-6 max-w-[60ch] rounded-xl border border-warning/40 bg-warm-soft px-4 py-3 text-center text-[12.5px] text-warm-light">
          {testimonials.placeholderWarning}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal
              key={i}
              as="figure"
              delay={i * 0.1}
              className="lit-card flex flex-col justify-between gap-6 px-7 py-8"
            >
              <blockquote className="text-[15px] leading-relaxed text-[#e4e5f5]">
                <span className="mr-1 font-display text-[22px] leading-none text-accent-light">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-hairline pt-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[13px] font-bold text-accent-light"
                  aria-hidden="true"
                >
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <span className="text-[13px] leading-tight">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-faint">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
