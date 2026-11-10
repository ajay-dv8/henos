import ContactSection from "@/components/contact-section/contact";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import Newsletter from "@/components/contact-section/newsletter";

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black pt-8" >
      {/* interactive woven-light particles as the page background */}
      <WovenCanvas />
      <div className="relative z-10">
        <ContactSection />
        <Newsletter />
      </div>
    </div>
  );
}
