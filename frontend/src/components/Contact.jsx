import { Clock, MapPin, Phone, Instagram, Facebook, ExternalLink } from "lucide-react";
import { RESTAURANT } from "../data/menu";
import { MAPS_EMBED_SRC, MAPS_LINK } from "../data/i18n";
import Logo from "./Logo";
import Button from "./brand/Button";

export default function Contact({ t }) {
  const waUrl = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(t("wa.message.generic"))}`;
  return (
    <section
      id="contatti"
      data-testid="section-contatti"
      className="relative border-t border-stone-800/70 bg-stone-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
              {t("contact.kicker")}
            </p>
            <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-7xl">
              {t("contact.title1")}
              <br />
              <span className="italic font-medium text-amber-500">
                {t("contact.title2")}
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-400">
              {t("contact.description")}
            </p>

            <Button
              as="a"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              data-testid="contact-whatsapp-btn"
              className="mt-8 gap-3"
            >
              {t("contact.whatsapp")}
              <span className="text-base" aria-hidden="true">→</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-0 lg:col-span-7 md:grid-cols-2">
            <InfoCard
              Icon={MapPin}
              label={t("contact.address")}
              testid="contact-address"
              primary={RESTAURANT.address.split(",")[0]}
              secondary={RESTAURANT.address.split(",").slice(1).join(",").trim()}
              href={MAPS_LINK}
            />
            <InfoCard
              Icon={Phone}
              label={t("contact.phone")}
              testid="contact-phone"
              primary={RESTAURANT.phonePrimary}
              secondary={`${t("contact.phoneExtra")} · ${RESTAURANT.phoneMobile}`}
              href={`tel:${RESTAURANT.phonePrimary.replace(/\s/g, "")}`}
            />
            <InfoCard
              Icon={Clock}
              label={t("contact.hours")}
              testid="contact-hours"
              lines={[
                `${t("contact.hoursLunch")} · ${RESTAURANT.hours[0].time}`,
                `${t("contact.hoursDinner")} · ${RESTAURANT.hours[1].time}`,
              ]}
            />
            <InfoCard
              Icon={Instagram}
              label={t("contact.social")}
              testid="contact-social"
              primary="Instagram · Facebook"
              secondary="@burgergrillcamucia"
              extraIcon={Facebook}
            />
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="mt-20">
          <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
                {t("contact.map.title")}
              </p>
              <p className="mt-2 font-display text-2xl text-stone-50 md:text-3xl">
                {RESTAURANT.address}
              </p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="map-open-link"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-none border border-stone-500 px-4 py-2 text-xs font-bold uppercase tracking-mega text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
            >
              {t("contact.map.open")} <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
          <div className="overflow-hidden rounded-none border border-stone-800/80 bg-stone-900">
            <iframe
              title="Burger & Grill Camucia — Google Maps"
              data-testid="google-map-iframe"
              src={MAPS_EMBED_SRC}
              className="h-[360px] w-full md:h-[480px]"
              style={{ border: 0, filter: "grayscale(0.35) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-stone-800/60 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <Logo />
            <div>
              <p className="font-display text-2xl text-stone-50 md:text-3xl">
                Burger <span className="italic text-amber-500">&amp;</span> Grill
              </p>
              <p className="text-xs uppercase tracking-mega text-stone-400">
                Camucia · Cortona · Dal 2016
              </p>
            </div>
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Burger &amp; Grill. {t("footer.rights")}
          </p>
        </footer>
      </div>
    </section>
  );
}

function InfoCard({ Icon, label, primary, secondary, lines, href, testid, extraIcon: Extra }) {
  const Inner = (
    <div className="group flex h-full flex-col gap-4 border-b border-stone-800/60 p-6 transition-colors hover:bg-stone-900/40 md:border-l md:border-b-0 md:p-8">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-amber-500" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-mega text-stone-400">
          {label}
        </span>
        {Extra ? <Extra className="ml-auto h-4 w-4 text-stone-400" aria-hidden="true" /> : null}
      </div>
      <div>
        {lines && lines.length > 0 ? (
          <div className="space-y-1">
            {lines.map((line, i) => (
              <p
                key={i}
                className="font-display text-xl leading-tight text-stone-50 transition-colors group-hover:text-amber-400 md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>
        ) : (
          <>
            <p className="font-display text-2xl leading-tight text-stone-50 transition-colors group-hover:text-amber-400">
              {primary}
            </p>
            <p className="mt-1 text-sm text-stone-400">{secondary}</p>
          </>
        )}
      </div>
    </div>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-testid={testid}
      >
        {Inner}
      </a>
    );
  }
  return <div data-testid={testid}>{Inner}</div>;
}
