"use client";

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

const EMAIL = "info@henosenergy.com";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "LinkedIn", href: "https://gh.linkedin.com/company/henos-energy-limited-company" },
      { label: "X", href: "https://x.com/henosenergy" },
      { label: "Instagram", href: "https://www.instagram.com/henosenergy/" },
      { label: "Facebook", href: "https://www.facebook.com/henosenergy/" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: "030 394 4116", href: "tel:+233303944116" },
      { label: "059 414 8515", href: "tel:+233594148515" },
    ],
  },
];

const SANS = 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", "Segoe UI", Arial, sans-serif';

export default function Footer() {
  // w-full matters when an ancestor centres content in a flex wrapper —
  // a flex item left at width:auto shrinks the canvas to 0px wide.
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="henos"
        logo={
          <img
            src="/images/fLogo.png"
            alt="Henos Energy"
            width={1000}
            height={416}
          />
        }
        label=""
        meta="©2026 · Lakeside Estates, Community 8. Gh"
        columns={COLUMNS}
        fontFamily={SANS}
        preset="night"
      />
    </div>
  );
}
