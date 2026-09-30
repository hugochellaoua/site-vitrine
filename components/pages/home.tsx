import { Galaxy } from "@/components/galaxy";
import { StructuredData } from "@/components/structured-data";
import { Intro } from "@/components/intro";
import { CursorLight } from "@/components/cursor-light";
import { StarTexture } from "@/components/star-texture";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CinematicSequence, ProcessIntro } from "@/components/cinematic/sequence";
import { ProductsOverview } from "@/components/products-overview";
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
 * Deux registres, jamais mélangés :
 *
 *  — LE PROCESS (hero → séquence) : comment le produit fonctionne, étape par étape.
 *  — LE POURQUOI (piliers → CTA)  : les bénéfices et les arguments.
 *
 * Une idée appartient à l'un ou à l'autre, jamais aux deux : c'est ce qui évite
 * les redites entre la séquence et le bas de page.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <StarTexture />
      <Galaxy />
      <Intro />
      <CursorLight />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <Hero locale={locale} />
        <ProcessIntro locale={locale} />
        <CinematicSequence locale={locale} />
        <ProductsOverview locale={locale} />
        <Synthesis locale={locale} />
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
