import { StructuredData } from "@/components/structured-data";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HeroApercu } from "@/components/hero-apercu";
import { IntegrationsBand } from "@/components/integrations-band";
import { ProductBlocks } from "@/components/product-blocks";
import { ProcessIntro } from "@/components/cinematic/sequence";
import { ProcessTimeline } from "@/components/process-timeline";
import { Synthesis } from "@/components/synthesis";
import { UseCasesGrid } from "@/components/use-cases-grid";
import { Experts } from "@/components/experts";
import { DemoConversation } from "@/components/demo-conversation";
import { Donnees } from "@/components/donnees";
import { Services } from "@/components/services";
import { Roi } from "@/components/roi";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import type { Locale } from "@/lib/i18n";

/**
 * L'ordre de l'accueil, sur fond clair :
 *
 *  — le haut de page sombre, puis l'aperçu du produit qui le chevauche, et la
 *    rangée des outils auxquels Helpify se branche ;
 *  — les quatre produits, un bloc chacun ;
 *  — le process en frise, puis les bénéfices qui en découlent ;
 *  — les cas d'usage, les experts qui nous entourent, la démonstration, et
 *    ce que la plateforme fait des données ;
 *  — les services, le calcul du gain, les tarifs, la FAQ, et l'appel final
 *    sur une bande sombre.
 *
 * Ni ciel étoilé, ni halo, ni lever de rideau : le sérieux vient du contenu
 * montré, pas des effets.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <Hero locale={locale} />
        <HeroApercu locale={locale} />
        <IntegrationsBand locale={locale} />
        <ProductBlocks locale={locale} />
        <div className="sombre bg-void">
          <ProcessIntro locale={locale} />
          <ProcessTimeline locale={locale} />
        </div>
        <Synthesis locale={locale} />
        <UseCasesGrid locale={locale} />
        <Experts locale={locale} />
        <DemoConversation locale={locale} />
        <div className="sombre bg-void">
          <Donnees locale={locale} />
        </div>
        <Services locale={locale} />
        <Roi locale={locale} />
        <Pricing locale={locale} />
        <Faq locale={locale} />
        <div className="sombre bg-void">
          <FinalCta locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
