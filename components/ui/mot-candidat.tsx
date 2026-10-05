import { Fragment } from "react";

/** « candidat », « candidats », « candidate(s) » : le mot qui désigne la voix du candidat. */
// Terminaisons du plus long au plus court : avec « e|es », « candidates » s'arrêtait au « e ».
const MOT = /(candidat(?:es|e|s)?)/gi;
/** Le même mot, suivi du point qui ferme la phrase s'il y en a un. */
const MOT_ET_POINT = /(candidat(?:es|e|s)?\.?)/gi;

/**
 * Passe le mot « candidat » en violet dans un titre.
 *
 * Le violet est la voix du candidat sur tout le site ; le mot lui-même la porte
 * donc là où il tient la place principale, c'est-à-dire dans les titres. Le
 * texte courant n'est pas concerné : un paragraphe parsemé de mots colorés se
 * lit comme une erreur de mise en forme.
 *
 * `avecPoint` emporte aussi le point qui suit le mot. Il sert à la phrase
 * « Rencontrez vos meilleurs candidats. », qui ouvre et clôt la page : le
 * violet s'arrête alors sur le point, et l'orange reprend avec « Rapidement. ».
 */
export function MotCandidat({ texte, avecPoint = false }: { texte: string; avecPoint?: boolean }) {
  return (
    <>
      {texte.split(avecPoint ? MOT_ET_POINT : MOT).map((morceau, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-iris">
            {morceau}
          </span>
        ) : (
          <Fragment key={i}>{morceau}</Fragment>
        ),
      )}
    </>
  );
}
