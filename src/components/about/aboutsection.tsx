"use client";

import { useMemo } from "react";
import ScrollRevealParagraph from "../ui/reveal-paragraph";
import StickyContentWrapper from "../ui/sticky-content-wrapper";

const services = [
  {
    id: 1,
    title: "Drive through",
    description:
      "Get your LPG quickly and conveniently without leaving your vehicle. Our drive-through service makes refilling easier, saving you time while ensuring a smooth and hassle-free experience.",
    image: "/images/dt1.jpg",
  },
  {
    id: 2,
    title: "Delivery",
    description:
      "Enjoy the convenience of having your LPG delivered right to your doorstep. Whether for your home or business, Henos Energy makes it easier to get the gas you need without making the trip.",
    image: "/images/d1.webp",
  },
  {
    id: 3,
    title: "Industrial",
    description:
      "We provide dependable LPG supply solutions for industrial and commercial operations. From supporting daily processes to meeting larger energy demands, we help businesses access the fuel they need to keep running efficiently.",
    image: "/images/ind1.jpg",
  },
  {
    id: 4,
    title: "Cylinder exchange",
    description:
      "Make LPG refills easier with our convenient cylinder exchange service. Bring in your empty cylinder and exchange it for a filled one, so you can get back to what matters without unnecessary delays.",
    image: "/images/cx.webp",
  },
];

// Title Parapraph
const paragraph = `Henos Energy delivers reliable, clean energy solutions for homes and businesses, powering a safer and more sustainable future in Ghana.`

export default function AboutSection() {
  // memo so the gsap ScrollTrigger timeline isn't rebuilt on every parent render
  const items = useMemo(
    () =>
      services.map((service) => ({
        heading: service.title,
        paragraph: service.description,
        image: service.image,
        alt: service.title,
      })),
    []
  );

  return (
    <div className="relative" id="services">
      {/* Title Paragraph */}
      <div className="p-6 md:p-12">
        <ScrollRevealParagraph
          className="text-2xl max-w-5xl md:text-5xl text-gray-800 mb-4 font-medium tracking-wide"
          paragraph={paragraph}
          per="word"
        />
      </div>

      {/* Full-bleed sticky content scroll experience */}
      <StickyContentWrapper items={items} />
    </div>
  );
}
