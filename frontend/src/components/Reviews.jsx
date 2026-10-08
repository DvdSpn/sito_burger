import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PenLine, Quote, Star } from "lucide-react";
import { RESTAURANT } from "../data/menu";
import { cn } from "../lib/utils";
import Button from "./brand/Button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJqVxkvt77KxMR52z7K_J8NNU";

export default function Reviews({ t, lang }) {
  const [index, setIndex] = useState(0);
  const [source, setSource] = useState("fallback"); // "google" | "fallback"
  const [remote, setRemote] = useState(null);

  const reviews =
    remote && remote.reviews && remote.reviews.length > 0
      ? remote.reviews.map((r) => ({
          name: r.authorAttribution?.displayName || "Anonymous",
          rating: r.rating || 5,
          text: r.text || "",
          platform: "Google",
          photo: r.authorAttribution?.photoUri,
          time: r.relativeTimeDescription,
        }))
      : [];

  const total = reviews.length;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/reviews`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setSource(data.source || "fallback");
        if (data.source === "google" && data.reviews?.length) {
          setRemote(data);
        }
      } catch (e) {
        // silent fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Fallback view: real reviews are not available → never show a fake
  // star score or review count, just the title and a CTA to Google.
  if (source !== "google" || total === 0) {
    return (
      <section
        id="recensioni"
        data-testid="section-recensioni"
        data-reviews-source={source}
        className="relative border-t border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-950 to-stone-900/50 py-20 md:py-28"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center lg:px-12">
          <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
            {t("reviews.kicker")}
          </p>
          <h2 className="font-display text-3xl font-black leading-[1] tracking-tight text-stone-50 md:text-5xl">
            {t("reviews.title")}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-stone-300">
            {t("reviews.fallbackBody")}
          </p>
          <Button
            as="a"
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            icon={Star}
            data-testid="reviews-read-google-btn"
            className="mt-2"
          >
            {t("reviews.readOnGoogle")}
          </Button>
        </div>
      </section>
    );
  }

  // Live Google reviews view
  const score = remote?.rating;
  const count = remote?.userRatingCount;

  return (
    <section
      id="recensioni"
      data-testid="section-recensioni"
      data-reviews-source={source}
      className="relative border-t border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-950 to-stone-900/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
              {t("reviews.kicker")}
              <span
                data-testid="reviews-live"
                className="ml-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400"
              >
                ● {t("reviews.fromGoogle")}
              </span>
            </p>
            {score ? (
              <>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-7xl font-black leading-none text-stone-50 md:text-8xl">
                    {score.toFixed(1)}
                  </span>
                  <span className="font-hand text-3xl text-amber-500">
                    {t("reviews.subtitle")}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1" data-testid="reviews-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(score)
                          ? "fill-amber-500 text-amber-500"
                          : "fill-amber-500/30 text-amber-500/30"
                      )}
                    />
                  ))}
                </div>
                {count ? (
                  <p className="mt-4 text-sm text-stone-400">{t("reviews.basedOn", count)}</p>
                ) : null}
              </>
            ) : null}

            <a
              href={RESTAURANT.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="leave-review-btn"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-none bg-amber-600 px-5 py-3 text-xs font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-amber-500"
            >
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" /> {t("reviews.leaveReview")}
            </a>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                aria-label={t("reviews.prev")}
                onClick={prev}
                data-testid="reviews-prev"
                className="grid h-12 w-12 place-items-center rounded-full border border-stone-500 bg-stone-900/50 text-stone-300 transition-all hover:border-amber-600 hover:bg-amber-600 hover:text-stone-950"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={t("reviews.next")}
                onClick={next}
                data-testid="reviews-next"
                className="grid h-12 w-12 place-items-center rounded-full border border-stone-500 bg-stone-900/50 text-stone-300 transition-all hover:border-amber-600 hover:bg-amber-600 hover:text-stone-950"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="ml-3 flex items-center gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={t("reviews.dot", i + 1)}
                    data-testid={`reviews-dot-${i}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      i === index
                        ? "w-8 bg-amber-500"
                        : "bg-stone-500 hover:bg-stone-400"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-8">
            <Quote className="absolute -top-4 left-0 h-14 w-14 text-amber-600/20" aria-hidden="true" />
            <div className="relative w-full overflow-hidden" data-testid="reviews-carousel">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {reviews.map((r, i) => (
                  <article
                    key={i}
                    data-testid={`review-${i}`}
                    aria-hidden={i !== index}
                    className="w-full min-w-0 shrink-0 grow-0 basis-full"
                  >
                    <div className="mb-5 flex items-center gap-1">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-4 w-4",
                            s < r.rating ? "fill-amber-500 text-amber-500" : "text-stone-500"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="whitespace-pre-line break-words font-display text-base leading-snug text-stone-100 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      {r.photo ? (
                        <img
                          src={r.photo}
                          alt=""
                          className="h-12 w-12 rounded-full border border-amber-700/40 object-cover"
                        />
                      ) : (
                        <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-700/40 bg-stone-900 font-display text-lg text-amber-500" aria-hidden="true">
                          {r.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-display text-lg font-bold text-stone-50">{r.name}</p>
                        <p className="text-xs uppercase tracking-mega text-stone-400">
                          {r.time || ""} · {r.platform}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
