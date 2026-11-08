"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import type { RefObject } from "react";


type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  subTitle: string;
  subImage: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Drive through",
    description:
      "Get your LPG quickly and conveniently without leaving your vehicle. Our drive-through service makes refilling easier, saving you time while ensuring a smooth and hassle-free experience.",
    image: "/images/dt1.jpg",
    subTitle: "Convenience at your service. Quick, simple, and hassle-free.",
    subImage: "/images/dt2.jpg",
  },
  {
    id: 2,
    title: "Delivery",
    description:
      "Enjoy the convenience of having your LPG delivered right to your doorstep. Whether for your home or business, Henos Energy makes it easier to get the gas you need without making the trip.",
    image: "/images/d1.png",
    subTitle: "Can't make it to us? Don't worry. We'll bring the energy to you.",
    subImage: "",
  },
  {
    id: 3,
    title: "Industrial",
    description:
      "We provide dependable LPG supply solutions for industrial and commercial operations. From supporting daily processes to meeting larger energy demands, we help businesses access the fuel they need to keep running efficiently.",
    image: "/images/ind1.jpg",
    subTitle: "Reliable energy solutions designed to keep your business moving.",
    subImage: "",
  },
  {
    id: 4,
    title: "Cylinder exchange",
    description:
      "Make LPG refills easier with our convenient cylinder exchange service. Bring in your empty cylinder and exchange it for a filled one, so you can get back to what matters without unnecessary delays.",
    image: "/images/cx.png",
    subTitle: "Empty to full, without the hassle. Ya fiili didaada!",
    subImage: "",
  },
];


// the sticky/scale card choreography only makes sense with vertical scrolling;
// on narrow screens the cards live in a horizontal drag track instead
function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

function StackCard({
  service,
  index,
  total,
  nextRef,
  keepSelfRef,
  isDesktop,
}: {
  service: (typeof services)[number];
  index: number;
  total: number;
  nextRef: RefObject<HTMLDivElement | null>;
  keepSelfRef: (el: HTMLDivElement | null) => void;
  isDesktop: boolean;
}) {
  // progress of the NEXT card travelling from the bottom of the viewport up
  // to its pin line — i.e. how far along it is in covering this card
  const { scrollYProgress } = useScroll({
    target: nextRef,
    offset: ["start end", "start start"],
  });

  // the last card is never covered, so it stays full size and bright
  const covered = index < total - 1;
  const scale = useTransform(scrollYProgress, [0.3, 0.9], covered ? [1, 0.92] : [1, 1]);
  const brightness = useTransform(scrollYProgress, [0.3, 0.9], covered ? [1, 0.6] : [1, 1]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <motion.div
      ref={keepSelfRef}
      style={isDesktop ? { scale, filter } : undefined}
      className={cn(
        // mobile: fixed-width card inside the drag track, content stacked
        "flex flex-col gap-4 items-start p-2 rounded-lg w-[84vw] shrink-0 snap-center",
        // desktop: full-width sticky card, image and text side by side
        "md:mt-24 md:sticky md:top-24 md:flex-row md:group md:justify-between md:bg-gray-300 md:p-0 md:w-auto md:shrink",
        // alternate: odd cards have the image block on the right
        index % 2 === 1 && "md:flex-row-reverse",
        // same surface in both layouts
        "bg-gray-200"
      )}
    >
      {/* Main image section */}
      <div className={cn("h-64 w-full flex flex-col rounded-md md:rounded-none relative overflow-hidden md:h-152 md:flex-2 md:min-w-0",
        index % 2 === 1 && "md:rounded-r-md",
        index % 2 === 0 && "md:rounded-l-md",
      )}>
        {/* bg picture (transition effect to be reintroduced later) */}
        {service.image && (
          <img
            src={service.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="relative bg-gray-300 w-fit rounded-br-md px-2 md:px-4 py-1 md:py-2 flex gap-4 items-center">
          <span className="size-2 hidden md:block rounded-full bg-green-400 animate-pulse" />
          <h3 className="text-lg md:text-3xl md:font-semibold text-gray-900 md:text-gray-700 ">
            {service.title}
          </h3>
        </div>

        {/* buttom section */}
        <div className="mt-auto hidden md:flex w-full relative">
          {/* description */}
          <div className="p-4 rounded-bl-md rounded-tr-md  border border-white/10 bg-white/10 backdrop-blur-sm transition group-hover:bg-white/20">
            <p className="w-full text-xl text-white drop-shadow-2xl md:w-2xl md:text-3xl">{service.subTitle}</p>
          </div>
          {/* images section */}
          <div className="flex h-24 w-1/2 bg-transparent rounded-br-lg rounded-tl-lg drop-shadow-2xl md:h-[7rem] md:w-[20rem]">
            {service.image && (
              <img src={service.image} alt="" className="w-1/2 rounded-tl-md md:w-[10rem]" />
            )}
            {service.subImage && (
              <img src={service.subImage} alt="" className="w-1/2 rounded-r-md md:w-[10rem]" />
            )}
          </div>
        </div>
      </div>

      {/* Main description section */}
      <div className="md:h-full md:w-[21rem] md:shrink-0 md:flex-1 md:p-12">
          <p className="text-gray-700 text-sm tracking-wide md:text-3xl">
            {service.description}
          </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  // refs to every sticky card row; card i measures against card i+1
  const cardRefs = useRef<{ current: HTMLDivElement | null }[]>(
    services.map(() => ({ current: null }))
  );
  const isDesktop = useIsDesktop();

  return (
    <div className="p-6 md:p-12 relative">
      <div className="">
        <h2 className="text-2xl max-w-5xl md:text-5xl text-gray-800 mb-4 font-medium">
          Henos Energy delivers reliable, clean energy solutions for homes and
          businesses, powering a safer and more sustainable future in Ghana.
        </h2>
      </div>

      {/* Cards: horizontal drag track on mobile, vertical sticky stack on desktop */}
      <div
        className="flex flex-row gap-4 bg-gray-200 py-6 overflow-x-auto snap-x snap-mandatory
          md:w-full md:flex-col md:gap-24 md:overflow-visible md:snap-none
          max-md:scroll-px-6 max-md:[&::-webkit-scrollbar]:hidden max-md:[scrollbar-width:none]"
      >
        {services.map((service, index) => (
          <StackCard
            key={index}
            service={service}
            index={index}
            total={services.length}
            nextRef={cardRefs.current[Math.min(index + 1, services.length - 1)]}
            keepSelfRef={(el) => (cardRefs.current[index].current = el)}
            isDesktop={isDesktop}
          />
        ))}
      </div>
    </div>
  );
}
