// zy-widget.d.ts
import type { JSX } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "zy-widget": JSX.IntrinsicElements["div"] & {
        "data-slug"?: string;
        "data-secret"?: string;
        "data-variant"?: "classic" | "glow" | "sleek";
        "data-title"?: string;
        "data-subtitle"?: string;
        "data-color"?: string;
        "data-position"?: "bottom-right" | "bottom-left";
        "data-api"?: string;
      };
    }
  }
}