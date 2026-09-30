/**
 * Toutes les pages anglaises vivent sous ce conteneur.
 *
 * Il ne sert qu'à une chose : déclarer la langue du contenu. La balise `<html>`
 * appartient au layout racine et annonce le français ; `lang` étant héritable,
 * le redéclarer ici suffit à ce qu'un lecteur d'écran change de voix et qu'un
 * moteur sache dans quelle langue il lit.
 */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
