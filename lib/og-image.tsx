import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Image de partage, commune à toutes les pages.
 *
 * Générée au build à partir des couleurs de la marque : aucun fichier image à
 * maintenir, et le texte reste net à toutes les tailles. Chaque page appelle
 * cette fonction avec son propre titre — c'est LinkedIn qui l'affichera, et
 * un visuel générique y serait une occasion manquée.
 */
export function renderOgImage({
  lead,
  accent,
  sub,
}: {
  lead: string;
  accent: string;
  sub: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#141037",
          backgroundImage:
            "radial-gradient(900px 520px at 50% 42%, rgba(29,80,254,0.42) 0%, rgba(29,80,254,0.08) 45%, rgba(20,16,55,0) 72%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#1d50fe" }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>Helpify</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
          <span style={{ color: "#ffffff" }}>{lead}&nbsp;</span>
          <span style={{ color: "#ffa046" }}>{accent}</span>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#a8adcf", marginTop: 34, maxWidth: 900, lineHeight: 1.4 }}>
          {sub}
        </div>
      </div>
    ),
    ogSize
  );
}
