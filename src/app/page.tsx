import AboutSection from "@/components/about/aboutsection";
import Esg from "@/components/esg/esg";
import Hero from "@/components/hero/hero";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* hero is position:fixed, so this spacer is the first viewport it occupies */}
      <div aria-hidden className="h-screen" />

      <div className="relative z-10 bg-gray-200">
        <AboutSection />
        <Esg />
      </div>
    </div>
  );
}
