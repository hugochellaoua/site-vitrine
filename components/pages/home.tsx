import { StructuredData } from "@/components/structured-data";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductBlocks } from "@/components/product-blocks";
import { Synthesis } from "@/components/synthesis";
import { UseCasesGrid } from "@/components/use-cases-grid";
import { Donnees } from "@/components/donnees";
import { Branche } from "@/components/branche";
import { Defile } from "@/components/defile";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import type { Locale } from "@/lib/i18n";

/**
 * L'ordre de l'accueil, construit comme une page éditoriale :
 *
 *  — le haut de page sombre, le titre, et les entreprises où exercent nos
 *    experts ;
 *  — les quatre produits en action, la bande qui défile (ce que font les
 *    équipes RH avec Helpify), puis les neuf situations ;
 *  — Helpify branché sur votre entreprise (bande noire, schéma animé) ;
 *  — l'engagement sur les données (bande noire). Les experts ne sont plus
 *    qu'en haut de page, par les logos de leurs entreprises ;
 *  — les bénéfices chiffrés, les tarifs, la FAQ et l'appel final.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <Hero locale={locale} />
        <ProductBlocks locale={locale} />
        <Defile locale={locale} />
        <UseCasesGrid locale={locale} />
        <div className="sombre bg-void">
          <Branche locale={locale} />
        </div>
        <div className="sombre bg-void">
          <Donnees locale={locale} />
        </div>
        <Synthesis locale={locale} />
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
