/**
 * La forme du contenu de la démonstration.
 *
 * Elle vit à part parce que les deux langues la partagent : les textes français
 * sont figés en types littéraux, et un message anglais n'est évidemment pas
 * assignable au message français. Typer les deux contenus avec ce même type
 * règle la question, et fait échouer la compilation si l'un oublie un champ.
 */
export type DemoStep =
  /**
   * Dans `text`, un saut de ligne (`\n`) ouvre un nouveau paragraphe dans la
   * bulle, et `**mot**` met en gras : on y met surtout les noms propres.
   */
  | { type: "message"; from: "helpify" | "candidate"; text: string }
  /** Le candidat dépose son CV et le lien de son profil LinkedIn. */
  | { type: "profile" }
  /** Helpify lit le profil et en tire quelques repères. */
  | { type: "analysis" };

export type DemoContent = {
  eyebrow: string;
  title: string;
  /** Fin du titre, mise en couleur : doit en être la queue exacte. */
  emphasis: string;
  sub: string;
  /** Mention sous la démonstration : noms et chiffres sont inventés. */
  fiction: string;
  header: { name: string; role: string };
  candidate: { name: string; initial: string; cv: string; cvSize: string; linkedin: string };
  analysis: { reading: string; done: string; points: string[] };
  /** Le bouton posé sur la démonstration : renvoie vers la notice IA. */
  notice: { label: string; href: string };
  controls: { pause: string; play: string; replay: string };
  steps: DemoStep[];
};
