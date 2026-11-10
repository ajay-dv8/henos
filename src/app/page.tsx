import AboutSection from "@/components/about/aboutsection";
import ContactSection from "@/components/contact-section/contact";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import Esg from "@/components/esg/esg";
import Hero from "@/components/hero/hero";
import WhyUs from "@/components/why-us/why-us";
import Newsletter from "@/components/contact-section/newsletter";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* hero is position:fixed; h-dvh tracks the visible device height on
          mobile/tablet (no cut-off under the URL bar) and equals h-screen
          on desktop, so the look is unchanged there */}
      <div aria-hidden className="h-dvh" />

      <div className="relative z-10 bg-linear-to-bl from-green-50 to-green-100">
        <AboutSection />
        <Esg />
        <WhyUs />

        {/* woven-light particles behind the contact section */}
        <section className="relative z-10 overflow-hidden bg-black">
          <WovenCanvas />
          <div className="relative z-10">
            <ContactSection />
          </div>
        </section>
        <Newsletter />
      </div>
    </div>
  );
}
