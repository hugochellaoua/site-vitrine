import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Synthesis } from "@/components/synthesis";
import { FinalCta } from "@/components/final-cta";
import type { Locale } from "@/lib/i18n";

/** Ressources › Les bénéfices : les quatre chiffres, sortis de l'accueil. */
export function BeneficesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Navbar locale={locale} />
      <main className="relative z-10">
        <Synthesis locale={locale} page />
        <div className="sombre bg-void">
          <FinalCta locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
