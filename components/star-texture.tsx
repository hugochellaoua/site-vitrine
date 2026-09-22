"use client";

import { useEffect } from "react";

/**
 * Génère une texture d'étoiles et la publie dans une variable CSS.
 *
 * Pourquoi pas une image ? Une photo de ciel étoilé se pixellise, pèse lourd et
 * se répète visiblement. Ici la texture est dessinée à la volée, en 512×512
 * raccordable, ce qui donne un grain net sur tous les écrans (y compris Retina)
 * pour quelques kilo-octets, et sans requête réseau.
 *
 * Le rendu vise la sobriété : une majorité d'étoiles minuscules et très
 * discrètes, quelques-unes à peine plus présentes, deux ou trois vraiment
 * lumineuses. C'est cette hiérarchie — et non la quantité — qui distingue un
 * ciel crédible d'un semis de points uniformes.
 */
export function StarTexture() {
  useEffect(() => {
    const SIZE = 512;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Générateur déterministe : la texture est identique d'une visite à l'autre.
    let seed = 20260813;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    // Chaque étoile est dessinée en neuf exemplaires décalés d'une tuile, afin
    // que celles qui débordent d'un bord réapparaissent exactement sur l'autre.
    function star(x: number, y: number, r: number, alpha: number, tint: string) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const px = x + dx * SIZE;
          const py = y + dy * SIZE;
          if (px < -8 || px > SIZE + 8 || py < -8 || py > SIZE + 8) continue;
          if (r > 1.1) {
            const g = ctx!.createRadialGradient(px, py, 0, px, py, r * 3.2);
            g.addColorStop(0, `rgba(${tint},${alpha})`);
            g.addColorStop(0.35, `rgba(${tint},${alpha * 0.28})`);
            g.addColorStop(1, `rgba(${tint},0)`);
            ctx!.beginPath();
            ctx!.arc(px, py, r * 3.2, 0, Math.PI * 2);
            ctx!.fillStyle = g;
            ctx!.fill();
          }
          ctx!.beginPath();
          ctx!.arc(px, py, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${tint},${alpha})`;
          ctx!.fill();
        }
      }
    }

    // Poussière : nombreuse, presque invisible individuellement.
    for (let i = 0; i < 900; i++) {
      star(rand() * SIZE, rand() * SIZE, 0.38 + rand() * 0.32, 0.26 + rand() * 0.28, "255,255,255");
    }
    // Étoiles moyennes, légèrement teintées : c'est ce qui donne de la couleur au noir.
    for (let i = 0; i < 190; i++) {
      const cold = rand() < 0.55;
      star(
        rand() * SIZE,
        rand() * SIZE,
        0.75 + rand() * 0.5,
        0.5 + rand() * 0.34,
        cold ? "205,220,255" : "255,246,232"
      );
    }
    // Quelques points francs, avec halo : les seuls qui accrochent l'œil.
    for (let i = 0; i < 26; i++) {
      star(rand() * SIZE, rand() * SIZE, 1.3 + rand() * 0.6, 0.75 + rand() * 0.22, "225,234,255");
    }

    document.documentElement.style.setProperty("--star-texture", `url(${canvas.toDataURL("image/png")})`);
  }, []);

  return null;
}
