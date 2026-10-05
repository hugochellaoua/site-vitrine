import { Fragment } from "react";

/** « candidat », « candidats », « candidate(s) » : le mot qui désigne la voix du candidat. */
const MOT = /(candidat(?:e|es|s)?)/gi;

/**
 * Passe le mot « candidat » en violet dans un titre.
 *
 * Le violet est la voix du candidat sur tout le site ; le mot lui-même la porte
 * donc là où il tient la place principale, c'est-à-dire dans les titres. Le
 * texte courant n'est pas concerné : un paragraphe parsemé de mots colorés se
 * lit comme une erreur de mise en forme.
 */
export function MotCandidat({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(MOT).map((morceau, i) =>
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
