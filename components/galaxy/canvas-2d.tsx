"use client";

import { useEffect, useRef } from "react";

/**
 * Repli sans WebGL — même mise en scène, dessinée sur le CPU.
 *
 * Champ de particules projeté en perspective.
 *
 * Chaque particule vit dans un espace 3D (x, y, z). La caméra avance sur l'axe Z
 * au fil du scroll : c'est ce déplacement — et non une simple translation 2D —
 * qui produit la parallaxe (les particules proches défilent vite, les lointaines
 * restent presque fixes) et la sensation d'entrer dans les données.
 *
 * Les particules représentent symboliquement les candidats.
 */

type P = {
  x: number;
  y: number;
  z: number;
  r: number;
  bright: number;
  phase: number;
};

const FOCAL = 340;
const NEAR = 60;
const FAR = 2200;
const FOCUS_Z = 620; // plan net : au-delà et en deçà, les particules se diffusent

export function GalaxyCanvas2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camZRef = useRef(0);
  const targetCamZRef = useRef(0);
  const opacityRef = useRef(1);
  const targetOpacityRef = useRef(1);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 300 : 1000;
    const TRAVEL = isMobile ? 1500 : 2600; // distance parcourue par la caméra

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let particles: P[] = [];
    let raf = 0;
    let running = true;

    function makeParticle(seedZ?: number): P {
      const spread = Math.max(w, h) * 1.15;
      return {
        x: (Math.random() - 0.5) * spread * 2,
        y: (Math.random() - 0.5) * spread * 1.4,
        z: seedZ ?? NEAR + Math.random() * (FAR - NEAR),
        r: Math.random() * 1.5 + 0.45,
        // Quelques particules nettement plus lumineuses : les talents révélés.
        bright: Math.random() < 0.09 ? 1 : 0.3 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function resize() {
      if (!canvas || !ctx) return;
      w = window.innerWidth;
      h = window.innerHeight;
      cx = w / 2;
      cy = h / 2;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: COUNT }, () => makeParticle());
    }

    function onScroll() {
      const story = document.getElementById("story");
      const y = window.scrollY;
      // La caméra avance du haut de page jusqu'à la fin de la séquence narrative.
      const end = story ? story.offsetTop + story.offsetHeight : window.innerHeight * 4;
      const p = Math.min(1, Math.max(0, y / Math.max(1, end - window.innerHeight)));
      targetCamZRef.current = p * TRAVEL;
      // Au-delà du récit, la galaxie s'atténue sans jamais disparaître : le
      // ciel reste le sol commun de toute la page, il cesse seulement d'être
      // le sujet pour laisser la lecture au premier plan.
      const fadeStart = end - window.innerHeight * 0.5;
      const FLOOR = 0.6;
      targetOpacityRef.current =
        y > fadeStart
          ? Math.max(FLOOR, 1 - (y - fadeStart) / (window.innerHeight * 0.8))
          : 1;
    }

    function onMouse(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 26;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 26;
    }

    let t = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Lissage : la caméra rattrape sa cible, ce qui évite les à-coups
      // quand l'utilisateur scrolle brutalement (molette, trackpad, saut d'ancre).
      camZRef.current += (targetCamZRef.current - camZRef.current) * 0.07;
      opacityRef.current += (targetOpacityRef.current - opacityRef.current) * 0.08;
      const camZ = camZRef.current;
      const globalAlpha = opacityRef.current;

      if (globalAlpha < 0.01) {
        if (running && !reduceMotion) raf = requestAnimationFrame(draw);
        return;
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let d = p.z - camZ;

        // Recyclage : une particule dépassée par la caméra repart au fond.
        if (d < NEAR) {
          particles[i] = makeParticle(camZ + FAR);
          continue;
        }
        if (d > FAR + 400) d = FAR + 400;

        const scale = FOCAL / d;
        // Parallaxe souris pondérée par la proximité.
        const sx = cx + (p.x + mx * (1 - d / FAR)) * scale;
        const sy = cy + (p.y + my * (1 - d / FAR)) * scale;

        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;

        const size = Math.max(0.25, p.r * scale);
        // Fondu d'apparition au loin + extinction très près de l'objectif.
        const depthFade = Math.min(1, (FAR - d) / (FAR * 0.55));
        const nearFade = Math.min(1, (d - NEAR) / 220);
        const twinkle = reduceMotion ? 1 : Math.sin(t * 0.6 + p.phase) * 0.22 + 0.78;
        const alpha = p.bright * depthFade * nearFade * twinkle * globalAlpha;
        if (alpha <= 0.01) continue;

        // Profondeur de champ : hors du plan net, la particule devient un halo
        // diffus plutôt qu'un point net (bokeh) — beaucoup moins coûteux qu'un blur.
        const defocus = Math.abs(d - FOCUS_Z) / FOCUS_Z;

        if (defocus > 0.75 && size > 1.4) {
          const rad = size * (1 + defocus * 1.6);
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, rad);
          g.addColorStop(0, `rgba(214, 226, 255, ${(alpha * 0.5).toFixed(3)})`);
          g.addColorStop(1, "rgba(214, 226, 255, 0)");
          ctx.beginPath();
          ctx.arc(sx, sy, rad, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fillStyle =
            p.bright === 1
              ? `rgba(180, 202, 255, ${alpha.toFixed(3)})`
              : `rgba(226, 231, 255, ${alpha.toFixed(3)})`;
          ctx.fill();

          // Halo discret réservé aux particules les plus lumineuses.
          if (p.bright === 1 && size > 1) {
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 7);
            g.addColorStop(0, `rgba(90, 130, 255, ${(alpha * 0.3).toFixed(3)})`);
            g.addColorStop(1, "rgba(90, 130, 255, 0)");
            ctx.beginPath();
            ctx.arc(sx, sy, size * 7, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }
        }
      }

      t += 0.016;
      if (running && !reduceMotion) raf = requestAnimationFrame(draw);
    }

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running && !reduceMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    onScroll();
    if (reduceMotion) {
      camZRef.current = targetCamZRef.current;
      opacityRef.current = targetOpacityRef.current;
    }
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isMobile) window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Nébuleuses : dégradés très diffus, quasi imperceptibles individuellement,
          mais qui donnent sa couleur et sa profondeur au noir. */}
      <div
        className="absolute -left-[18vw] -top-[22vh] h-[70vw] w-[70vw] rounded-full opacity-[0.55] blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(30,79,255,0.32) 0%, rgba(30,79,255,0) 70%)" }}
      />
      <div
        className="absolute -right-[14vw] top-[42vh] h-[56vw] w-[56vw] rounded-full opacity-[0.4] blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.26) 0%, rgba(124,92,255,0) 70%)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      {/* Vignettage : referme le cadre et concentre le regard au centre. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 50%, rgba(5,4,20,0.72) 100%)",
        }}
      />
    </div>
  );
}
