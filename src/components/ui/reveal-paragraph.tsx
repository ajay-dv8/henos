"use client";

import { cn } from "@/lib/utils";
import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const KEY_PREFIX_LENGTH = 3;

export type ScrollRevealParagraphProps = {
  paragraph: string;
  className?: string;
  per?: "line" | "word";
};

export default function ScrollRevealParagraph({
  paragraph,
  className = "",
  per = "word",
}: ScrollRevealParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  // segment by line
  const words = per === "word" ? paragraph.split(" ") : paragraph.split("\n");

  return (
    <p className={cn("w-full ", className)} ref={container}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

          return (
            <Word
              key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
              progress={scrollYProgress}
              range={[start, end]}
            >
              {word}
            </Word>
          );
      })}
    </p>
  );
}

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
};

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-2 inline-block">
      <span style={{ whiteSpace: "pre-line" }} className="text-foreground/20">
        {children}
      </span>
      <motion.span
        // TODO: put a text color variable here use cn()
        className="w-full absolute inset-0"
        style={{ opacity, whiteSpace: "pre-line" }}
      >
        {children}
      </motion.span>
    </span>
  );
};