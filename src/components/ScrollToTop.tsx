"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(resetScroll);

    const updateVisibility = () => {
      const position = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
      setVisible(position > 240);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    document.addEventListener("scroll", updateVisibility, { capture: true, passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      document.removeEventListener("scroll", updateVisibility, true);
      window.removeEventListener("resize", updateVisibility);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    setVisible(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }, [pathname]);

  const returnToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      className={`scroll-to-top${visible ? " is-visible" : ""}`}
      type="button"
      onClick={returnToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <span className="scroll-arrow" aria-hidden="true" />
    </button>
  );
}
