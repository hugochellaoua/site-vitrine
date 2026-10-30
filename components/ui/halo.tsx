"use client";

import { useEffect, useRef } from "react";

/**
 * Le halo : une lueur bleue au centre, de l'orange qui monte du bas de l'écran,
 * et des filets verticaux très fins qui respirent comme un spectre de voix.
 *
 * Il est fixé à l'écran, sous le contenu (posé juste après Galaxy) :
 * on le garde en défilant. Les filets sont dessinés à un pixel physique de
 * large, pour rester des traits de lumière et pas des barres. Ils s'arrêtent
 * quand l'onglet est caché, et restent immobiles si le visiteur a demandé
 * moins de mouvement. Sans JavaScript, il reste les lueurs, qui suffisent.
 */
export function Halo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let largeur = 0;
    let hauteur = 0;
    let image = 0;

    const dimensionner = () => {
      largeur = canvas.clientWidth;
      hauteur = canvas.clientHeight;
      canvas.width = Math.round(largeur * dpr);
      canvas.height = Math.round(hauteur * dpr);
    };

    // On dessine en pixels physiques : un filet fait exactement un pixel d'écran.
    // Tous les filets suivent la même courbe, sans hasard : réguliers, et légers.
    const dessiner = (t: number) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const pas = Math.round(4 * dpr);
      const souffle = 0.85 + 0.15 * Math.sin(t / 3200);
      for (let x = 0; x < W; x += pas) {
        const u = x / W - 0.5;
        const enveloppe = Math.exp((-u * u) / 0.03);
        if (enveloppe < 0.03) continue;
        const a = enveloppe * 0.16 * souffle;
        const h = H * (0.25 + 0.45 * enveloppe);
        const degrade = ctx.createLinearGradient(0, H, 0, H - h);
        degrade.addColorStop(0, `rgba(255,190,140,${a})`);
        degrade.addColorStop(0.3, `rgba(150,205,255,${a * 0.9})`);
        degrade.addColorStop(1, "rgba(150,205,255,0)");
        ctx.fillStyle = degrade;
        ctx.fillRect(x, H - h, 1, h);
      }
    };

    const boucle = (t: number) => {
      dessiner(t);
      if (!reduit && !document.hidden) image = requestAnimationFrame(boucle);
    };
    const reprendre = () => {
      cancelAnimationFrame(image);
      if (!document.hidden) image = requestAnimationFrame(boucle);
    };

    dimensionner();
    image = requestAnimationFrame(boucle);
    window.addEventListener("resize", dimensionner);
    document.addEventListener("visibilitychange", reprendre);
    return () => {
      cancelAnimationFrame(image);
      window.removeEventListener("resize", dimensionner);
      document.removeEventListener("visibilitychange", reprendre);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* De bas en haut : orange, un filet de bleu ciel, puis le bleu profond qui se
          fond dans la nuit. Le flou efface les marches entre les teintes, et
          l'opacité adoucit le tout pour qu'il n'attire pas toute l'attention. */}
      <div
        className="absolute -inset-[10%] opacity-[0.62] blur-[40px]"
        style={{
          // Un seul dégradé, aux teintes posées l'une après l'autre (sans
          // superposition, qui donnait du mauve) : orange, une lueur claire,
          // le bleu ciel, puis le bleu profond qui se perd dans la nuit.
          background:
            "radial-gradient(60% 52% at 50% 92%, #ff8a3d 0%, #ffa560 15%, #ffd3ad 22%, #b4dcff 28%, #63a0ff 35%, rgba(29,80,254,.85) 45%, rgba(29,80,254,.38) 60%, rgba(29,80,254,.1) 74%, transparent 86%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-x-0 bottom-0 h-[60%] w-full opacity-80 mix-blend-screen" />
    </div>
  );
}
