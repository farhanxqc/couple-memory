"use client";

import Image from "next/image";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";
import { blurPlaceholders } from "@/lib/blur-placeholders";

export function ThenNow() {
  const [position, setPosition] = useState(50);

  return (
    <section
      aria-labelledby="then-now-title"
      className="px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-clay">
              Then & Now
            </p>
            <h2
              id="then-now-title"
              className="mt-4 text-balance font-serif text-4xl leading-none sm:text-5xl"
            >
              Dulu dan sekarang, tetap kita.
            </h2>
          </div>

          <p className="max-w-xs text-xs leading-6 text-ink/70 sm:text-right">
            Geser garis untuk melihat seberapa jauh kita sudah berjalan.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl bg-sand ring-1 ring-ink/5 focus-within:ring-2 focus-within:ring-clay focus-within:ring-offset-2">
            <Image
              src={siteConfig.thenNow.after.src}
              alt="Momen sekarang pasangan"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              placeholder={blurPlaceholders["gallery-01"] ? "blur" : undefined}
              blurDataURL={blurPlaceholders["gallery-01"]}
              className="object-cover"
            />

            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={siteConfig.thenNow.before.src}
                alt="Momen dulu pasangan"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                placeholder={blurPlaceholders["gallery-27"] ? "blur" : undefined}
                blurDataURL={blurPlaceholders["gallery-27"]}
                className="object-cover"
              />
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-px bg-cream/90"
              style={{ left: `${position}%` }}
            >
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-soft">
                <MoveHorizontal className="h-4 w-4" />
              </span>
            </div>

            <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-ink/55 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-cream backdrop-blur sm:text-[9px]">
              Dulu · {siteConfig.thenNow.before.label}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-ink/55 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-cream backdrop-blur sm:text-[9px]">
              Sekarang · {siteConfig.thenNow.after.label}
            </span>

            <input
              type="range"
              min={0}
              max={100}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label="Geser untuk membandingkan foto dulu dan sekarang"
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
