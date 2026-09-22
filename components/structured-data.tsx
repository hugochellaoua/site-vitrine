import { site, links, faq } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/**
 * Données structurées de l'accueil.
 *
 * Elles décrivent l'entreprise et le produit dans un format que lisent Google
 * et, de plus en plus, les moteurs de réponse (ChatGPT, Perplexity) quand ils
 * citent une source. `sameAs` relie le site à la page LinkedIn, ce qui aide à
 * consolider l'entité « Helpify » aux yeux des moteurs.
 *
 * Aucun prix ni aucune note n'est déclaré : affirmer une note agrégée sans
 * avis réels exposerait à une pénalité et serait tout simplement faux.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        logo: `${siteUrl}/opengraph-image`,
        description: site.description,
        sameAs: [links.linkedin],
        address: {
          "@type": "PostalAddress",
          streetAddress: "59 rue de Ponthieu",
          postalCode: "75008",
          addressLocality: "Paris",
          addressCountry: "FR",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: "fr-FR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: site.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Recrutement",
        operatingSystem: "Web",
        inLanguage: "fr-FR",
        description: site.description,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Contenu maîtrisé, issu de nos propres fichiers : aucune saisie visiteur
      // n'entre ici. Le JSON est sérialisé, et les `<` échappés par précaution.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
