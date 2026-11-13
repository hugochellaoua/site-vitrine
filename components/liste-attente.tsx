"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

type Etat = "attente" | "envoi" | "ok" | "erreur";

const champ =
  "w-full rounded-[4px] border border-hairline-strong bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition-colors focus:border-ink";

/**
 * La liste d'attente de l'espace candidat. Elle passe par la même route que le
 * formulaire de contact : l'inscription arrive dans Slack, marquée « Liste
 * d'attente · Espace candidat ». On ne confirme l'inscription que si l'envoi
 * a réussi.
 */
export function ListeAttente({ locale }: { locale: Locale }) {
  const a = dict(locale).espaceCandidat.attente;
  const [etat, setEtat] = useState<Etat>("attente");

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: f.firstName,
          email: f.email,
          message: f.metier ? `${a.metier} : ${f.metier}` : "",
          source: a.source,
          website: f.website,
        }),
      });
      setEtat(res.ok ? "ok" : "erreur");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "ok") {
    return (
      <p role="status" className="flex items-center gap-3 rounded-[6px] bg-white px-5 py-4 text-[15px] text-ink">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-void">
          <Check size={15} strokeWidth={2.5} />
        </span>
        {a.ok}
      </p>
    );
  }

  return (
    <form onSubmit={envoyer} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="la-prenom">{a.prenom}</label>
        <input id="la-prenom" name="firstName" autoComplete="given-name" maxLength={80} placeholder={a.prenom} className={champ} />
        <label className="sr-only" htmlFor="la-email">{a.email}</label>
        <input id="la-email" name="email" type="email" required autoComplete="email" maxLength={200} placeholder={a.email} className={champ} />
      </div>
      <label className="sr-only" htmlFor="la-metier">{a.metier}</label>
      <input id="la-metier" name="metier" maxLength={120} placeholder={a.metier} className={champ} />
      {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={etat === "envoi"}
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[4px] bg-ink px-6 py-3.5 text-[15px] font-medium text-void transition-opacity disabled:opacity-60"
      >
        {etat === "envoi" ? a.envoi : a.bouton}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      {etat === "erreur" && <p role="alert" className="text-[13.5px] text-error">{a.erreur}</p>}
      <p className="text-[12px] leading-relaxed text-faint">
        {a.mention}{" "}
        <Link href={a.confidentialite.href} className="underline underline-offset-2">
          {a.confidentialite.label}
        </Link>
      </p>
    </form>
  );
}
