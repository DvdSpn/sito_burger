import { Link } from "react-router-dom";
import { Clock, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import { RESTAURANT } from "../data/menu";
import { hoursLines } from "../data/hours";
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
              <p className="mt-1 whitespace-nowrap text-xs uppercase tracking-mega text-stone-400">
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
              className="flex min-h-[44px] items-center gap-2 py-2 text-stone-300 transition-colors hover:text-amber-500"
            >
              <MapPin className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{RESTAURANT.address}</span>
            </a>
            <a
              href={`tel:${RESTAURANT.phonePrimary.replace(/\s/g, "")}`}
              data-testid="footer-phone"
              className="flex min-h-[44px] items-center gap-2 py-2 text-stone-300 transition-colors hover:text-amber-500"
            >
              <Phone className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{RESTAURANT.phonePrimary}</span>
            </a>
            <a
              href={`tel:${RESTAURANT.phoneMobile.replace(/\s/g, "")}`}
              data-testid="footer-phone-mobile"
              className="flex min-h-[44px] items-center gap-2 py-2 text-stone-300 transition-colors hover:text-amber-500"
            >
              <Phone className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{RESTAURANT.phoneMobile}</span>
            </a>
            <div className="flex items-start gap-2 text-stone-300">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <div className="flex flex-col">
                {hoursLines(t).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-stone-800/60 pt-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/chi-siamo"
              data-testid="footer-about-link"
              className="inline-flex min-h-[44px] items-center gap-1 py-2 text-xs font-bold uppercase tracking-mega text-stone-300 transition-colors hover:text-amber-500"
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/bevande"
              data-testid="footer-drinks-link"
              className="inline-flex min-h-[44px] items-center gap-1 py-2 text-xs font-bold uppercase tracking-mega text-amber-500 transition-colors hover:text-amber-400"
            >
              {t("nav.drinks")}
            </Link>
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Burger &amp; Grill. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
