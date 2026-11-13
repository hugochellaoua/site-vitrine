"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Le calculateur de ROI, à côté des tarifs.
 *
 * Deux façons d'entrer : le temps de tri par semaine, si on le connaît ; sinon
 * les recrutements de l'année et les candidatures reçues pour chacun, à
 * 2 minutes la candidature. Le résultat se lit en jours (7 heures), par mois et
 * par an ; avec un taux horaire, il se lit aussi en euros. Puis la question.
 *
 * Aucun gain n'est promis : le calcul ne porte que sur ce que le tri coûte
 * aujourd'hui, avec les seuls chiffres du visiteur.
 */

type Mode = "temps" | "recrutements";

const HEURES_PAR_JOUR = 7;
const SEMAINES_PAR_AN = 52;

/** Un nombre saisi, virgule ou point ; vide ou invalide : rien. */
function lire(v: string): number | null {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() && Number.isFinite(n) && n >= 0 ? n : null;
}

function Champ({
  label,
  unite,
  valeur,
  changer,
  exemple,
}: {
  label: string;
  unite?: string;
  valeur: string;
  changer: (v: string) => void;
  exemple: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] text-muted">
        {label}
      </label>
      <div className="mt-1.5 flex items-center rounded-[6px] border border-hairline-strong bg-white focus-within:border-ink">
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={valeur}
          onChange={(e) => changer(e.target.value)}
          placeholder={exemple}
          className="w-full min-w-0 bg-transparent px-3.5 py-2.5 text-[16px] text-ink outline-none placeholder:text-faint"
        />
        {unite && <span className="pr-3.5 font-mono text-[12px] text-faint">{unite}</span>}
      </div>
    </div>
  );
}

export function CalculRoi({ locale }: { locale: Locale }) {
  const { calculRoi: t } = dict(locale);
  const [mode, setMode] = useState<Mode>("temps");
  const [heuresSemaine, setHeuresSemaine] = useState("");
  const [recrutements, setRecrutements] = useState("");
  const [candidatures, setCandidatures] = useState("");
  const [taux, setTaux] = useState("");

  const nf = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", { maximumFractionDigits: 1 });
  const eur = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  // Heures de tri par an, selon l'entrée choisie.
  let heuresAn: number | null = null;
  if (mode === "temps") {
    const h = lire(heuresSemaine);
    if (h !== null) heuresAn = h * SEMAINES_PAR_AN;
  } else {
    const r = lire(recrutements);
    const c = lire(candidatures);
    if (r !== null && c !== null) heuresAn = (r * c * t.minutesParCandidature) / 60;
  }
  const pret = heuresAn !== null && heuresAn > 0;
  const heuresMois = heuresAn !== null ? heuresAn / 12 : null;
  const joursAn = heuresAn !== null ? heuresAn / HEURES_PAR_JOUR : null;
  const joursMois = heuresMois !== null ? heuresMois / HEURES_PAR_JOUR : null;
  const tauxH = lire(taux);
  const coutAn = pret && tauxH ? heuresAn! * tauxH : null;
  const coutMois = coutAn !== null ? coutAn / 12 : null;

  const jours = (n: number | null) =>
    n === null ? "—" : `${nf.format(n)} ${n >= 2 ? t.jours : t.jour}`;

  return (
    <div id="roi" className="scroll-mt-28 rounded-[10px] border border-hairline bg-chip p-6 sm:p-8">
      <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-faint">{t.eyebrow}</p>
      <h3 className="mt-3 text-balance font-display text-[clamp(22px,2.4vw,28px)] leading-[1.12] tracking-[-0.02em] text-ink">
        {t.title}
      </h3>

      {/* Les deux entrées possibles. */}
      <div role="tablist" className="mt-6 grid grid-cols-2 gap-1 rounded-[8px] bg-void p-1">
        {(["temps", "recrutements"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-[6px] px-3 py-2 text-[13px] leading-snug transition-colors",
              mode === m ? "bg-ink text-void" : "text-muted hover:text-ink",
            )}
          >
            {t.modes[m]}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {mode === "temps" ? (
          <Champ label={t.heuresSemaine.label} unite={t.heuresSemaine.unite} valeur={heuresSemaine} changer={setHeuresSemaine} exemple="10" />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Champ label={t.recrutements.label} valeur={recrutements} changer={setRecrutements} exemple="20" />
              <Champ label={t.candidatures.label} valeur={candidatures} changer={setCandidatures} exemple="150" />
            </div>
            <p className="-mt-1 text-[12px] text-faint">{t.base}</p>
          </>
        )}
      </div>

      {/* Premier sous-total : le temps, en jours. */}
      <div className="mt-6 border-t border-hairline pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{t.sousTotal}</p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {[
            { j: joursMois, h: heuresMois, l: t.parMois },
            { j: joursAn, h: heuresAn, l: t.parAn },
          ].map((x) => (
            <div key={x.l}>
              <p className="font-display text-[clamp(26px,3vw,34px)] leading-none tracking-[-0.03em] text-ink">{jours(pret ? x.j : null)}</p>
              <p className="mt-1.5 text-[12.5px] text-muted">
                {x.l}
                {pret && x.h !== null && ` · ${nf.format(x.h)} ${t.heures}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Champ label={t.taux.label} unite={t.taux.unite} valeur={taux} changer={setTaux} exemple="40" />
      </div>

      <p className="mt-3 text-[12px] text-faint">{t.hypotheses}</p>

      {/* Le résultat en une phrase, puis la question. */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
        style={{ gridTemplateRows: pret ? "1fr" : "0fr", opacity: pret ? 1 : 0 }}
        aria-live="polite"
      >
        <div className="overflow-hidden">
          <p className="mt-6 text-[15.5px] leading-relaxed text-ink">
            {t.phrase.debut} <strong className="font-semibold">{jours(joursMois)}</strong> {t.phrase.milieu}{" "}
            <strong className="font-semibold">{jours(joursAn)}</strong> {t.phrase.fin}
            {coutAn !== null && coutMois !== null && (
              <>
                {" "}
                {t.phrase.cout} <strong className="font-semibold">{eur.format(coutMois)}</strong> {t.phrase.coutMilieu}{" "}
                <strong className="font-semibold">{eur.format(coutAn)}</strong> {t.phrase.coutFin}
              </>
            )}
          </p>

          <div className={cn("mt-5 rounded-[8px] bg-ink p-6 text-void", pret && "roi-pop")}>
            <p className="text-balance font-display text-[clamp(19px,2vw,23px)] leading-[1.25] tracking-[-0.02em]">{t.question}</p>
            <Link
              href={t.cta.href}
              className="group mt-5 inline-flex items-center gap-2 rounded-[4px] bg-void px-5 py-3 text-[14px] font-medium text-ink"
            >
              {t.cta.label}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
