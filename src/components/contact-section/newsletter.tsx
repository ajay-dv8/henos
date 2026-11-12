"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // shortcut: no backend yet — wire this to an API/e-mail provider when it exists
    if (email.trim()) setJoined(true);
  };

  const input =
    "w-full rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none";

  return (
    <section className="px-3 md:px-6 py-16 md:py-20 bg-black w-full h-[80dvh] flex items-center justify-center">
      <div className="mx-auto max-w-6xl  p-8 md:p-12">
        <p className="text-sm text-center font-medium tracking-[0.35em] text-white/70">
          JOIN OUR NEWSLETTER
        </p>
        <h3 className=" text-3xl text-center font-medium tracking-tight text-white md:text-6xl my-6 md:my-12">
          Energy updates, straight to your inbox
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg md:text-2xl text-white/70">
          Occasional news on our projects and the grid. No spam — unsubscribe
          anytime.
        </p>

        {joined ? (
          <p
            role="status"
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-6 py-4 text-white"
          >
            <Check className="size-5 shrink-0 text-white/80" aria-hidden />
            You&apos;re on the list — we&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto flex max-w-md flex-col gap-3 mt-12"
          >
                <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
            <button
              type="submit"
              className="shrink-0 rounded-md border border-white/70 bg-green-50 px-8 py-2 font-semibold text-black transition-colors hover:bg-green-50/80"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
