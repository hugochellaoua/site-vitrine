import { Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { ListeAttente } from "@/components/liste-attente";
import { dict, type Locale } from "@/lib/i18n";

/**
 * L'espace candidat, en préparation : la promesse, un aperçu du profil que le
 * candidat obtiendra (et de la correspondance qu'y verra le recruteur), les
 * quatre temps du parcours, et la liste d'attente.
 *
 * L'aperçu reprend l'exemple du site (Sarah K., son poste et ses critères) :
 * c'est une illustration, la page dit clairement que l'espace n'est pas
 * encore ouvert.
 */
export function CandidatsPage({ locale }: { locale: Locale }) {
  const { espaceCandidat: c, processSteps, products } = dict(locale);
  const besoin = processSteps.find((s) => s.key === "besoin");
  const reponses = processSteps.find((s) => s.key === "reponses");
  const role = besoin && "role" in besoin ? besoin.role : "";
  const criteres = besoin && "fields" in besoin ? besoin.fields : [];
  const competences = reponses && "extracted" in reponses ? reponses.extracted.slice(0, 3) : [];
  const { score } = products.demo;

  return (
    <>
      <Navbar locale={locale} />
      <main className="relative z-10">
        {/* La promesse, et la liste d'attente tout de suite à côté. */}
        <section className="px-6 pb-20 pt-40 sm:px-10 sm:pt-48 lg:px-16">
          <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{c.eyebrow}</Badge>
                <span className="rounded-full border border-hairline-strong px-2.5 py-0.5 text-[11.5px] text-ink">{c.badge}</span>
              </div>
              <SectionTitle as="h1" title={c.title} emphasis={c.emphasis} className="!mx-0 mt-6 !max-w-[15ch] text-left !text-[clamp(36px,5.2vw,66px)]" />
              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-muted">{c.intro}</p>
            </div>
            <div className="rounded-[6px] bg-chip p-7 sm:p-8">
              <p className="font-display text-[22px] tracking-[-0.02em] text-ink">{c.attente.titre}</p>
              <p className="mt-2 text-[14.5px] text-muted">{c.attente.texte}</p>
              <div className="mt-6">
                <ListeAttente locale={locale} />
              </div>
            </div>
          </div>
        </section>

        {/* L'aperçu : le profil du candidat, et la correspondance avec une fiche de poste. */}
        <section className="sombre bg-void px-6 py-24 sm:px-10 lg:px-16" aria-label={c.apercu.profil}>
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
            <div className="rounded-[10px] bg-white p-6 text-[#121214]">
              <div className="flex items-center gap-3 border-b border-[#f0f0ee] pb-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#121214] text-[12px] text-white">SK</span>
                <span>
                  <span className="block text-[11px] text-[#8b887f]">{c.apercu.profil}</span>
                  <span className="block text-[15px] font-medium">{score.candidate}</span>
                </span>
              </div>
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#8b887f]">{c.apercu.realisations}</p>
              <p className="mt-2 text-[14px] leading-relaxed">{c.apercu.realisation}</p>
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#8b887f]">{c.apercu.competences}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {[score.rows[1]?.value, ...competences].filter(Boolean).map((x) => (
                  <li key={x} className="rounded-full bg-[#f3f3f1] px-3 py-1 text-[12.5px]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[10px] bg-white p-6 text-[#121214]">
              <div className="flex items-center justify-between border-b border-[#f0f0ee] pb-4 text-[12px] text-[#8b887f]">
                <span>
                  {c.apercu.fiche} · <span className="text-[#121214]">{role}</span>
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em]">{c.apercu.correspondance}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {criteres.map((cr) => (
                  <li key={cr.label} className="flex items-center justify-between gap-3 rounded-[8px] border border-[#ececea] px-3.5 py-2.5 text-[13.5px]">
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#121214] text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {cr.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#8b887f]">{cr.weight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Les quatre temps. */}
        <section className="px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.04em] text-ink">{c.etapesTitre}</h2>
            <ol className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {c.etapes.map((e, i) => (
                <li key={e.titre} className="border-t border-hairline py-6">
                  <span className="font-mono text-[12px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 font-display text-[19px] leading-snug tracking-[-0.02em] text-ink">{e.titre}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyCta locale={locale} />
    </>
  );
}
