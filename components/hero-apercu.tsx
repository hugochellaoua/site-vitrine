"use client";

import { useEffect, useState } from "react";
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
 *
 * Elle se joue seule, en boucle : Helpify écrit, sa question apparaît, le
 * candidat écrit et répond, puis les critères du poste s'allument un à un et
 * les informations retenues s'affichent. Qui a demandé moins de mouvement la
 * voit d'emblée en entier.
 */

/** Durée de chaque temps de la scène, en millisecondes. */
const TEMPS = [700, 1300, 1600, 1300, 2400, 450, 450, 450, 450, 900, 4200];
const POIDS = {
  Primordial: "bg-iris-soft text-iris",
  Essential: "bg-iris-soft text-iris",
  Important: "bg-accent-soft text-accent",
  Bonus: "bg-warm-soft text-[#b05800]",
} as Record<string, string>;

/** Les trois points de quelqu'un qui écrit. */
function Points({ cote }: { cote: "helpify" | "candidate" }) {
  return (
    <span
      className={`flex w-max items-center gap-1.5 rounded-2xl px-4 py-3 ${
        cote === "helpify" ? "rounded-bl-md bg-accent-soft text-accent" : "self-end rounded-br-md bg-[#f1f3f9] text-faint"
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-current" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

export function HeroApercu({ locale }: { locale: Locale }) {
  const [etape, setEtape] = useState(99);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    let n = 0;
    const suivant = () => {
      setEtape(n);
      t = window.setTimeout(() => {
        n = (n + 1) % TEMPS.length;
        suivant();
      }, TEMPS[n]);
    };
    suivant();
    return () => window.clearTimeout(t);
  }, []);

  const { processSteps } = dict(locale);
  const besoin = processSteps.find((s) => s.key === "besoin");
  const echange = processSteps.find((s) => s.key === "reponses");
  if (!besoin || !echange || !("fields" in besoin) || !("messages" in echange)) return null;

  // Ce qui est visible à chaque temps : 1 Helpify écrit, 2 sa question, 3 le
  // candidat écrit, 4 sa réponse, 5 à 8 les critères, 9 les informations.
  const vu = (seuil: number) => etape >= seuil;
  const apparition = (seuil: number) =>
    `transition-[opacity,transform] duration-500 ${vu(seuil) ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-1.5"}`;
  const [question, reponse] = echange.messages;

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
            {etape === 1 ? (
              <Points cote="helpify" />
            ) : (
              <p className={`max-w-[88%] rounded-2xl rounded-bl-md bg-accent px-4 py-3 text-[13.5px] leading-snug text-white ${apparition(2)}`}>
                {question.text}
              </p>
            )}
            {etape === 3 ? (
              <Points cote="candidate" />
            ) : (
              <p className={`max-w-[88%] self-end rounded-2xl rounded-br-md bg-[#f1f3f9] px-4 py-3 text-[13.5px] leading-snug text-ink ${apparition(4)}`}>
                {reponse.text}
              </p>
            )}
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">{besoin.fieldsLabel}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {besoin.fields.map((f, i) => (
                <li key={f.label} className={`${apparition(5 + i)} flex items-center justify-between gap-3 rounded-xl border border-hairline px-3.5 py-2.5 text-[13.5px] text-ink`}>
                  {f.label}
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${POIDS[f.weight] ?? "bg-chip text-muted"}`}>
                    {f.weight}
                  </span>
                </li>
              ))}
            </ul>
            {"extracted" in echange && (
              <ul className={`mt-4 flex flex-wrap gap-1.5 ${apparition(9)}`}>
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
