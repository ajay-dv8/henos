import React from "react";

export default function Esg() {
  return (
    <div className="p-6 md:p-12 flex gap-12 bg-green-100 h-fit">
      <div className="">
        <img className="rounded-md" src={"/images/ugp.png"} />
      </div>
      <div className="flex flex-col justify-between h-full w-full items-center">
        {/* title */}
        <h2 className="text-5xl text-gray-700">
          See the impact we're making and the commitments shaping a more
          sustainable future.
        </h2>

        {/* base info */}
        <div className="w-full">
          <p className="text-3xl text-gray-700">
            "The quest for cleaner energy is not just a global mandate, but a
            local necessity."
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="">
              <p className="text-lg text-gray-700 ">- Henry Osei Yaw</p>
              <p className="text-gray-600 pl-2">CEO & Founder, Henos Energy</p>
            </div>

            <a
              href="https://heyzine.com/flip-book/c2d7907da7.html"
              className="hidden md:flex h-16 w-48 flex-col justify-between rounded-md border border-black/10 bg-green-500/10 p-4 backdrop-blur-md transition hover:bg-white/20"
            >
              <span className="text-sm">Learn More</span>
              <span className="self-end">↳</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
