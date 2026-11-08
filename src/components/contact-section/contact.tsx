"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT_INFO = {
  email: "info@henosenergy.com",
  phones: [
    { display: "030 394 4116", tel: "+233303944116" },
    { display: "059 414 8515", tel: "+233594148515" },
  ],
  location: {
    label: "Lakeside Estates, Community 8",
    mapsUrl: "https://maps.app.goo.gl/15JrzCZtf8Rvae28A",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.919153775841!2d-0.12559071583671425!3d5.72478501713977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf83dcfec5c717%3A0xe7df5dfc6b62911a!2sHENOS%20ENERGY%20LIMITED%20COMPANY!5e0!3m2!1sen!2sgh!4v1794109085054!5m2!1sen!2sgh",
  },
} as const;

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "LinkedIn",
    href: "https://gh.linkedin.com/company/henos-energy-limited-company",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "X",
    href: "https://x.com/henosenergy",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/henosenergy/",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.58.01 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/henosenergy/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

// link whose matching icon slides in from the left on hover
function InfoLink({
  href,
  icon: Icon,
  external,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex w-fit items-center text-lg text-white"
    >
      <span className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:opacity-100">
        <Icon className="size-4 shrink-0 text-white/60" />
      </span>
      <span className="text-lg">{children}</span>
    </a>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // no backend yet — open the visitor's mail client with the message prefilled
    const q = new URLSearchParams({
      subject: `Contact request from ${form.name || "website visitor"}`,
      body: `${form.message}\n\n— ${form.name} (${form.email})`,
    });
    window.location.href = `mailto:${CONTACT_INFO.email}?${q}`;
  };

  const input =
    "w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none";

  const card =
    "rounded-md border border-white/10 bg-white/10 p-6 backdrop-blur-xs";

  return (
    <div className="grid min-h-screen w-full grid-cols-1 items-stretch gap-12 px-6 py-16 md:px-10 lg:grid-cols-2 lg:gap-8">
      {/* left: heading + info cards */}
      <div className="flex flex-col items-start">
        <h2 className="text-7xl font-medium tracking-tight text-white md:text-9xl">
          Contact
        </h2>

        <div className="mt-20 flex w-full max-w-md flex-col gap-4 lg:mt-auto">
          <div className={card}>
            <h3 className="text-2xl font-medium text-white">Get in touch</h3>
            <p className="mt-4 text-sm text-white/60">e-mail us</p>
            <InfoLink href={`mailto:${CONTACT_INFO.email}`} icon={Mail}>
              {CONTACT_INFO.email}
            </InfoLink>
            <p className="mt-3 text-sm text-white/60">Call us</p>
            {CONTACT_INFO.phones.map((p) => (
              <InfoLink key={p.tel} href={`tel:${p.tel}`} icon={Phone}>
                {p.display}
              </InfoLink>
            ))}
            <p className="mt-3 text-sm text-white/60">Locate us at</p>
            <InfoLink
              href={CONTACT_INFO.location.mapsUrl}
              icon={MapPin}
              external
            >
              {CONTACT_INFO.location.label}
            </InfoLink>
          </div>

          <div className={card}>
            <h3 className="text-2xl font-medium text-white">Socials</h3>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur-md">
            <iframe
              src={CONTACT_INFO.location.embedUrl}
              title="Henos Energy location map"
              className="h-64 w-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div> */}
        </div>
      </div>

      {/* right: form panel */}
      <div className={`${card} flex flex-col p-4 md:p-10`}>
        {/* logo stand-in */}
        <p className="text-left text-sm font-medium tracking-[0.35em] text-white/70">
          HENOS ENERGY
        </p>
        {/* <h3 className="mt-4 text-left text-3xl font-medium text-white md:text-3xl">
          Send us a message
        </h3> */}
        <p className="mt-4 max-w-3xl text-left text-4xl text-white/80">
          <span className="text-white">Tell us what you need and we&apos;ll get back to you.</span> Reliable energy starts with a conversation. 
        </p>

        <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">
              Name <span className="text-red-400">*</span>
            </span>
            <input
              className={input}
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">
              Phone <span className="text-red-400">*</span>
            </span>
            <input
              className={input}
              type="tel"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">
              Email <span className="text-red-400">*</span>
            </span>
            <input
              className={input}
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">
              Message <span className="text-red-400">*</span>
            </span>
            <textarea
              className={`${input} min-h-40`}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </label>

          <button className="mt-2 self-center rounded-md border-2 border-white/20 bg-white/10 px-10 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
