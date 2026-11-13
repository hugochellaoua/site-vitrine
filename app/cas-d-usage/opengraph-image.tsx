import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt =
  "Les cas d'usage Helpify : volume de candidatures, évaluation homogène, CV optimisés par l'IA, profils atypiques, vivier";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lead: "Neuf situations.",
    accent: "Une réponse concrète.",
    sub: "Volume, standardisation, lecture des profils, CV boostés par l'IA, profils atypiques.",
  });
}
