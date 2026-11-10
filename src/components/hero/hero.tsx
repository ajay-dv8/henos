import { Jvideo } from "../common/video";
import CountUp from "../ui/count-up";

const stats = [
  { label: "Delivery", value: 1750, extention: "+" },
  { label: "Client satisfaction", value: 98, extention: "%" },
  { label: "Industry experience", value: 5, extention: "+ yrs" },
];

export default function Hero() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden text-white">
      <Jvideo
        src="/vids/hero.webm"
        poster="/hp.png"
        className="h-full object-cover"
        containerClassName="h-full"
      />

      {/* darken video so text stays readable */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
        {/* stats, top right (nudged below the floating navbar pill) */}
        <div className="flex justify-end md:pt-6">
          <div className="hidden md:block w-[420px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-t border-white/40 pt-3 pb-7"
              >
                <p className="text-sm text-white/70">{stat.label}</p>
                <div className="mt-1 flex items-start justify-between">
                  <span className="text-5xl font-medium tracking-tight">
                    <CountUp
                      from={0}
                      to={stat.value}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    <span className="">{stat.extention}</span>
                  </span>
                  <span className="pt-2 text-white/60">•••</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* heading + subtext bottom left, learn more bottom right */}
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl leading-[1.05] font-medium tracking-tight lg:text-8xl">
              Sustainable Energy Solutions for a Better Future
            </h1>
            <p className="mt-4 max-w-3xl md:font-semibold text-base md:text-xl text-white/80">
              As an NPA-licensed LPG Marketing Company, Henos Energy is
              committed to Empowering businesses and communities to thrive in a
              low-carbon world through tailored clean energy solutions.
            </p>
          </div>

          {/* get a better functionality for this section */}
          <a
            href="#"
            className="hidden md:flex h-24 w-48 flex-col justify-between rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20"
          >
            <span className="text-sm mb-2">
              USSD:  <span className="font-bold">*899*89#</span>
            </span>
           
            <span className="text-sm">Learn More</span>
            <span className="self-end">↳</span>
          </a>
        </div>
      </div>
    </div>
  );
}
