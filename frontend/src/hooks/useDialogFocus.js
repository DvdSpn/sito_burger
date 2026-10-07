import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusables(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0
  );
}

/**
 * Focus management for dialogs and side panels (WCAG 2.4.3).
 *
 * While `active` is true:
 * - moves focus inside the container (initialFocusRef, else the first
 *   focusable element, else the container itself);
 * - keeps Tab / Shift+Tab inside the container.
 * When `active` turns false (or the component unmounts) focus goes back to
 * the element that had it before the dialog opened.
 */
export default function useDialogFocus(active, containerRef, initialFocusRef) {
  const returnTo = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const root = containerRef.current;
    if (!root) return undefined;

    returnTo.current = document.activeElement;

    // Wait a frame: the panel has just lost `inert` and may still be painting.
    const raf = window.requestAnimationFrame(() => {
      const target =
        (initialFocusRef && initialFocusRef.current) || focusables(root)[0] || root;
      if (target && typeof target.focus === "function") {
        target.focus({ preventScroll: true });
      }
    });

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const items = focusables(root);
      if (items.length === 0) {
        e.preventDefault();
        root.focus({ preventScroll: true });
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !root.contains(current);
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      const el = returnTo.current;
      returnTo.current = null;
      if (el && typeof el.focus === "function" && document.contains(el)) {
        el.focus({ preventScroll: true });
      }
    };
  }, [active, containerRef, initialFocusRef]);
}
