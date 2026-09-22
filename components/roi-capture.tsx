"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { roi } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Capture d'e-mail au pied du simulateur.
 *
 * Le message envoyé contient les hypothèses saisies et les résultats obtenus :
 * au moment du rappel, on sait déjà de quels volumes parle l'interlocuteur.
 * Aucun champ obligatoire en plus de l'adresse — chaque champ ajouté ici
 * coûterait des demandes.
 */
export function RoiCapture({ recap }: { recap: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: recap, source: roi.capture.source }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl border border-accent/35 bg-accent-soft px-5 py-4 text-[14px] text-ink">
        <Check size={16} className="text-accent-light" />
        {roi.capture.sent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-hairline bg-void/40 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-bold text-ink">{roi.capture.title}</p>
          <p className="mt-1 text-[13px] text-muted">{roi.capture.sub}</p>
        </div>

        <div className="flex w-full gap-2.5 sm:w-auto">
          <label htmlFor="roi-email" className="sr-only">
            {roi.capture.placeholder}
          </label>
          <input
            id="roi-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder={roi.capture.placeholder}
            className="w-full min-w-0 rounded-full border border-hairline-strong bg-void/70 px-4 py-3 text-[14px] text-ink placeholder:text-faint outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-light focus:shadow-[0_0_0_3px_rgba(29,80,254,0.28)] sm:w-64"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-[14px] font-semibold text-white transition-opacity disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? roi.capture.sending : roi.capture.submit}
            {status !== "sending" && (
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-[13px] text-[#ffc2c2]">
          {roi.capture.error}
        </p>
      )}
    </form>
  );
}
