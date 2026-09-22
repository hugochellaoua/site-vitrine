"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { contact } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-xl border border-hairline-strong bg-void/60 px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-light focus:shadow-[0_0_0_3px_rgba(29,80,254,0.28)]";
const label = "mb-2 block text-[12.5px] font-medium text-muted";

/**
 * Formulaire de contact. La validation de base est laissée au navigateur
 * (`required`, `type="email"`) : elle est accessible et localisée sans effort.
 * La route serveur revérifie tout — le navigateur ne fait que rendre l'erreur
 * visible plus tôt.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const sentRef = useRef<HTMLHeadingElement>(null);

  // Après l'envoi, le formulaire disparaît : on déplace le focus sur la
  // confirmation pour qu'un lecteur d'écran l'annonce.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center px-4 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-light">
          <Check size={22} strokeWidth={2.5} />
        </span>
        <h2
          ref={sentRef}
          tabIndex={-1}
          className="mt-6 font-display text-[22px] font-bold tracking-[-0.02em] text-ink outline-none"
        >
          {contact.sent.title}
        </h2>
        <p className="mt-2 text-[15px] text-muted">{contact.sent.body}</p>
      </div>
    );
  }

  const f = contact.fields;
  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={label}>{f.firstName}</label>
          <input id="firstName" name="firstName" autoComplete="given-name" maxLength={80} className={input} />
        </div>
        <div>
          <label htmlFor="lastName" className={label}>{f.lastName}</label>
          <input id="lastName" name="lastName" autoComplete="family-name" maxLength={80} className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          {f.email} <span className="text-accent-light" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="phone" className={label}>{f.phone}</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={input} />
      </div>

      <div>
        <label htmlFor="message" className={label}>{f.message}</label>
        <textarea id="message" name="message" rows={5} maxLength={2800} className={`${input} resize-y`} />
      </div>

      {/* Pot de miel : hors de l'écran, hors de la navigation clavier, ignoré
          par les lecteurs d'écran. Seul un robot le remplit. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-[13.5px] text-[#ffc2c2]">
          {contact.error}{" "}
          <Link href={contact.alt.href} className="font-semibold text-ink underline underline-offset-4">
            {contact.alt.label}
          </Link>
        </p>
      )}

      <div className="mt-1 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-faint">* Champ obligatoire</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-[box-shadow,opacity] duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? contact.sending : contact.submit}
          {status !== "sending" && (
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </form>
  );
}
