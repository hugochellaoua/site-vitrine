import { dict, type Locale } from "@/lib/i18n";

/**
 * Le bandeau sous le haut de page : les outils auxquels Helpify se branche,
 * écrits en toutes lettres et en gris, qui défilent lentement comme une rangée
 * de logos. La liste est posée deux fois à la suite : quand la première moitié
 * est sortie, la seconde a pris exactement sa place, et la boucle ne se voit
 * pas. Les bords s'estompent, le survol met en pause, et qui a demandé moins
 * de mouvement voit la liste immobile, sur plusieurs lignes.
 */
function Liste({ noms, cachee = false }: { noms: string[]; cachee?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4" aria-hidden={cachee || undefined}>
      {noms.map((nom) => (
        <li key={nom} className="whitespace-nowrap font-display text-[18px] font-bold tracking-[-0.01em] text-[#a2a7bf]">
          {nom}
        </li>
      ))}
    </ul>
  );
}

export function IntegrationsBand({ locale }: { locale: Locale }) {
  const { integrations } = dict(locale);
  const fondu = "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";
  return (
    <section className="relative pb-14 pt-16" aria-label={integrations.eyebrow}>
      <p className="px-6 text-center text-[13px] text-faint">{integrations.title}</p>
      <div className="mt-7 overflow-hidden" style={{ maskImage: fondu, WebkitMaskImage: fondu }}>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center">
          <Liste noms={integrations.logos} />
          <span className="contents motion-reduce:hidden">
            <Liste noms={integrations.logos} cachee />
          </span>
        </div>
      </div>
    </section>
  );
}
