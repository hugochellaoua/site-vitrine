import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt =
  "La méthodologie Helpify : critères précis, questions adaptées, éléments observables, évaluation";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lead: "Une méthodologie fondée sur",
    accent: "les sciences du recrutement.",
    sub: "Critères précis → Questions adaptées → Éléments observables → Évaluation.",
  });
}
