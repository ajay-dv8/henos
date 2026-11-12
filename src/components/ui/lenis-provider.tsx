"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Lenis blocks anchor links while scrolling unless this is on
      anchors: true,
      // driven by gsap.ticker below (autoRaf defaults to false)
    });

    // canonical Lenis + ScrollTrigger integration:
    // one rAF clock for both, so pinned/scrubbed triggers stay in sync
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(1000, 33); // restore gsap default
      lenis.destroy();
    };
  }, []);

  return children;
}
