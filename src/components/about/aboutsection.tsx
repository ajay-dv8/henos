"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
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
    title: "Delivery",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque iure ducimus doloremque incidunt beatae similique harum eaque et recusandae odio, minima enim maiores dolorem officiis? Vero impedit illum dolorum suscipit?",
    image: "",
    titleTwo: "",
    subImage: "",
  },
  {
    id: 2,
    title: "Industrial",
    description: "lorem ipsum",
    image: "",
    titleTwo: "",
    subImage: "",
  },
  {
    id: 3,
    title: "Drive through",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque iure ducimus doloremque incidunt beatae similique harum eaque et recusandae odio, minima enim maiores dolorem officiis? Vero impedit illum dolorum suscipit?",
    image: "/images/dt1.jpg",
    subTitle: "",
    subImage: "/images/dt2.jpg",
  },
  {
    id: 4,
    title: "USSD",
    description: "lorem ipsum",
    image: "",
    subTitle: "",
    subImage: "",
  },
    {
    id: 5,
    title: "Cylinder exchnge",
    description: "lorem ipsum",
    image: "",
    titleTwo: "",
    subImage: "",
  },
];

function StackCard({
  service,
  index,
  total,
  nextRef,
  keepSelfRef,
}: {
  service: (typeof services)[number];
  index: number;
  total: number;
  nextRef: RefObject<HTMLDivElement | null>;
  keepSelfRef: (el: HTMLDivElement | null) => void;
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
      style={{ scale, filter }}
      className={cn(
        "h-152 mt-24 sticky top-24 flex gap-28 group justify-between bg-gray-200 p-12",
        // alternate: odd cards have the image block on the right
        index % 2 === 1 && "flex-row-reverse"
      )}
    >
      {/* Main image section */}
      <div className="h-152 w-[62rem] flex flex-col bg-green-400 abs-border rounded-md">
        <div className="bg-gray-200 w-fit rounded-br-md px-4 py-2 flex gap-4 items-center">
          <span className="size-2 rounded-full bg-green-400 animate-pulse" />
          <h3 className="text-3xl font-semibold text-gray-700 ">
            {service.title}
          </h3>
        </div>

        {/* buttom section */}
        <div className="mt-auto flex w-full">
          {/* description */}
          <div className="p-4 rounded-bl-md border-white/10 bg-white/10 p-4 backdrop-blur-md transition group-hover:bg-white/20">
            <p className="w-2xl">{service.description}</p>
          </div>
          {/* images section */}
          <div className="flex h-[7rem] w-[20rem] bg-black rounded-br-lg rounded-tl-lg drop-shadow-2xl">
            <img
              src={service.image}
              className="w-[10rem] rounded-tl-md"
            />
            <img
              src={service.subImage}
              className="w-[10rem] rounded-r-md"
            />
          </div>
        </div>
      </div>

      {/* Main description section */}
      <div className="h-full">
        <div className="">
          <p className="">
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

  return (
    <div className="p-6 md:p-12 relative">
      <div className="">
        <h2 className="text-3xl max-w-5xl md:text-5xl text-gray-800 mb-4 font-medium">
          Henos Energy delivers reliable, clean energy solutions for homes and
          businesses, powering a safer and more sustainable future in Ghana.
        </h2>
      </div>

      {/* Card */}
      <div className="flex flex-col gap-24 w-full bg-gray-200">
        {services.map((service, index) => (
          <StackCard
            key={index}
            service={service}
            index={index}
            total={services.length}
            nextRef={cardRefs.current[Math.min(index + 1, services.length - 1)]}
            keepSelfRef={(el) => (cardRefs.current[index].current = el)}
          />
        ))}
      </div>
    </div>
  );
}










// <div className="flex gap-12">
//   {services.map((service, index) => (
//     <div
//       key={index}
//       className=""
//     >
//       <div className="mt-24 relative flex flex-wrap gap-8 ">
//         <div className="h-120 w-104 bg-green-50 rounded-xl p-4 content-fit">
//           <div className="h-104 w-full bg-green-400 rounded-lg"></div>

//           <div className="mt-2 px-2">
//             <h5 className="text-start font-semibold text-gray-700 w-full text-2xl">
//               {service.title}
//             </h5>
//           </div>
//         </div>
//       </div>

//       <div className="">
//         <p className="">{service.description}</p>
//       </div>
//     </div>
//   ))}
// </div>
