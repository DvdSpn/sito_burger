import { useEffect, useRef, useState } from "react";
import { Menu, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import OpenClosedBadge from "./OpenClosedBadge";
import MobileMenu from "./MobileMenu";
import Button from "./brand/Button";

// WebM/VP9 for Chrome, Firefox, Edge; MP4/H.264 for Safari and iPhone
const HERO_VIDEO_WEBM = "/video/hero-burger.webm";
const HERO_VIDEO_MP4 = "/video/hero-burger.mp4";
const HERO_POSTER = "/images/hero-burger-poster.jpg";

/**
 * Scroll-scrubbed video: the hero is a tall track with a sticky,
 * full-screen stage inside. While the stage is pinned, scrolling down moves
 * the video forward and scrolling up moves it back. Both files are encoded
 * with very frequent keyframes (MP4 every frame, WebM every 5) so seeking
 * is instant in both directions.
 * With prefers-reduced-motion the track collapses to one screen and the
 * video stays on its first frame.
 */
function useScrollScrub(trackRef, videoRef) {
  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let target = 0;
    let current = 0;
    let frame = 0;

    const progress = () => {
      const range = track.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, -track.getBoundingClientRect().top / range));
    };

    // Ease the playhead toward the scroll position so the motion stays smooth
    // even when the wheel or the finger jumps.
    const tick = () => {
      frame = 0;
      const duration = video.duration;
      if (!duration) return;
      target = progress() * (duration - 0.04);
      current += (target - current) * 0.3;
      if (Math.abs(target - current) < 0.002) current = target;
      if (Math.abs(video.currentTime - current) > 0.001) video.currentTime = current;
      if (current !== target) frame = window.requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    // iOS Safari only paints seeked frames once the video has played once
    const unlock = () => {
      const played = video.play();
      if (played && played.then) {
        played.then(() => { video.pause(); schedule(); }).catch(() => {});
      }
    };

    // Load the whole file into memory and play it from a blob URL: seeking
    // is then instant and works even where the host does not answer HTTP
    // range requests. If that fails, the <source> elements stay in charge.
    let blobUrl = "";
    let cancelled = false;
    const source = [...video.querySelectorAll("source")].find((el) =>
      video.canPlayType(el.type)
    );
    if (source && window.fetch && window.URL) {
      fetch(source.src)
        .then((res) => (res.ok ? res.blob() : Promise.reject(res.status)))
        .then((blob) => {
          if (cancelled) return;
          blobUrl = URL.createObjectURL(blob);
          video.src = blobUrl;
        })
        .catch(() => {});
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    video.addEventListener("loadedmetadata", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("touchstart", unlock);
      video.removeEventListener("loadedmetadata", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [trackRef, videoRef]);
}

export default function Hero({ t, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  useScrollScrub(trackRef, videoRef);

  return (
    <header
      ref={trackRef}
      data-testid="hero-section"
      className="relative h-[260vh] w-full bg-black motion-reduce:h-auto"
    >
      {/* Pinned full-screen stage */}
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden grain motion-reduce:relative">
      <div className="absolute inset-0 md:left-[45%] xl:left-[40%]">
        {/* Square video on a black ground: contained so the burger is never
            cropped; above the text on phones, in the right part on desktop */}
        <video
          ref={videoRef}
          data-testid="hero-video"
          poster={HERO_POSTER}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="h-full w-full object-contain object-[50%_28%] md:object-center"
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent md:h-1/3" />
      </div>
      <div className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent md:block" />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-5 lg:px-12">
        <a href="#top" data-testid="brand-mark" aria-label="Burger & Grill" className="shrink-0">
          <Logo />
        </a>

        <div className="flex items-center gap-2">
          <Button
            as={Link}
            to="/chi-siamo"
            variant="secondary"
            icon={Info}
            data-testid="nav-about"
            className="hidden backdrop-blur lg:inline-flex"
          >
            {t("nav.about")}
          </Button>
          <LanguageToggle lang={lang} setLang={setLang} />
          <Link
            to="/chi-siamo"
            data-testid="nav-about-mobile"
            aria-label={t("nav.about")}
            className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-none border border-stone-500 bg-stone-950/60 text-amber-400 backdrop-blur transition-colors hover:border-amber-500 hover:text-amber-300 lg:hidden"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-testid="mobile-menu-open"
            aria-label={t("mobile.open")}
            className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-none border border-stone-500 bg-stone-950/60 text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-16 lg:px-12 lg:pb-24">
        <div className="rise max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <OpenClosedBadge t={t} />
            <span aria-hidden="true" className="hidden h-px w-10 bg-amber-500 md:inline-block" />
            <span
              data-testid="hero-kicker"
              className="text-xs font-bold uppercase tracking-mega text-amber-500"
            >
              {t("hero.kicker")}
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-display text-[3.5rem] font-black leading-[0.92] tracking-tight text-stone-50 [text-shadow:0_2px_28px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl lg:text-[8rem]"
          >
            {t("hero.title1")}
            <span className="italic font-medium text-amber-500"> &amp; </span>
            <br className="sm:hidden" />
            {t("hero.title2")}
          </h1>

          <p
            data-testid="hero-sub"
            className="mt-4 max-w-xl text-sm leading-relaxed text-stone-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] sm:text-base md:mt-8 md:text-lg"
          >
            {t("hero.description")}
          </p>

        </div>

        {/* Highlights marquee — hidden on mobile */}
        <div className="relative mt-16 hidden border-y border-stone-800/70 py-5 md:block">
          <div className="flex justify-between gap-10 text-xs uppercase tracking-mega text-stone-400">
            <span className="text-amber-500">{t("hero.highlight1")}</span>
            <span>{t("hero.highlight2")}</span>
            <span>{t("hero.highlight3")}</span>
            <span>{t("hero.highlight4")}</span>
            <span className="text-amber-500">{t("hero.highlight5")}</span>
          </div>
        </div>
      </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} t={t} lang={lang} setLang={setLang} />
    </header>
  );
}
