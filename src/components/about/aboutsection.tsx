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

type servicesType = {};

const services = [
    {
    id: 1,
    title: "Drive through",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque iure ducimus doloremque incidunt beatae similique harum eaque et recusandae odio, minima enim maiores dolorem officiis? Vero impedit illum dolorum suscipit?",
    image: "/images/dt1.jpg",
    subTitle: "Convinience at you service, we make it simple for you ",
    subImage: "/images/dt2.jpg",
  },
  {
    id: 2,
    title: "Delivery",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque iure ducimus doloremque incidunt beatae similique harum eaque et recusandae odio, minima enim maiores dolorem officiis? Vero impedit illum dolorum suscipit?",
    image: "/images/d1.png",
    subTitle: "Cant make it to us? Dont worry, We will come to you",
    subImage: "",
  },
  {
    id: 3,
    title: "Industrial",
    description: "lorem ipsum",
    image: "/images/ind1.jpg",
    subTitle: "Reliable and efficient energy solutions for your business",
    subImage: "",
  },
  {
    id: 4,
    title: "Cylinder exchnge",
    description: "lorem ipsum",
    image: "/images/cx.png",
    subTitle: "Convenient cylinder exchange service, ya fiili didaada!!!",
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
        "md:mt-24 md:sticky md:top-24 md:flex-row md:gap-28 md:group md:justify-between md:bg-gray-300 md:p-12 md:w-auto md:shrink",
        // alternate: odd cards have the image block on the right
        index % 2 === 1 && "md:flex-row-reverse",
        // same surface in both layouts
        "bg-gray-300"
      )}
    >
      {/* Main image section */}
      <div className="h-64 w-full flex flex-col rounded-md relative overflow-hidden md:h-152 md:flex-1 md:min-w-0">
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
          <div className="flex h-24 w-1/2 bg-black rounded-br-lg rounded-tl-lg drop-shadow-2xl md:h-[7rem] md:w-[20rem]">
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
      <div className="md:h-full md:w-[21rem] md:shrink-0">
        <div className="">
          <p className="text-gray-700 text-sm md:text-lg">
            {service.description}
          </p>
        </div>
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
