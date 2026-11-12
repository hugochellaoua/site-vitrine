import { dict, type Locale } from "@/lib/i18n";

/**
 * Le bandeau sous le haut de page : les outils auxquels Helpify se branche,
 * écrits en toutes lettres et en gris, à la façon d'une rangée de logos.
 */
export function IntegrationsBand({ locale }: { locale: Locale }) {
  const { integrations } = dict(locale);
  return (
    <section className="relative px-6 pb-14 pt-16" aria-label={integrations.eyebrow}>
      <p className="text-center text-[13px] text-faint">{integrations.title}</p>
      <ul className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {integrations.logos.map((nom) => (
          <li key={nom} className="font-display text-[17px] font-bold tracking-[-0.01em] text-[#a2a7bf]">
            {nom}
          </li>
        ))}
        <li className="text-[13px] text-faint">{integrations.note}</li>
      </ul>
    </section>
  );
}
