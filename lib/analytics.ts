/**
 * Mesure d'audience Google Analytics.
 *
 * Rien n'est chargé tant que le visiteur n'a pas accepté : ni script, ni
 * cookie, ni requête vers Google. C'est `CookieConsent` qui décide ; ce
 * fichier ne fait que nommer les choses.
 */

/**
 * L'ID de mesure du flux Web de la propriété Google Analytics. Il n'a rien de
 * secret : il figure dans le code de toute page qui s'en sert.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-8T5W925NL7";

const HOTES_DE_PRODUCTION = ["helpify-ai.fr", "www.helpify-ai.fr"];

/**
 * La mesure ne tourne qu'en production : un aperçu Vercel ou un poste de
 * développement ne doit ni afficher le bandeau ni fausser les statistiques.
 * Renseigner `NEXT_PUBLIC_GA_ID` lève cette garde, pour essayer une autre
 * propriété ailleurs qu'en production.
 */
export function mesureAutorisee(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_ID) || HOTES_DE_PRODUCTION.includes(window.location.hostname);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Signale un évènement à Google Analytics (un formulaire envoyé, par exemple).
 * Sans effet tant que le visiteur n'a pas accepté : `gtag` n'existe pas avant
 * que le script soit chargé.
 */
export function suivi(evenement: string, donnees: Record<string, unknown> = {}) {
  window.gtag?.("event", evenement, donnees);
}
