"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Dernière image : la galaxie du début revient, mais organisée.
 * Les particules — les candidats — ne disparaissent pas : elles rejoignent
 * lentement quelques points lumineux. C'est la promesse du produit, sans texte.
 */
function OrganizedField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 90 : 220;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let t = 0;

    type P = { x: number; y: number; tx: number; ty: number; r: number; a: number; k: number };
    let ps: P[] = [];
    let anchors: { x: number; y: number }[] = [];

    function build() {
      if (!canvas || !wrap || !ctx) return;
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Quelques points de convergence : la shortlist.
      anchors = [0.3, 0.5, 0.7].map((fx) => ({ x: w * fx, y: h * 0.5 }));

      ps = Array.from({ length: COUNT }, () => {
        const a = anchors[Math.floor(Math.random() * anchors.length)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: a.x + (Math.random() - 0.5) * 70,
          ty: a.y + (Math.random() - 0.5) * 70,
          r: Math.random() * 1.3 + 0.4,
          a: Math.random() * 0.5 + 0.25,
          k: Math.random() * 0.012 + 0.004,
        };
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of ps) {
        if (visible) {
          p.x += (p.tx - p.x) * p.k;
          p.y += (p.ty - p.y) * p.k;
        }
        const tw = reduce ? 1 : Math.sin(t * 0.5 + p.x * 0.01) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,226,255,${(p.a * tw).toFixed(3)})`;
        ctx.fill();
      }

      for (const a of anchors) {
        const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, 60);
        g.addColorStop(0, "rgba(30,79,255,0.22)");
        g.addColorStop(1, "rgba(30,79,255,0)");
        ctx.beginPath();
        ctx.arc(a.x, a.y, 60, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      t += 0.016;
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    build();
    draw();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.15 });
    io.observe(wrap);
    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

const OFFSETS = [0, -14, 10, -8, 14, -4, 6];

export function FinalCta({ locale }: { locale: Locale }) {
  const { finalCta } = dict(locale);
  return (
    <section className="relative overflow-hidden px-6 py-40">
      <OrganizedField />

      {/* La lueur derrière le logotype, reprise du plan final de la vidéo. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(29,80,254,0.34) 0%, rgba(29,80,254,0.08) 48%, transparent 74%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Les sept promesses gravitent autour du logotype, comme dans la vidéo :
            elles ne sont pas une liste à lire, mais un halo de sens. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {finalCta.chips.map((chip, i) => (
            <Reveal
              key={chip}
              as="li"
              /* Décalage vertical alterné : les pastilles gravitent autour du
                 titre au lieu de s'aligner en paragraphe. Le rang du chip suffit
                 à produire l'irrégularité — inutile de tirer au hasard, ce qui
                 rendrait le rendu différent à chaque visite. */
              restY={OFFSETS[i % OFFSETS.length]}
              y={18}
              delay={0.1 + i * 0.09}
              className="chip-float flex items-center gap-2.5 rounded-full border border-accent/35 bg-chip px-4 py-2.5 text-[13px] font-medium text-ink shadow-[0_10px_30px_-14px_rgba(29,80,254,0.9)]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light"
                style={{ boxShadow: "0 0 10px 1px rgba(91,129,255,.9)" }}
              />
              {chip}
            </Reveal>
          ))}
        </ul>

        <Reveal
          as="h2"
          delay={0.45}
          y={18}
          className="mt-14 max-w-[18ch] text-balance font-display text-[clamp(30px,4.6vw,58px)] font-bold leading-[1.04] tracking-[-0.03em] text-ink"
        >
          {finalCta.title} <span className="text-warm">{finalCta.emphasis}</span>
        </Reveal>

        <Reveal delay={0.7} y={14} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href={finalCta.cta.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_60px_-16px_rgba(29,80,254,0.85)] transition-shadow duration-300 hover:shadow-[0_28px_74px_-14px_rgba(29,80,254,1)]"
            >
              {finalCta.cta.label}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <SecondaryCta locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
