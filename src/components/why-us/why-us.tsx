"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const texts = [
  "Count on dependable LPG supply and responsive service to keep your home or business running without unnecessary interruptions.",
  "From cylinder handling to delivery, we put safety and care at the centre of every step, giving you greater confidence in your energy supply.",
  "Get the LPG you need without the hassle. With convenient delivery and cylinder exchange services, getting your next refill is easier.",
];

/** One centered text layer; fades in/out around its scroll segment. */
function TextLayer({
  text,
  progress,
  index,
  total,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const seg = 1 / total;
  // each text fades out fully BEFORE the step boundary, and the next one
  // only fades in after a short quiet gap — so the empty moment reads clearly
  const gap = seg * 0.12; // quiet moment around each boundary
  const win = seg * 0.15; // fade duration

  // first text starts visible; last one holds to the end
  let range: number[];
  let output: number[];
  if (total === 1) {
    range = [0, 1];
    output = [1, 1];
  } else if (index === 0) {
    range = [(index + 1) * seg - gap - win, (index + 1) * seg - gap];
    output = [1, 0];
  } else if (index === total - 1) {
    range = [index * seg + gap, index * seg + gap + win];
    output = [0, 1];
  } else {
    const inA = index * seg + gap;
    const outB = (index + 1) * seg - gap;
    range = [inA, inA + win, outB - win, outB];
    output = [0, 1, 1, 0];
  }

  const opacity = useTransform(progress, range, output);
  // blur fade: text softens into or out of view instead of a plain fade
  const blur = useTransform(progress, range, output.map((o) => (o === 1 ? 0 : 14)));
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, filter }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <p className="max-w-4xl px-6 text-center text-2xl md:text-4xl leading-relaxed text-white">
        {text}
      </p>
    </motion.div>
  );
}

/** One segment of the bottom loader; fills while its step is active. */
function StepFill({
  progress,
  index,
  steps,
}: {
  progress: MotionValue<number>;
  index: number;
  steps: number;
}) {
  // clamped: 0 before its step, 1→0..1 during, holds 1 after
  const scaleX = useTransform(
    progress,
    [index / steps, (index + 1) / steps],
    [0, 1],
  );

  return (
    <div className="h-0.5 flex-1 overflow-hidden rounded bg-white/30">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left rounded bg-white"
      />
    </div>
  );
}

/** Horizontal loader: one filling line per text step. */
function StepLoader({
  progress,
  steps,
}: {
  progress: MotionValue<number>;
  steps: number;
}) {
  return (
    <div className="absolute bottom-8 left-1/2 flex w-72 -translate-x-1/2 gap-2">
      {Array.from({ length: steps }, (_, i) => (
        <StepFill key={i} progress={progress} index={i} steps={steps} />
      ))}
    </div>
  );
}

export default function WhyUs() {
  const track = useRef<HTMLDivElement>(null);
  // progress across the whole scroll track
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // the image zooms in slowly across the whole section
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <div ref={track} className="relative h-[300vh]">
      {/* sticky viewport: image + centered texts + loader */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src="/images/wu.webp"
          alt=""
          style={{ scale: imgScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* centered text layers, one on top of the other */}
        <div className="absolute inset-0 pointer-events-none">
          {texts.map((text, i) => (
            <TextLayer
              key={i}
              text={text}
              progress={scrollYProgress}
              index={i}
              total={texts.length}
            />
          ))}
        </div>

        {/* horizontal loader: one filling line per step */}
        <StepLoader progress={scrollYProgress} steps={texts.length} />
      </div>
    </div>
  );
}
