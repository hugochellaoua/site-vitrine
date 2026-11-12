import { dict, type Locale } from "@/lib/i18n";

/**
 * L'aperçu du produit, sous le haut de page : une fenêtre de la plateforme,
 * la conversation à gauche, les critères du poste à droite.
 *
 * Tout son contenu vient des étapes du process (le poste, ses critères, un
 * échange avec le candidat et ce qu'Helpify en retient) : l'aperçu montre le
 * même exemple que la frise, rien d'inventé pour l'occasion.
 *
 * Elle chevauche le bas du haut de page sombre, comme une capture posée sur
 * la page, et se lit sur fond clair.
 */
const POIDS = {
  Primordial: "bg-iris-soft text-iris",
  Essential: "bg-iris-soft text-iris",
  Important: "bg-accent-soft text-accent",
  Bonus: "bg-warm-soft text-[#b05800]",
} as Record<string, string>;

export function HeroApercu({ locale }: { locale: Locale }) {
  const { processSteps } = dict(locale);
  const besoin = processSteps.find((s) => s.key === "besoin");
  const echange = processSteps.find((s) => s.key === "reponses");
  if (!besoin || !echange || !("fields" in besoin) || !("messages" in echange)) return null;

  return (
    <div className="relative z-10 -mt-44 px-6 sm:-mt-52" aria-hidden="true">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[22px] border border-hairline bg-white shadow-[0_40px_90px_-40px_rgba(14,22,68,0.55)]">
        <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e6f0]" />
          <span className="ml-3 truncate text-[12px] text-faint">
            {besoin.roleLabel} · {besoin.role}
          </span>
        </div>
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-3 border-b border-hairline p-5 md:border-b-0 md:border-r sm:p-6">
            {echange.messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.from === "helpify"
                    ? "max-w-[88%] rounded-2xl rounded-bl-md bg-accent px-4 py-3 text-[13.5px] leading-snug text-white"
                    : "max-w-[88%] self-end rounded-2xl rounded-br-md bg-[#f1f3f9] px-4 py-3 text-[13.5px] leading-snug text-ink"
                }
              >
                {m.text}
              </p>
            ))}
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">{besoin.fieldsLabel}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {besoin.fields.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-3 rounded-xl border border-hairline px-3.5 py-2.5 text-[13.5px] text-ink">
                  {f.label}
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${POIDS[f.weight] ?? "bg-chip text-muted"}`}>
                    {f.weight}
                  </span>
                </li>
              ))}
            </ul>
            {"extracted" in echange && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {echange.extracted.map((x) => (
                  <li key={x} className="rounded-full bg-[#f1f3f9] px-3 py-1 text-[12px] text-muted">
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
