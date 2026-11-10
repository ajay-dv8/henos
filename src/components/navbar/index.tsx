"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNavbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (open) {
      setHidden(false);
      return;
    }
    // hide while scrolling down (past the hero), show instantly on scroll up
    setHidden(latest > prev && latest > 160);
  });

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setHidden(false);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 34,
          opacity: { duration: 0.4 },
        }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-2 pt-2 sm:px-8"
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full border pl-5 pr-1 py-0.5 sm:py-1 transition-[background-color,border-color,box-shadow,color] duration-500",
            scrolled
              ? "border-black/10 bg-green-50/75 text-gray-800 shadow-md shadow-black/5 backdrop-blur-lg"
              : "border-white/15 bg-white/5 text-white backdrop-blur-md"
          )}
        >
          {/* logo — dark-green wordmark needs a light chip to read over the hero video,
              and blends into the white glass bar once scrolled */}
          <Link
            href="/"
            aria-label="Henos Energy home"
            className="rounded-full p-1 pr-2.5"
          >
            <img
              src="/images/nLogo.png"
              alt="Henos Energy"
              width={220}
              height={53}
              className="h-6 w-auto"
            />
          </Link>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-[13px] uppercase tracking-[0.16em]"
              >
                {link.label}
                {/* hover underline wipes in from the left */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 bottom-1 h-px origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden rounded-full border px-4 py-2 text-[13px] uppercase tracking-[0.16em] transition-colors md:block",
                scrolled
                  ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-700"
                  : "border-white/20 bg-white/10 hover:bg-white/20"
              )}
            >
              Contact Us
            </Link>

            {/* hamburger → X */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-50 flex size-8 flex-col items-center justify-center rounded-full transition-colors md:hidden",
                scrolled ? "border-gray-900 text-gray-800" : "border-white/25 text-white"
              )}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-5 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-5 bg-current"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-gray-950/95 px-8 pb-10 pt-28 text-white backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-5 text-4xl font-medium tracking-tight"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="text-white/40 transition-colors duration-300 group-hover:text-green-400"
                    >
                      ↳
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-4 text-center font-medium hover:bg-green-500"
              >
                Contact us
                <span aria-hidden>↳</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
