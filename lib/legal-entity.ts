/**
 * Informations légales de l'éditeur du site.
 *
 * Elles sont obligatoires pour un site commercial français (article 6 de la
 * LCEN). Tout champ laissé à `null` s'affiche en rouge sur la page des
 * mentions légales : impossible de mettre le site en ligne sans le voir.
 *
 * Les valeurs renseignées proviennent de la politique de confidentialité
 * fournie ; les autres restent à compléter.
 */
export type LegalField = { label: string; value: string | null; hint?: string };

export const legalEntity: LegalField[] = [
  { label: "Raison sociale", value: "Helpify" },
  { label: "Forme juridique", value: "Société par actions simplifiée (SAS)" },
  { label: "Siège social", value: "59 rue de Ponthieu, 75008 Paris, France" },
  { label: "Capital social", value: null, hint: "Montant en euros, tel qu'il figure sur le Kbis" },
  { label: "Immatriculation", value: null, hint: "Numéro SIREN et ville du RCS (ex. « RCS Paris 123 456 789 »)" },
  { label: "Numéro de TVA intracommunautaire", value: null, hint: "Ex. FR00123456789" },
  { label: "Directeur de la publication", value: null, hint: "Nom et prénom du représentant légal" },
  { label: "Contact", value: null, hint: "Adresse e-mail de contact publiée sur le site" },
  { label: "Hébergeur du site", value: null, hint: "Nom, adresse et téléphone de l'hébergeur" },
];

export const legalEntityIntro =
  "Le présent site est édité par la société ci-dessous. Pour toute question relative au traitement de vos données personnelles, consultez la politique de confidentialité.";
