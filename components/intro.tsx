"use client";

import { useEffect, useRef } from "react";

/**
 * Chorégraphie d'ouverture.
 *
 * Deux secondes : le noir, un trait de lumière qui s'ouvre à l'horizon, sa
 * déflagration, puis le voile qui se lève sur la galaxie déjà en train de
 * s'allumer.
 *
 * Trois principes de robustesse :
 *
 *  — l'animation est *entièrement* en CSS. Si le JavaScript n'arrive jamais,
 *    le voile se lève quand même. Un rideau noir qui dépend d'un script pour
 *    disparaître est un risque qu'on ne prend pas.
 *  — la couche ne capte jamais le pointeur : le contenu dessous est présent
 *    dès le premier rendu, lisible par un lecteur d'écran comme par un moteur
 *    de recherche. Ce n'est pas un écran de chargement, c'est un lever de rideau.
 *  — au moindre geste (molette, clic, touche), on abrège : personne n'est
 *    retenu devant une animation qu'il a déjà vue.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    function skip() {
      if (done) return;
      done = true;
      el?.setAttribute("data-skip", "true");
      detach();
    }
    function detach() {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    }

    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    // Passé la durée de la séquence, plus rien à écouter.
    const t = setTimeout(detach, 2600);
    return () => {
      clearTimeout(t);
      detach();
    };
  }, []);

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <div className="intro-veil" />
      <div className="intro-beam" />
      <div className="intro-bloom" />
    </div>
  );
}
