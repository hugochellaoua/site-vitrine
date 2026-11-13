import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Les quatre produits Helpify : préqualification, matching, 360 Matching et Talent Ask";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lead: "Une conversation.",
    accent: "Quatre objectifs.",
    sub: "Préqualifier, matcher, révéler les synergies, répondre aux candidats — intégrés à votre ATS.",
  });
}
