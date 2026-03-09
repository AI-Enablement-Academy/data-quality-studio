"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { LenisRef } from "lenis/react";

function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const options = useMemo(
    () =>
      prefersReducedMotion
        ? { autoRaf: true, duration: 0 }
        : {
            autoRaf: false,
            duration: 1.05,
            smoothWheel: true,
            gestureOrientation: "vertical" as const,
            easing: (value: number) => 1 - Math.pow(1 - value, 4),
          },
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [prefersReducedMotion]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={options}
    >
      {children}
    </ReactLenis>
  );
}
