import { useEffect } from "react";

// 104 frames, 640×640 WebP on black: the part of the source video where the
// burger comes apart (frames 16–119 of 210; after that it only floats)
export const FRAME_COUNT = 104;
export const frameSrc = (i) =>
  `/hero-frames/f${String(i + 1).padStart(3, "0")}.webp`;

// Idle "breathing" before the first scroll: the burger opens up to this
// share of the full sequence and closes again, once per period.
const INTRO_OPEN = 0.5;
const INTRO_PERIOD_MS = 3200;
// The idle motion fades out over this share of the scroll track
const INTRO_FADE = 0.12;
// Easing of the drawn frame toward its target (0–1, higher = snappier)
const EASE = 0.18;

/**
 * Scroll-driven burger on a <canvas>: the hero is a tall track with a sticky
 * stage. Scrolling down takes the burger apart, scrolling up puts it back
 * together; at the top of the page it opens and closes on its own.
 *
 * Frames are images drawn on a canvas rather than a seeked <video>: phones
 * (iOS Safari above all) do not repaint a paused video reliably on seek,
 * while drawing an image is instant everywhere.
 */
export default function useBurgerSequence(trackRef, canvasRef) {
  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)");

    // Load frame 0 first so something shows at once, then the rest in order
    const frames = new Array(FRAME_COUNT);
    const load = (i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        frames[i] = img;
        if (i === 0) {
          drawn = -1;
          draw();
          if (!reduceMotion) for (let k = 1; k < FRAME_COUNT; k += 1) load(k);
        }
      };
      img.src = frameSrc(i);
    };

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawn = -1;
      draw();
    };

    // Nearest frame already loaded, so a slow connection never shows a gap
    const nearestLoaded = (i) => {
      for (let d = 0; d < FRAME_COUNT; d += 1) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    let current = 0;
    let drawn = -1;
    const draw = () => {
      const index = Math.round(current);
      const img = nearestLoaded(index);
      if (!img || !width || !height) return;
      if (index === drawn && img === frames[index]) return;
      drawn = img === frames[index] ? index : -1;
      // Square frame, contained: above the text on phones, centred on desktop
      const size = Math.min(width, height);
      const x = (width - size) / 2;
      const y = desktop.matches ? (height - size) / 2 : (height - size) * 0.28;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, size, size);
    };

    const progress = () => {
      const range = track.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, -track.getBoundingClientRect().top / range));
    };

    let raf = 0;
    let visible = true;
    let introStart = performance.now();
    let scrolled = false;
    const last = FRAME_COUNT - 1;
    const tick = (now) => {
      raf = 0;
      const p = progress();
      // Back at the top after scrolling: restart the idle motion from closed
      if (p > 0) scrolled = true;
      else if (scrolled) {
        scrolled = false;
        introStart = now;
      }
      const intro = 1 - Math.min(1, p / INTRO_FADE);
      const phase = ((now - introStart) % INTRO_PERIOD_MS) / INTRO_PERIOD_MS;
      const idle = INTRO_OPEN * last * ((1 - Math.cos(phase * 2 * Math.PI)) / 2);
      const target = Math.max(p * last, idle * intro);
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.01) current = target;
      draw();
      if (visible) raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && visible) raf = window.requestAnimationFrame(tick);
    };

    resize();
    load(0);
    if (reduceMotion) {
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    // Animate only while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(track);
    window.addEventListener("resize", resize);
    desktop.addEventListener?.("change", resize);
    start();

    return () => {
      io.disconnect();
      window.removeEventListener("resize", resize);
      desktop.removeEventListener?.("change", resize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [trackRef, canvasRef]);
}
