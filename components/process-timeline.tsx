"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Le process en frise : une vague qui traverse l'écran, un point par étape.
 *
 * La section est haute et son contenu reste fixé à l'écran : c'est le
 * défilement qui fait glisser la frise, étape par étape. Un coup de molette,
 * de pavé tactile ou de doigt, faible ou moyen, avance d'une étape ; un grand
 * coup, de plusieurs. On peut aussi tirer la frise à la souris ou au doigt :
 * elle suit la main, dans le même sens. L'étape en cours est au centre, en
 * grand ; on ne voit à côté que la précédente et la suivante, plus petites et
 * estompées. Le reste attend son tour.
 *
 * Deux mouvements distincts sur la vague :
 *  — le trait coule en continu, de lui-même : des zones d'ombre et de
 *    lumière avancent dans la ligne, comme sur une barre de chargement ;
 *  — les ondulations, elles, suivent le défilement : la forme de la vague
 *    change quand on fait défiler, et s'agite un peu plus si l'on va vite.
 *
 * Grand écran : la frise court dans la largeur. Petit écran : dans la hauteur.
 * Si le visiteur a demandé moins de mouvement, le trait ne coule pas et rien
 * ne bouge sans défilement.
 */

/** Écart entre deux étapes, en part de la longueur de l'écran. */
const ECART_LARGEUR = 0.36;
const ECART_HAUTEUR = 0.3;
/** Longueur d'un cycle de nuances dans le trait, en pixels. */
const PERIODE = 260;
/** Vitesse du flux dans le trait, en pixels par milliseconde. */
const VITESSE_FLUX = 0.07;

const borne = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const maj = () => setCompact(mq.matches);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);
  return compact;
}

/** Présence d'une étape selon sa distance à l'étape en cours (0 = au centre). */
const presence = (loin: number) => borne(1 - loin * 0.6, 0, 1) * borne((1.75 - loin) / 0.5, 0, 1);
const taille = (loin: number) => 1 - 0.45 * Math.min(loin, 1);

export function ProcessTimeline({ locale }: { locale: Locale }) {
  const vertical = useCompact();
  return <Frise key={vertical ? "v" : "h"} locale={locale} vertical={vertical} />;
}

