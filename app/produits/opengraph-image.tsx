import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Les trois produits Helpify : matching, préqualification et Talent Ask";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lead: "Une conversation.",
    accent: "Trois objectifs.",
    sub: "Matcher, préqualifier, engager les candidats — intégrés à votre ATS.",
  });
}
