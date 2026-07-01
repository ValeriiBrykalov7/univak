"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const smoothScrollOptions = {
  autoRaf: true,
  autoToggle: true,
  lerp: 0.08,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
} satisfies LenisOptions;

const reducedMotionOptions = {
  ...smoothScrollOptions,
  lerp: 1,
  smoothWheel: false,
} satisfies LenisOptions;

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

function SmoothAnchorNavigation() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const eventTarget = event.target;

      if (!(eventTarget instanceof Element)) {
        return;
      }

      const link = eventTarget.closest<HTMLAnchorElement>("a[href]");

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);

      if (
        !destination.hash ||
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search
      ) {
        return;
      }

      const target = document.getElementById(
        decodeURIComponent(destination.hash.slice(1)),
      );

      if (!target) {
        return;
      }

      event.preventDefault();

      const scrollToTarget = () => {
        lenis.scrollTo(target, { force: true });
      };

      if (document.documentElement.classList.contains("mobile-menu-open")) {
        let frameCount = 0;

        const scrollWhenReady = () => {
          if (lenis.isStopped && frameCount < 12) {
            frameCount += 1;
            window.requestAnimationFrame(scrollWhenReady);
            return;
          }

          scrollToTarget();
        };

        window.requestAnimationFrame(scrollWhenReady);
      } else {
        scrollToTarget();
      }

      if (window.location.hash !== destination.hash) {
        window.history.pushState(null, "", destination.hash);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={
        prefersReducedMotion ? reducedMotionOptions : smoothScrollOptions
      }
    >
      <SmoothAnchorNavigation />
      {children}
    </ReactLenis>
  );
}
