"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilmMode } from "@/components/film-mode";
import { blurPlaceholders } from "@/lib/blur-placeholders";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <motion.div
        style={reduce ? undefined : { y: imageY }}
        className="absolute inset-[-12%] will-change-transform"
      >
        <motion.div
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="relative h-full w-full"
        >
          <Image
            src="/photos/hero.jpg"
            alt="Pasangan berjalan di tepi pantai saat senja"
            fill
            priority
            sizes="100vw"
            placeholder={blurPlaceholders["hero"] ? "blur" : undefined}
            blurDataURL={blurPlaceholders["hero"]}
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#17110e]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17110e] via-[#17110e]/40 to-[#17110e]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#17110e]/50 via-transparent to-transparent" />

      <motion.div
        data-hero
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full px-5 pb-20 pt-28 sm:px-8 sm:pb-24"
      >
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={container}
          className="mx-auto max-w-6xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.32em] text-cream/65 sm:text-xs"
          >
            Our Story · 2026
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-5xl font-serif text-[clamp(3.2rem,10vw,8rem)] leading-[0.88] tracking-[-0.02em] text-cream"
          >
            Setiap momen,
            <br />
            <em className="font-light text-sand">tersimpan selamanya.</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-sm leading-7 text-cream/70 sm:text-base"
          >
            Sebuah arsip kecil tentang perjalanan, tawa, dan rumah yang kita
            temukan satu sama lain.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          >
            <Button asChild variant="light" size="lg">
              <a href="#galeri">Buka Galeri</a>
            </Button>

            <FilmMode />

            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/60">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-clay" />
              Ubud, Bali · 2026
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-7 z-20 flex justify-center">
        <motion.a
          href="#cerita"
          aria-label="Gulir ke cerita"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-cream/55 transition-colors hover:text-cream"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}
