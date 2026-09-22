"use client";

import { useCallback, useState } from "react";
import { GalaxyWebGL } from "./webgl";
import { GalaxyCanvas2D } from "./canvas-2d";

/**
 * Le ciel du site.
 *
 * On tente d'abord le rendu GPU. S'il échoue — pas de WebGL2, shader refusé,
 * contexte perdu — on retombe sur la version dessinée par le processeur, qui
 * raconte la même chose avec moins de matière. Le visiteur ne voit jamais
 * d'écran vide, et aucune machine n'est laissée de côté.
 */
export function Galaxy() {
  const [gpuFailed, setGpuFailed] = useState(false);
  const handleFail = useCallback(() => setGpuFailed(true), []);

  if (gpuFailed) return <GalaxyCanvas2D />;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <GalaxyWebGL onFail={handleFail} />
      {/* Vignettage posé par-dessus le rendu : il referme le cadre et assure
          que le texte garde toujours son contraste, quelle que soit la densité
          d'étoiles à cet endroit. Sa teinte est celle du fond, sans quoi les
          bords tireraient vers un noir étranger à la palette. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 42%, transparent 40%, rgba(13,10,42,0.86) 100%)",
        }}
      />
    </div>
  );
}
