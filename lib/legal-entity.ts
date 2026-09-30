/**
 * Informations légales de l'éditeur du site.
 *
 * Elles sont obligatoires pour un site commercial français (article 6 de la
 * LCEN). Tout champ laissé à `null` s'affiche en rouge sur la page des
 * mentions légales : impossible de mettre le site en ligne sans le voir.
 *
 * Deux mentions pourtant obligatoires sont absentes, à la demande de
 * l'éditeur : le numéro d'immatriculation au RCS et le numéro de TVA
 * intracommunautaire. L'article 6-III-1 de la LCEN impose le premier à toute
 * société inscrite au registre du commerce — ce qu'est nécessairement une SAS.
 * Les rétablir consiste à rajouter deux entrées dans la liste ci-dessous.
 */
export type LegalField = { label: string; value: string | null; hint?: string };

export const legalEntity: LegalField[] = [
  { label: "Raison sociale", value: "Helpify" },
  { label: "Forme juridique", value: "Société par actions simplifiée (SAS)" },
  { label: "Siège social", value: "59 rue de Ponthieu, 75008 Paris, France" },
  { label: "Capital social", value: "10 000 €" },
  { label: "Directeur de la publication", value: "Hugo Chellaoua" },
  { label: "Contact", value: "contact@helpify-ai.fr" },
  {
    label: "Hébergeur du site",
    value: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  },
];

export const legalEntityIntro =
  "Le présent site est édité par la société ci-dessous. Pour toute question relative au traitement de vos données personnelles, consultez la politique de confidentialité.";

/**
 * Les mêmes informations, dans les libellés anglais.
 *
 * Seules les étiquettes sont traduites : les valeurs — raison sociale, adresse,
 * nom du dirigeant — ne se traduisent pas, ce sont des données d'état civil.
 */
export const legalEntityLabelsEn: Record<string, string> = {
  "Raison sociale": "Registered name",
  "Forme juridique": "Legal form",
  "Siège social": "Registered office",
  "Capital social": "Share capital",
  "Directeur de la publication": "Publication director",
  Contact: "Contact",
  "Hébergeur du site": "Website host",
};

export const legalEntityIntroEn =
  "This website is published by the company set out below. For any question about the processing of your personal data, see the privacy policy.";
