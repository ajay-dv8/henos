import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/navbar";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { ZiyarnWidget } from "@/components/ziyarn-widget";
import Footer from "@/components/footer";

// system font stack (SF Pro on Apple) is set in globals.css
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henos Energy",
  description: "Henos Energy is a leading provider of sustainable energy solutions, committed to delivering innovative and efficient energy systems for a greener future.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <SiteNavbar />
          {children}
          <Footer />  
          <ZiyarnWidget
            slug="Henos"
            secret={process.env.ZIYARN_EMBED_SECRET!}
            variant="sleek"
            data-title="Chat with us"
          />
        </LenisProvider>
      </body>
    </html>
  );
}
