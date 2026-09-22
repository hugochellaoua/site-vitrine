import { services } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { SecondaryCta } from "@/components/ui/secondary-cta";

/* Une ligne par offre : ces services complètent le produit, ils ne sont pas
   le sujet principal de la page. */
export function Services() {
  return (
    <section id="services" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{services.eyebrow}</Badge>
          <SectionTitle title={services.title} emphasis={services.emphasis} className="mt-6" />
        </div>

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {services.items.map((item) => (
            <div
              key={item.n}
              className="group flex flex-col gap-2 py-7 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-display text-[12px] font-bold tracking-[0.18em] text-faint transition-colors group-hover:text-accent-light">
                {item.n}
              </span>
              <h3 className="font-display text-[18px] font-semibold text-ink sm:w-[34%] sm:shrink-0">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{item.line}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SecondaryCta />
        </div>
      </div>
    </section>
  );
}
