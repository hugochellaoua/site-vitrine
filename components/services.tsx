"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { SecondaryCta } from "@/components/ui/secondary-cta";
import { DisclosureButton, DisclosurePanel } from "@/components/ui/disclosure";

/* Une ligne par offre : ces services complètent le produit, ils ne sont pas
   le sujet principal de la page. Le détail se déroule à la demande, pour que
   la section garde sa brièveté sans priver d'explication qui en veut une. */
export function Services() {
  return (
    <section id="services" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Badge>{services.eyebrow}</Badge>
          <SectionTitle title={services.title} emphasis={services.emphasis} className="mt-6" />
        </div>

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {services.items.map((item) => (
            <Service key={item.n} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SecondaryCta />
        </div>
      </div>
    </section>
  );
}

function Service({ item }: { item: (typeof services.items)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div id={item.id} className="group scroll-mt-28 py-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
        <span className="font-display text-[12px] font-bold tracking-[0.18em] text-faint transition-colors group-hover:text-accent-light">
          {item.n}
        </span>
        <h3 className="font-display text-[18px] font-semibold text-ink sm:w-[34%] sm:shrink-0">
          {item.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-muted">{item.line}</p>
      </div>

      {/* Le bouton s'aligne sur le texte, et non sur le numéro : il appartient
          à l'explication, pas au titre. */}
      <div className="mt-4 sm:pl-[calc(34%+5rem)]">
        <DisclosureButton
          open={open}
          onToggle={() => setOpen((o) => !o)}
          label={services.reveal}
          labelOpen={services.revealOpen}
          controls={`${item.id}-detail`}
          size="sm"
        />
        <DisclosurePanel open={open} id={`${item.id}-detail`} className="mt-5 flex flex-col gap-3.5">
          {item.body.map((p, i) => (
            <p key={i} className="max-w-[62ch] text-[13.5px] leading-relaxed text-[#e4e5f5]">
              {p}
            </p>
          ))}
        </DisclosurePanel>
      </div>
    </div>
  );
}
