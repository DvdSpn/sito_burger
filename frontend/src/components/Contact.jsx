import { Clock, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { RESTAURANT } from "../data/menu";

export default function Contact({ onOrder }) {
  return (
    <section
      id="contatti"
      data-testid="section-contatti"
      className="relative border-t border-stone-800/70 bg-stone-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              Vieni a trovarci
            </p>
            <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-7xl">
              La griglia è
              <br />
              <span className="italic font-medium text-amber-500">
                sempre accesa
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-400">
              Nel cuore di Camucia, a pochi passi dai colli di Cortona. Ti
              aspettiamo a pranzo e a cena, tutti i giorni.
            </p>

            <button
              type="button"
              onClick={() => onOrder()}
              data-testid="contact-whatsapp-btn"
              className="mt-8 inline-flex items-center gap-3 rounded-sm bg-amber-600 px-8 py-4 text-xs font-bold uppercase tracking-mega text-stone-950 transition-all hover:bg-amber-500"
            >
              Ordina via WhatsApp
              <span className="text-base">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-0 lg:col-span-7 md:grid-cols-2">
            <InfoCard
              Icon={MapPin}
              label="Indirizzo"
              testid="contact-address"
              primary={RESTAURANT.address.split(",")[0]}
              secondary={RESTAURANT.address.split(",").slice(1).join(",").trim()}
              href={`https://maps.google.com/?q=${encodeURIComponent(
                RESTAURANT.address
              )}`}
            />
            <InfoCard
              Icon={Phone}
              label="Telefono"
              testid="contact-phone"
              primary={RESTAURANT.phonePrimary}
              secondary={`Cellulare · ${RESTAURANT.phoneMobile}`}
              href={`tel:${RESTAURANT.phonePrimary.replace(/\s/g, "")}`}
            />
            <InfoCard
              Icon={Clock}
              label="Orari"
              testid="contact-hours"
              primary={`Pranzo · ${RESTAURANT.hours[0].time}`}
              secondary={`Cena · ${RESTAURANT.hours[1].time}`}
            />
            <InfoCard
              Icon={Instagram}
              label="Seguici"
              testid="contact-social"
              primary="Instagram · Facebook"
              secondary="@burgergrillcamucia"
              extraIcon={Facebook}
            />
          </div>
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-stone-800/60 pt-8 md:flex-row md:items-center">
          <p className="font-display text-xl text-stone-50">
            Burger <span className="italic text-amber-500">&amp;</span> Grill
            <span className="ml-2 text-xs uppercase tracking-mega text-stone-500">
              Camucia · Cortona
            </span>
          </p>
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Burger &amp; Grill. Tutti i diritti
            riservati.
          </p>
        </footer>
      </div>
    </section>
  );
}

function InfoCard({ Icon, label, primary, secondary, href, testid, extraIcon: Extra }) {
  const Inner = (
    <div className="group flex h-full flex-col gap-4 border-b border-stone-800/60 p-6 transition-colors hover:bg-stone-900/40 md:border-l md:border-b-0 md:p-8">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-amber-500" />
        <span className="text-[10px] font-bold uppercase tracking-mega text-stone-500">
          {label}
        </span>
        {Extra ? <Extra className="ml-auto h-4 w-4 text-stone-600" /> : null}
      </div>
      <div>
        <p className="font-display text-2xl leading-tight text-stone-50 transition-colors group-hover:text-amber-400">
          {primary}
        </p>
        <p className="mt-1 text-sm text-stone-400">{secondary}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testid}
      >
        {Inner}
      </a>
    );
  }
  return <div data-testid={testid}>{Inner}</div>;
}
