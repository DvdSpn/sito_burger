import { Link } from "react-router-dom";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import { RESTAURANT } from "../data/menu";
import { MAPS_LINK } from "../data/i18n";

export default function HomeFooter({ t }) {
  return (
    <footer
      data-testid="home-footer"
      className="relative border-t border-stone-800/70 bg-stone-950 py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Logo />
            <div>
              <p className="font-display text-2xl text-stone-50 md:text-3xl">
                Burger <span className="italic text-amber-500">&amp;</span> Grill
              </p>
              <p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-mega text-stone-500">
                Camucia · Cortona · Dal 2016
              </p>
              <div className="mt-3">
                <OpenClosedBadge t={t} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-address"
              className="flex items-center gap-2 text-stone-300 transition-colors hover:text-amber-500"
            >
              <MapPin className="h-4 w-4 text-amber-500" />
              <span>{RESTAURANT.address}</span>
            </a>
            <a
              href={`tel:${RESTAURANT.phonePrimary.replace(/\s/g, "")}`}
              data-testid="footer-phone"
              className="flex items-center gap-2 text-stone-300 transition-colors hover:text-amber-500"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              <span>
                {RESTAURANT.phonePrimary} · {RESTAURANT.phoneMobile}
              </span>
            </a>
            <div className="flex items-center gap-2 text-stone-300">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>
                {t("contact.hoursLunch")} {RESTAURANT.hours[0].time} ·{" "}
                {t("contact.hoursDinner")} {RESTAURANT.hours[1].time}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-stone-800/60 pt-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/chi-siamo"
              data-testid="footer-about-link"
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-mega text-stone-300 transition-colors hover:text-amber-500"
            >
              {t("nav.about")} <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              to="/bevande"
              data-testid="footer-drinks-link"
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-mega text-amber-500 transition-colors hover:text-amber-400"
            >
              {t("nav.drinks")} <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Burger &amp; Grill. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