function Frise({ locale, vertical }: { locale: Locale; vertical: boolean }) {
  const { processSteps } = dict(locale);
  const n = processSteps.length;
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ligne = useRef<SVGPathElement>(null);
  const flux = useRef<SVGPathElement>(null);
  const reflet = useRef<SVGLinearGradientElement>(null);
  const teinte = useRef<SVGLinearGradientElement>(null);
  const points = useRef<(SVGGElement | null)[]>([]);
  const etapes = useRef<(HTMLLIElement | null)[]>([]);
  /** Jusqu'à quand on laisse la page filer sans la poser sur une étape. */
  const zap = useRef(0);

  useEffect(() => {
    const el = section.current;
    const sc = scene.current;
    if (!el || !sc) return;
    const immobile = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let image = 0;
    let pos = -1;
    let vuAvant = -1;
    let agitation = 0;
    /** Écart entre deux étapes au dernier dessin, en pixels. */
    let ecart = 1;
    /** Ce que la souris ou le doigt tire en ce moment, en étapes. */
    let tirage = 0;

    // ——— Défilement et étapes ———
    // La section est haute : chaque étape correspond à une hauteur de
    // défilement. On y saute d'un coup ; c'est le dessin qui fait le trajet.
    const course = () => Math.max(1, el.offsetHeight - window.innerHeight);
    const avancee = () => borne((-el.getBoundingClientRect().top / course()) * 1.1 - 0.05, 0, 1) * (n - 1);
    const etape = () => Math.round(avancee());
    const fixe = () => {
      const r = el.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };
    const redessiner = () => {
      if (!immobile) return;
      cancelAnimationFrame(image);
      image = requestAnimationFrame(boucle);
    };
    const aller = (k: number) => {
      const r = el.getBoundingClientRect();
      const y = Math.round(r.top + window.scrollY + ((borne(k, 0, n - 1) / (n - 1) + 0.05) / 1.1) * course());
      if (Math.abs(window.scrollY - y) > 0.5) window.scrollTo({ top: y, behavior: "instant" });
      redessiner();
    };
    /** Un coup faible ou moyen : une étape. Un grand coup : jusqu'à quatre. */
    const SEUIL = 16;
    const PALIER = 1400;
    const EN_PLUS = 3;

    // Molette et pavé tactile. Un geste dure tant que les mouvements
    // s'enchaînent (l'élan du pavé tactile compris) : il ne compte qu'une fois.
    let geste: { depart: number; dir: number; cumul: number; actif: boolean } | null = null;
    let derniereRoue = 0;
    const surRoue = (ev: WheelEvent) => {
      if (performance.now() < zap.current) return;
      const facteur = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? window.innerHeight : 1;
      // Glisser vers la gauche sur le pavé tactile fait avancer, comme la frise.
      const delta = (Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY) * facteur;
      const dir = Math.sign(delta);
      const maintenant = performance.now();
      if (!geste || maintenant - derniereRoue > 180 || (dir && dir !== geste.dir && Math.abs(delta) > 8)) {
        geste = { depart: etape(), dir, cumul: 0, actif: fixe() };
      }
      derniereRoue = maintenant;
      planifierAimant();
      if (!fixe()) return;
      // Au bout de la frise, un nouveau geste vers l'extérieur fait quitter la section.
      if (geste.actif && ((geste.dir < 0 && geste.depart === 0) || (geste.dir > 0 && geste.depart === n - 1))) return;
      ev.preventDefault();
      // Le geste qui nous a amenés ici s'arrête sur la première étape atteinte.
      if (!geste.actif || !geste.dir) return;
      geste.cumul += Math.abs(delta);
      if (geste.cumul < SEUIL) return;
      const voulu = 1 + Math.min(EN_PLUS, Math.floor((geste.cumul - SEUIL) / PALIER));
      const k = borne(geste.depart + geste.dir * voulu, 0, n - 1);
      if (k !== etape()) aller(k);
    };

    // Doigt et souris : la frise suit la main, puis on lâche. Un geste lent ou
    // moyen avance d'une étape, un geste vif de plusieurs.
    let tenue: { a: number; b: number; t: number; depart: number; d: number; dir: number; libre: boolean; souris: boolean } | null = null;
    const distance = (a: number, b: number) => {
      if (!tenue) return 0;
      const da = tenue.a - a;
      const db = tenue.b - b;
      return vertical || Math.abs(db) > Math.abs(da) ? db : da;
    };
    const prendre = (a: number, b: number, souris: boolean) => {
      tenue = fixe() ? { a, b, t: performance.now(), depart: etape(), d: 0, dir: 0, libre: false, souris } : null;
    };
    const tirer = (a: number, b: number) => {
      if (!tenue || tenue.libre) return false;
      const d = distance(a, b);
      if (!tenue.dir && d !== 0) {
        tenue.dir = Math.sign(d);
        // Au bout de la frise, glisser vers l'extérieur laisse la page défiler.
        if ((tenue.dir < 0 && tenue.depart === 0) || (tenue.dir > 0 && tenue.depart === n - 1)) {
          tenue.libre = true;
          return false;
        }
      }
      tenue.d = d;
      tirage = borne(d / ecart, -1, 1);
      redessiner();
      return true;
    };
    const lacher = () => {
      const g = tenue;
      tenue = null;
      if (!g) return;
      pos = borne(pos + tirage, 0, n - 1);
      tirage = 0;
      if (g.libre || !g.dir) return;
      const vitesse = Math.abs(g.d) / Math.max(1, performance.now() - g.t);
      const voulu = Math.abs(g.d) < 30 ? 0 : 1 + Math.min(EN_PLUS, Math.floor(Math.max(0, vitesse - 1) / 0.8));
      aller(g.depart + Math.sign(g.d) * voulu);
      planifierAimant();
    };
    const surTouche = (ev: TouchEvent) => {
      if (ev.touches.length === 1) prendre(ev.touches[0].clientX, ev.touches[0].clientY, false);
      else tenue = null;
    };
    const surGlisse = (ev: TouchEvent) => {
      if (tirer(ev.touches[0].clientX, ev.touches[0].clientY) && ev.cancelable) ev.preventDefault();
    };
    const surAppui = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse" || ev.button !== 0) return;
      prendre(ev.clientX, ev.clientY, true);
      if (tenue) sc.setPointerCapture(ev.pointerId);
    };
    const surDeplace = (ev: PointerEvent) => {
      if (tenue?.souris) tirer(ev.clientX, ev.clientY);
    };
    const surRelache = () => {
      if (tenue?.souris) lacher();
    };

    // Après un défilement libre (barre, clavier…), la frise se pose sur
    // l'étape la plus proche.
    let minuterie = 0;
    const planifierAimant = () => {
      window.clearTimeout(minuterie);
      minuterie = window.setTimeout(() => {
        if (!fixe() || performance.now() < zap.current) return;
        if (tenue || performance.now() - derniereRoue < 170) return planifierAimant();
        aller(etape());
      }, 200);
    };
    const surDefilement = () => {
      planifierAimant();
      redessiner();
    };

    const boucle = (t: number) => {
      const r = el.getBoundingClientRect();
      const loinDeLEcran = r.bottom < -200 || r.top > window.innerHeight + 200;
      if (!loinDeLEcran) dessiner(t);
      if (!immobile) image = requestAnimationFrame(boucle);
      else if (Math.abs(avancee() - pos) > 0.001) image = requestAnimationFrame(boucle);
    };

    const dessiner = (t: number) => {
      const cible = avancee();
      pos = immobile || pos < 0 ? cible : pos + (cible - pos) * 0.1;
      const vu = borne(pos + tirage, -0.4, n - 1 + 0.4);
      // Plus la frise va vite, plus la vague s'agite ; elle se calme ensuite.
      agitation = immobile ? 0 : agitation * 0.95 + borne(Math.abs(vu - (vuAvant < 0 ? vu : vuAvant)) * 20, 0, 1) * 0.05;
      vuAvant = vu;

      const W = sc.clientWidth;
      const H = sc.clientHeight;
      svg.current?.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const L = vertical ? H : W;
      const S = L * (vertical ? ECART_HAUTEUR : ECART_LARGEUR);
      ecart = S;
      const C = vertical ? 26 : H * 0.34;
      const A = (vertical ? 9 : 24) * (1 + 0.9 * agitation);
      // u : distance le long de la frise depuis la première étape. La phase
      // suit l'avancée : c'est le défilement qui fait onduler la vague.
      const onde = (u: number) =>
        C + A * Math.sin((u / S) * Math.PI + vu * 1.1) + A * 0.3 * Math.sin((u / S) * 2.6 - vu * 1.9);
      const depart = L / 2 - vu * S;

      let d = "";
      for (let a = -12; a <= L + 12; a += 6) {
        const c = onde(a - depart).toFixed(1);
        d += `${d ? "L" : "M"}${vertical ? `${c} ${a}` : `${a} ${c}`}`;
      }
      ligne.current?.setAttribute("d", d);
      // Le dégradé suit la frise : bleu à la première étape, orange à la dernière.
      const g = teinte.current;
      if (g) {
        const [a0, a1] = [depart, depart + (n - 1) * S].map((v) => v.toFixed(1));
        g.setAttribute(vertical ? "y1" : "x1", a0);
        g.setAttribute(vertical ? "y2" : "x2", a1);
      }
      // Le flux : des zones d'ombre et de lumière, dans le trait même, qui
      // avancent en continu vers l'étape suivante.
      flux.current?.setAttribute("d", d);
      const rf = reflet.current;
      if (rf) {
        const o = depart + (immobile ? 0 : (t * VITESSE_FLUX) % PERIODE);
        rf.setAttribute(vertical ? "y1" : "x1", o.toFixed(1));
        rf.setAttribute(vertical ? "y2" : "x2", (o + PERIODE).toFixed(1));
      }

      processSteps.forEach((_, i) => {
        const loin = Math.abs(i - vu);
        const a = depart + i * S;
        const c = onde(i * S);
        const p = points.current[i];
        if (p) {
          const echelle = 0.7 + 0.6 * borne(1 - loin, 0, 1);
          p.setAttribute("transform", `${vertical ? `translate(${c.toFixed(1)} ${a.toFixed(1)})` : `translate(${a.toFixed(1)} ${c.toFixed(1)})`} scale(${echelle.toFixed(3)})`);
          p.style.opacity = borne(1 - loin * 0.45, 0.2, 1).toFixed(3);
        }
        const e = etapes.current[i];
        if (e) {
          const v = presence(loin);
          e.style.opacity = v.toFixed(3);
          e.style.visibility = v < 0.01 ? "hidden" : "visible";
          // La phrase d'explication n'est lue que pour l'étape en cours.
          e.style.setProperty("--proche", borne(1 - loin * 1.4, 0, 1).toFixed(3));
          if (vertical) {
            e.style.top = `${a.toFixed(1)}px`;
            e.style.transform = `translateY(-50%) scale(${taille(loin).toFixed(3)})`;
          } else {
            e.style.left = `${a.toFixed(1)}px`;
            e.style.top = `${(C + 82).toFixed(0)}px`;
            e.style.width = `${Math.min(440, S * 0.95).toFixed(0)}px`;
            e.style.transform = `translateX(-50%) scale(${taille(loin).toFixed(3)})`;
          }
        }
      });
    };

    image = requestAnimationFrame(boucle);
    window.addEventListener("wheel", surRoue, { passive: false });
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", redessiner);
    el.addEventListener("touchstart", surTouche, { passive: true });
    el.addEventListener("touchmove", surGlisse, { passive: false });
    el.addEventListener("touchend", lacher);
    el.addEventListener("touchcancel", lacher);
    sc.addEventListener("pointerdown", surAppui);
    sc.addEventListener("pointermove", surDeplace);
    sc.addEventListener("pointerup", surRelache);
    sc.addEventListener("pointercancel", surRelache);
    return () => {
      cancelAnimationFrame(image);
      window.clearTimeout(minuterie);
      window.removeEventListener("wheel", surRoue);
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", redessiner);
      el.removeEventListener("touchstart", surTouche);
      el.removeEventListener("touchmove", surGlisse);
      el.removeEventListener("touchend", lacher);
      el.removeEventListener("touchcancel", lacher);
      sc.removeEventListener("pointerdown", surAppui);
      sc.removeEventListener("pointermove", surDeplace);
      sc.removeEventListener("pointerup", surRelache);
      sc.removeEventListener("pointercancel", surRelache);
    };
  }, [n, processSteps, vertical]);

  // Position de départ, avant que le script prenne la main : la première étape
  // au centre, la suivante à côté.
  const initial = (i: number): CSSProperties => {
    const v = presence(i);
    const s = taille(i);
    const proche = { "--proche": i === 0 ? 1 : 0 } as CSSProperties;
    return vertical
      ? { ...proche, top: `calc(50% + ${i * ECART_HAUTEUR * 100}%)`, opacity: v, visibility: v < 0.01 ? "hidden" : "visible", transform: `translateY(-50%) scale(${s})` }
      : { ...proche, left: `calc(50% + ${i * ECART_LARGEUR * 100}%)`, top: "calc(34% + 82px)", width: `${ECART_LARGEUR * 95}%`, opacity: v, visibility: v < 0.01 ? "hidden" : "visible", transform: `translateX(-50%) scale(${s})` };
  };

  // Les deux flèches : passer toute la frise, ou revenir avant elle.
  const zapper = (sens: 1 | -1) => {
    const el = section.current;
    if (!el) return;
    const avant = el.previousElementSibling ?? el;
    const top = sens > 0
      ? el.getBoundingClientRect().bottom + window.scrollY
      : avant.getBoundingClientRect().top + window.scrollY;
    const doux = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    zap.current = performance.now() + 1800;
    window.scrollTo({ top: Math.round(top), behavior: doux ? "smooth" : "instant" });
  };
  const fleches = locale === "en"
    ? { haut: "Back before the process", bas: "Skip the process" }
    : { haut: "Revenir avant le process", bas: "Passer le process" };
  const bouton =
    "grid h-11 w-11 place-items-center rounded-full border border-hairline-strong bg-panel/60 text-ink/80 backdrop-blur transition-colors duration-200 hover:border-white/30 hover:bg-chip hover:text-ink";

  const fondu = vertical
    ? "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)"
    : "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)";

  return (
    <section ref={section} className="relative" style={{ height: `${(n - 1) * (vertical ? 42 : 48) + 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={scene}
          className={`select-none ${vertical ? "absolute inset-x-6 bottom-32 top-24" : "absolute inset-x-0 top-1/2 h-[min(620px,76vh)] -translate-y-1/2 cursor-grab active:cursor-grabbing"}`}
        >
          <svg
            ref={svg}
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ maskImage: fondu, WebkitMaskImage: fondu }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient ref={teinte} id={`frise-trait-${vertical ? "v" : "h"}`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="0">
                <stop offset="0" stopColor="#5b81ff" />
                <stop offset="0.55" stopColor="#ac98ff" />
                <stop offset="1" stopColor="#ffa046" />
              </linearGradient>
              <linearGradient ref={reflet} id={`frise-reflet-${vertical ? "v" : "h"}`} gradientUnits="userSpaceOnUse" spreadMethod="repeat" x1="0" x2="0" y1="0" y2="0">
                <stop offset="0" stopColor="#0c0a2c" stopOpacity="0.55" />
                <stop offset="0.3" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="0.75" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor="#0c0a2c" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <path ref={ligne} fill="none" stroke={`url(#frise-trait-${vertical ? "v" : "h"})`} strokeWidth="2" strokeOpacity="0.8" />
            {/* Le flux : les nuances qui glissent, dans le trait même. */}
            <path ref={flux} fill="none" stroke={`url(#frise-reflet-${vertical ? "v" : "h"})`} strokeWidth="2" />
            {processSteps.map((step, i) => (
              <g key={step.key} ref={(el) => { points.current[i] = el; }}>
                <circle r="14" fill="rgba(91,129,255,0.22)" />
                <circle r="5.5" fill="#fff" />
              </g>
            ))}
          </svg>
          <ol className="absolute inset-0">
            {processSteps.map((step, i) => (
              <li
                key={step.key}
                ref={(el) => { etapes.current[i] = el; }}
                className={
                  vertical
                    ? "absolute left-16 right-0 origin-left"
                    : "absolute origin-top text-center"
                }
                style={initial(i)}
              >
                <span className="block font-display text-[14px] font-bold tabular-nums text-accent-light">{step.n}</span>
                <span
                  className={`mt-1.5 block text-balance font-display font-bold leading-tight text-ink ${vertical ? "text-[24px]" : "text-[30px] lg:text-[34px]"}`}
                >
                  {step.title}
                </span>
                <span style={{ opacity: "var(--proche, 1)" }} className={`mt-2 block text-balance leading-snug text-muted ${vertical ? "text-[16px]" : "mx-auto max-w-[380px] text-[17px]"}`}>
                  {step.sub}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={`absolute z-10 flex flex-col gap-2.5 ${vertical ? "bottom-36 right-4" : "right-6 top-1/2 -translate-y-1/2 lg:right-10"}`}>
          <button type="button" onClick={() => zapper(-1)} aria-label={fleches.haut} title={fleches.haut} className={bouton}>
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
          <button type="button" onClick={() => zapper(1)} aria-label={fleches.bas} title={fleches.bas} className={bouton}>
            <ArrowDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
