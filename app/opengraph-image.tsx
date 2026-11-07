import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Helpify — l'IA qui préqualifie chaque candidat par la conversation";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lead: "L'intelligence qui révèle et engage",
    accent: "vos meilleurs talents.",
    sub: "Une conversation qui comprend votre entreprise, échange avec chaque candidat et vous aide à recruter plus vite.",
  });
}
