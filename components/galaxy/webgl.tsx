"use client";

import { useEffect, useRef } from "react";
import { NEBULA_FRAG, QUAD_VERT, STAR_FRAG, STAR_VERT } from "./shaders";

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

const NEAR = 60;
const FAR = 2600;
const FOCAL = 340;

/**
 * Rendu GPU de la galaxie.
 *
 * `onFail` est appelé si le contexte n'est pas disponible, si un shader refuse
 * de compiler, ou si le contexte est perdu en cours de route : la page bascule
 * alors sur le rendu processeur, sans que le visiteur voie un écran vide.
 */
export function GalaxyWebGL({ onFail }: { onFail: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      onFail();
      return;
    }

    const nebulaProg = link(gl, QUAD_VERT, NEBULA_FRAG);
    const starProg = link(gl, STAR_VERT, STAR_FRAG);
    if (!nebulaProg || !starProg) {
      onFail();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    // Le GPU dessine ces points en parallèle : on peut se permettre un ordre
    // de grandeur de plus que sur le processeur.
    const STAR_COUNT = isMobile ? 6000 : 24000;
    const TRAVEL = isMobile ? 1600 : 3000;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    // ── Géométrie ────────────────────────────────────────────────────────
    const quadVao = gl.createVertexArray();
    gl.bindVertexArray(quadVao);
    const quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const quadLoc = gl.getAttribLocation(nebulaProg, "aPos");
    gl.enableVertexAttribArray(quadLoc);
    gl.vertexAttribPointer(quadLoc, 2, gl.FLOAT, false, 0, 0);

    const seeds = new Float32Array(STAR_COUNT * 4);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Répartition légèrement resserrée vers la bande centrale, en écho à la
      // nébuleuse : les deux couches racontent la même géométrie.
      const y = (Math.random() - 0.5) * 2;
      seeds[i * 4 + 0] = (Math.random() - 0.5) * 2;
      seeds[i * 4 + 1] = y * (0.45 + 0.55 * Math.abs(y));
      seeds[i * 4 + 2] = Math.random();
      seeds[i * 4 + 3] = Math.random();
    }

    const starVao = gl.createVertexArray();
    gl.bindVertexArray(starVao);
    const starBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, starBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    const seedLoc = gl.getAttribLocation(starProg, "aSeed");
    gl.enableVertexAttribArray(seedLoc);
    gl.vertexAttribPointer(seedLoc, 4, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const U = {
      nebula: {
        res: gl.getUniformLocation(nebulaProg, "uResolution"),
        time: gl.getUniformLocation(nebulaProg, "uTime"),
        depth: gl.getUniformLocation(nebulaProg, "uDepth"),
        mouse: gl.getUniformLocation(nebulaProg, "uMouse"),
        opacity: gl.getUniformLocation(nebulaProg, "uOpacity"),
        light: gl.getUniformLocation(nebulaProg, "uLight"),
      },
      star: {
        res: gl.getUniformLocation(starProg, "uResolution"),
        camZ: gl.getUniformLocation(starProg, "uCamZ"),
        near: gl.getUniformLocation(starProg, "uNear"),
        far: gl.getUniformLocation(starProg, "uFar"),
        focal: gl.getUniformLocation(starProg, "uFocal"),
        time: gl.getUniformLocation(starProg, "uTime"),
        mouse: gl.getUniformLocation(starProg, "uMouse"),
        dpr: gl.getUniformLocation(starProg, "uPixelRatio"),
        reduce: gl.getUniformLocation(starProg, "uReduceMotion"),
        boot: gl.getUniformLocation(starProg, "uBoot"),
      },
    };

    // ── État animé ───────────────────────────────────────────────────────
    let w = 0;
    let h = 0;
    let camZ = 0;
    let targetCamZ = 0;
    let opacity = 1;
    let targetOpacity = 1;
    let mouseX = 0;
    let mouseY = 0;
    // Position lissée de la lampe : le curseur saute d'un pixel à l'autre,
    // la lumière, elle, doit glisser.
    let lampX = 0;
    let lampY = 0;
    let lamp = 0;        // intensité courante
    let lampTarget = 0;  // 1 quand le pointeur est sur la page
    let raf = 0;
    let running = true;
    let start = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function onScroll() {
      const story = document.getElementById("story");
      const y = window.scrollY;
      const end = story ? story.offsetTop + story.offsetHeight : window.innerHeight * 4;
      const p = Math.min(1, Math.max(0, y / Math.max(1, end - window.innerHeight)));
      targetCamZ = p * TRAVEL;
      // Le ciel est un décor, pas le sujet : la vidéo de démonstration montre
      // un fond indigo net, sans étoiles. On le garde perceptible sur le hero
      // et le récit, puis on le réduit à une texture de fond sur le reste.
      const fadeStart = end - window.innerHeight * 0.5;
      targetOpacity =
        y > fadeStart
          ? Math.max(0.14, 0.55 - (y - fadeStart) / (window.innerHeight * 0.8))
          : 0.55;
    }

    function onMouse(e: MouseEvent) {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
      lampTarget = 1;
    }

    // La lampe s'éteint quand le pointeur quitte la fenêtre : sinon elle
    // resterait allumée sur une position que plus personne ne désigne.
    function onLeave() {
      lampTarget = 0;
    }

    function render(now: number) {
      if (!gl) return;
      const time = (now - start) / 1000;

      camZ += (targetCamZ - camZ) * 0.07;
      opacity += (targetOpacity - opacity) * 0.08;
      lampX += (mouseX - lampX) * 0.09;
      lampY += (mouseY - lampY) * 0.09;
      lamp += (lampTarget - lamp) * 0.05;

      // Allumage : la lumière monte pendant que le rideau se lève, de sorte
      // qu'on découvre une galaxie en train de naître, pas un décor déjà posé.
      const boot = reduceMotion ? 1 : 1 - Math.pow(1 - Math.min(1, time / 1.9), 3);
      const shown = opacity * boot;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);

      // Nébuleuse : mélange classique, elle occulte le fond.
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(nebulaProg);
      gl.bindVertexArray(quadVao);
      gl.uniform2f(U.nebula.res, canvas!.width, canvas!.height);
      gl.uniform1f(U.nebula.time, time);
      gl.uniform1f(U.nebula.depth, camZ / TRAVEL);
      gl.uniform2f(U.nebula.mouse, lampX, lampY);
      gl.uniform1f(U.nebula.opacity, shown);
      gl.uniform1f(U.nebula.light, lamp * boot);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Étoiles : mélange additif, la lumière s'accumule.
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.useProgram(starProg);
      gl.bindVertexArray(starVao);
      gl.uniform2f(U.star.res, canvas!.width, canvas!.height);
      gl.uniform1f(U.star.camZ, camZ);
      gl.uniform1f(U.star.near, NEAR);
      gl.uniform1f(U.star.far, FAR);
      gl.uniform1f(U.star.focal, FOCAL);
      gl.uniform1f(U.star.time, time);
      gl.uniform2f(U.star.mouse, mouseX, mouseY);
      gl.uniform1f(U.star.dpr, dpr);
      gl.uniform1f(U.star.reduce, reduceMotion ? 1 : 0);
      gl.uniform1f(U.star.boot, shown);
      gl.drawArrays(gl.POINTS, 0, STAR_COUNT);

      gl.bindVertexArray(null);

      if (running) raf = requestAnimationFrame(render);
    }

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running) {
        start = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      }
    }

    function onLost(e: Event) {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      onFail();
    }

    resize();
    onScroll();
    raf = requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(nebulaProg);
      gl.deleteProgram(starProg);
      gl.deleteBuffer(quadBuf);
      gl.deleteBuffer(starBuf);
      gl.deleteVertexArray(quadVao);
      gl.deleteVertexArray(starVao);
    };
  }, [onFail]);

  return <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />;
}
