import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { REVIEWS } from "../data/i18n";
import { cn } from "../lib/utils";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Reviews({ t, lang }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [source, setSource] = useState("fallback"); // google | fallback
  const [remote, setRemote] = useState(null);

  const reviews = remote && remote.reviews && remote.reviews.length > 0
    ? remote.reviews.map((r) => ({
        name: r.authorAttribution?.displayName || "Anon",
        from: "Google",
        rating: r.rating || 5,
        it: r.text || "",
        en: r.text || "",
        platform: "Google",
        photo: r.authorAttribution?.photoUri,
        time: r.relativeTimeDescription,
      }))
    : REVIEWS;

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

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const score = remote?.rating || 4.7;
  const count = remote?.userRatingCount || 400;

  return (
    <section
      id="recensioni"
      data-testid="section-recensioni"
      data-reviews-source={source}
      className="relative border-t border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-950 to-stone-900/50 py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              {t("reviews.kicker")}
              {source === "google" && (
                <span
                  data-testid="reviews-live"
                  className="ml-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400"
                >
                  ● Live from Google
                </span>
              )}
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-7xl font-black leading-none text-stone-50 md:text-8xl">
                {score.toFixed(1)}
              </span>
              <span className="font-hand text-3xl text-amber-500">
                {t("reviews.subtitle")}
              </span>
            </div>
            <div
              className="mt-3 flex items-center gap-1"
              data-testid="reviews-stars"
            >
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
            <p className="mt-4 text-sm text-stone-400">
              {t("reviews.basedOn", count)}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                aria-label={t("reviews.prev")}
                onClick={prev}
                data-testid="reviews-prev"
                className="grid h-12 w-12 place-items-center rounded-full border border-stone-700 bg-stone-900/50 text-stone-300 transition-all hover:border-amber-600 hover:bg-amber-600 hover:text-stone-950"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t("reviews.next")}
                onClick={next}
                data-testid="reviews-next"
                className="grid h-12 w-12 place-items-center rounded-full border border-stone-700 bg-stone-900/50 text-stone-300 transition-all hover:border-amber-600 hover:bg-amber-600 hover:text-stone-950"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="ml-3 flex items-center gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Review ${i + 1}`}
                    data-testid={`reviews-dot-${i}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index
                        ? "w-8 bg-amber-500"
                        : "w-1.5 bg-stone-700 hover:bg-stone-500"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <Quote className="absolute -top-4 left-0 h-14 w-14 text-amber-600/20" />
            <div
              className="relative overflow-hidden"
              data-testid="reviews-carousel"
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {reviews.map((r, i) => (
                  <article
                    key={i}
                    data-testid={`review-${i}`}
                    aria-hidden={i !== index}
                    className="w-full shrink-0 pr-8"
                  >
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-4 w-4",
                            s < r.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-stone-700"
                          )}
                        />
                      ))}
                    </div>
                    <p className="font-display text-2xl leading-snug text-stone-100 md:text-3xl lg:text-4xl">
                      &ldquo;{lang === "en" ? r.en : r.it}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      {r.photo ? (
                        <img
                          src={r.photo}
                          alt={r.name}
                          className="h-12 w-12 rounded-full border border-amber-700/40 object-cover"
                        />
                      ) : (
                        <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-700/40 bg-stone-900 font-display text-lg text-amber-500">
                          {r.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-display text-lg font-bold text-stone-50">
                          {r.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-mega text-stone-500">
                          {r.time || r.from} · {r.platform}
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
