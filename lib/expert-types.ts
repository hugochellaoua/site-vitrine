/**
 * La forme du contenu de la section « experts ».
 *
 * Elle vit à part, comme celle de la démonstration, parce que les deux langues
 * la partagent : typer les deux contenus avec ce même type fait échouer la
 * compilation si l'un oublie un champ — ou invente un logo qui n'existe pas.
 */

/** Les logos dont on dispose. Ajouter une entrée ici impose d'ajouter son dessin. */
export type ExpertLogo = "loreal" | "reflection";

export type Expert = {
  name: string;
  /** Fonction et entreprise, telles que la personne les présente. */
  role: string;
  /** Logo de l'entreprise, quand on en dispose : certains experts n'en ont pas. */
  logo?: ExpertLogo;
  /** Ce que l'expert apporte, en une ou deux phrases. */
  body: string;
};

export type ExpertsContent = {
  title: string;
  /** Fin du titre, mise en couleur : doit en être la queue exacte. */
  emphasis: string;
  intro: string;
  items: Expert[];
};
