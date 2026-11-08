// components/ziyarn-widget.tsx
"use client";

import Script from "next/script";

type ZiyarnVariant = "classic" | "glow" | "sleek";

export function ZiyarnWidget({
  slug,
  secret,
  variant = "classic",
  title = "Chat with us",
  subtitle = "We usually reply in minutes",
  color = "#10b981",
  position = "bottom-right",
}: {
  slug: string;
  secret: string;
  variant?: ZiyarnVariant;
  title?: string;
  subtitle?: string;
  color?: string;
  position?: "bottom-right" | "bottom-left";
}) {
  return (
    <>
      <Script
        src="https://ziyarn.vercel.app/widget.js"
        strategy="afterInteractive"
      />
      <zy-widget
        data-slug={slug}
        data-secret={secret}
        data-variant={variant}
        data-title={title}
        data-subtitle={subtitle}
        data-color={color}
        data-position={position}
      />
    </>
  );
}