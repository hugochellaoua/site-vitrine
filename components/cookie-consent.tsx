"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { dict, type Locale } from "@/lib/i18n";
import { GA_ID, mesureAutorisee } from "@/lib/analytics";

/**
 * Le consentement aux cookies de mesure.
 *
 * Refuser est aussi simple qu'accepter : deux boutons identiques, côte à côte.
 * Tant que rien n'est accepté, le script de Google n'est pas même téléchargé —
 * c'est ce qui tient la promesse de la politique de confidentialité : aucune
 * donnée n'est envoyée à Google avant l'accord.
 *
 * Le choix se garde dans le stockage local du navigateur, six mois : la CNIL
 * recommande de redemander passé ce délai. Les trois états (`aucun`, `accepte`,
 * `refuse`) vivent hors de React, dans ce module, pour que le bandeau, le lien
 * du pied de page et un autre onglet restent d'accord sans prop ni contexte.
 */

const CLE = "helpify-cookies";
const DUREE = 1000 * 60 * 60 * 24 * 182;

type Choix = "aucun" | "accepte" | "refuse";

let rouvert = false;
// Seulement si le stockage local est refusé : le choix tient alors jusqu'à la prochaine page.
let enMemoire: Choix | null = null;
const ecouteurs = new Set<() => void>();
const notifier = () => ecouteurs.forEach((f) => f());

function abonner(f: () => void) {
  ecouteurs.add(f);
  window.addEventListener("storage", f);
  return () => {
    ecouteurs.delete(f);
    window.removeEventListener("storage", f);
  };
}

function lireChoix(): Choix {
  if (enMemoire) return enMemoire;
  try {
    const v = JSON.parse(localStorage.getItem(CLE) ?? "null");
    if ((v?.choix === "accepte" || v?.choix === "refuse") && Date.now() - v.date < DUREE) return v.choix;
  } catch {
    /* stockage indisponible ou illisible : on redemande */
  }
  return "aucun";
}

/** Retire les cookies que Google a pu poser, sur chaque niveau de domaine possible. */
function supprimerCookiesGoogle() {
  const noms = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => /^(_ga|_gid|_gat|_gcl_)/.test(n));
  const niveaux = window.location.hostname.split(".");
  const domaines = ["", ...niveaux.slice(0, -1).map((_, i) => `.${niveaux.slice(i).join(".")}`)];
  for (const nom of noms) {
    for (const d of domaines) {
      document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

function decider(choix: "accepte" | "refuse") {
  const avant = lireChoix();
  try {
    localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }));
  } catch {
    enMemoire = choix;
  }
  rouvert = false;
  if (choix === "refuse") {
    supprimerCookiesGoogle();
    // Une fois chargé, le script de Google ne se décharge qu'avec la page.
    if (avant === "accepte") {
      window.location.reload();
      return;
    }
  }
  notifier();
}

/** Le lien « Gérer les cookies » du pied de page : rouvre le bandeau pour changer d'avis. */
export function CookieSettingsButton({ label }: { label: string }) {
  const actif = useSyncExternalStore(abonner, mesureAutorisee, () => false);
  if (!actif) return null;
  return (
    <button
      type="button"
      onClick={() => {
        rouvert = true;
        notifier();
      }}
      className="cursor-pointer transition-colors hover:text-muted"
    >
      {label}
    </button>
  );
}

export function CookieConsent() {
  const pathname = usePathname();
  const locale: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const { cookies } = dict(locale);

  // Côté serveur et à l'hydratation : rien. Le bandeau n'apparaît qu'une fois le
  // navigateur interrogé, ce qui évite de le montrer à qui a déjà répondu.
  const actif = useSyncExternalStore(abonner, mesureAutorisee, () => false);
  const choix = useSyncExternalStore(abonner, lireChoix, (): Choix => "aucun");
  const demande = useSyncExternalStore(abonner, () => rouvert, () => false);

  if (!actif) return null;

  const bouton =
    "flex-1 rounded-full border border-hairline-strong bg-white/5 px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent-light hover:bg-white/10";

  return (
    <>
      {choix === "accepte" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          {/* cookie_expires : 13 mois en secondes, la durée annoncée dans la politique de
              confidentialité. Les signaux Google et la publicité personnalisée restent coupés :
              la mesure ne sert qu'à lire l'audience. */}
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  cookie_expires: 34128000,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});`}
          </Script>
        </>
      )}

      {(choix === "aucun" || demande) && (
        <div
          role="dialog"
          aria-labelledby="cookies-titre"
          className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-hairline-strong bg-panel/95 p-5 shadow-[var(--shadow-deep)] backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[420px]"
        >
          <p id="cookies-titre" className="font-display text-[15px] font-semibold text-ink">
            {cookies.title}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {cookies.text}{" "}
            <Link href={cookies.privacy.href} className="text-ink underline underline-offset-2 hover:text-accent-light">
              {cookies.privacy.label}
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" className={bouton} onClick={() => decider("refuse")}>
              {cookies.refuse}
            </button>
            <button type="button" className={bouton} onClick={() => decider("accepte")}>
              {cookies.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
