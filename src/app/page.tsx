import AboutSection from "@/components/about/aboutsection";
import ContactSection from "@/components/contact-section/contact";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import Esg from "@/components/esg/esg";
import Hero from "@/components/hero/hero";
import WhyUs from "@/components/why-us/why-us";
import Newsletter from "@/components/contact-section/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* hero is position:fixed, so this spacer is the first viewport it occupies */}
      <div aria-hidden className="h-screen" />

      <div className="relative z-10 bg-gray-200">
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
        <Footer />
      </div>
    </div>
  );
}
