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
import { Testimonials } from "@/components/testimonials";
import { Integrations } from "@/components/integrations";
import { Services } from "@/components/services";
import { Roi } from "@/components/roi";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";

/**
 * Deux registres, jamais mélangés :
 *
 *  — LE PROCESS (hero → séquence) : comment le produit fonctionne, étape par étape.
 *  — LE POURQUOI (piliers → CTA)  : les bénéfices et les arguments.
 *
 * Une idée appartient à l'un ou à l'autre, jamais aux deux : c'est ce qui évite
 * les redites entre la séquence et le bas de page.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <StarTexture />
      <Galaxy />
      <Intro />
      <CursorLight />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProcessIntro />
        <CinematicSequence />
        <ProductsOverview />
        <Synthesis />
        <Testimonials />
        <Integrations />
        <Services />
        <Roi />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
