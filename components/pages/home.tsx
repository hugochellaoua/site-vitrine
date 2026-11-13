import { Galaxy } from "@/components/galaxy";
import { Halo } from "@/components/ui/halo";
import { StructuredData } from "@/components/structured-data";
import { Intro } from "@/components/intro";
import { CursorLight } from "@/components/cursor-light";
import { StarTexture } from "@/components/star-texture";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DemoConversation } from "@/components/demo-conversation";
import { ProcessIntro } from "@/components/cinematic/sequence";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProductsOverview } from "@/components/products-overview";
import { Experts } from "@/components/experts";
import { Synthesis } from "@/components/synthesis";
import { Integrations } from "@/components/integrations";
import { Services } from "@/components/services";
import { Roi } from "@/components/roi";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import type { Locale } from "@/lib/i18n";

/**
 * L'ordre de l'accueil :
 *
 *  — le process en frise, étape par étape, puis juste dessous les bénéfices
 *    qui en découlent ;
 *  — les produits, puis les experts qui nous entourent ;
 *  — la démonstration (un échange entre Helpify et un candidat), qui montre
 *    concrètement comment ça se passe ;
 *  — les intégrations, les services, les tarifs et la FAQ.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <StarTexture />
      <Galaxy />
      <Halo />
      <Intro />
      <CursorLight />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <Hero locale={locale} />
        <ProcessIntro locale={locale} />
        <ProcessTimeline locale={locale} />
        <Synthesis locale={locale} />
        <ProductsOverview locale={locale} />
        <Experts locale={locale} />
        <DemoConversation locale={locale} />
        <Integrations locale={locale} />
        <Services locale={locale} />
        <Roi locale={locale} />
        <Pricing locale={locale} />
        <Faq locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
