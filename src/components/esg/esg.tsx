import React from "react";
import ScrollRevealParagraph from "../ui/reveal-paragraph";

const paragraph = `See the impact we're making and the commitments shaping a more sustainable future.`;

export default function Esg() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-green-100 md:flex-row md:gap-12 md:p-12">
      {/* mobile title */}
      <h2 className="md:hidden text-2xl text-gray-900 md:text-gray-700 md:text-5xl">
        See the impact we're making and the commitments shaping a more
        sustainable future.
      </h2>
      <div className="">
        <img className="rounded-md max-w-full h-auto" src={"/images/ugp.png"} />
      </div>
      <div className="flex flex-col justify-between w-full items-center">
        {/* title */}
        <ScrollRevealParagraph
          className="hidden md:block text-2xl text-gray-900 md:text-gray-700 md:text-5xl tracking-wide"
          paragraph={paragraph}
          per="word"
        />

        {/* base info */}
        <div className="w-full">
          <p className="text-lg text-gray-900 md:text-gray-700 md:text-3xl">
            "The quest for cleaner energy is not just a global mandate, but a
            local necessity."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-20">
            <div className="text-right md:text-left w-full">
              <p className=" md:text-lg text-gray-800 md:text-gray-700 ">
                - Henry Osei Yaw
              </p>
              <p className="text-xs md:text-base text-gray-600 md:pl-2 ">
                CEO & Founder, Henos Energy
              </p>
            </div>

            <a
              href="https://heyzine.com/flip-book/c2d7907da7.html"
              className="flex md:h-16 md:w-48 w-full flex-row md:flex-col justify-center md:justify-between rounded-md border border-black/10 bg-green-500/10 p-2 md:p-4 backdrop-blur-md transition hover:bg-white/20 gap-x-4 mt-3 md:mt-0 "
            >
              <span className="text-sm">Learn More</span>
              <span className="md:self-end">↳</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
