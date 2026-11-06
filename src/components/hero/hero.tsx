import { Jvideo } from "../common/video";

const stats = [
  { label: "Delivery", value: "1750+" },
  { label: "Client satisfaction", value: "98%" },
  { label: "Industry experience", value: "5+ yrs" },
];

export default function Hero() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden text-white">
      <Jvideo
        src="/vids/hero.webm"
        poster="/hp.png"
        className="h-full"
      />

      {/* darken video so text stays readable */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
        {/* stats, top right */}
        <div className="flex justify-end">
          <div className="hidden md:block w-[420px]">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/40 pt-3 pb-7">
                <p className="text-sm text-white/70">{stat.label}</p>
                <div className="mt-1 flex items-start justify-between">
                  <span className="text-5xl font-medium tracking-tight">{stat.value}</span>
                  <span className="pt-2 text-white/60">•••</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* heading + subtext bottom left, learn more bottom right */}
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl leading-[1.05] font-medium tracking-tight">
              Sustainable Energy Solutions for a Better Future
            </h1>
            <p className="mt-4 max-w-3xl font-semibold text-xl text-white/80">
              As an NPA-licensed LPG Marketing Company, Henos Energy is committed to Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions.
            </p>
          </div>

          <a
            href="#"
            className="hidden md:flex h-24 w-48 flex-col justify-between rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20"
          >
            <span className="text-sm">Learn More</span>
            <span className="self-end">↳</span>
          </a>
        </div>
      </div>
    </div>
  )
}
