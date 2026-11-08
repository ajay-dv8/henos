import ContactSection from "@/components/contact-section/contact";
import { WovenCanvas } from "@/components/ui/woven-light-hero";

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* interactive woven-light particles as the page background */}
      <WovenCanvas />
      <div className="relative z-10">
        <ContactSection />
      </div>
    </div>
  );
}
