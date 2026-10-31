import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { blurPlaceholders } from "@/lib/blur-placeholders";

export function StoryParallax() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 sm:py-40">
      <Parallax
        className="absolute inset-x-0 -bottom-24 -top-24"
        distance={70}
      >
        <Image
          src="/photos/story-09.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          placeholder={blurPlaceholders["story-09"] ? "blur" : undefined}
          blurDataURL={blurPlaceholders["story-09"]}
          className="object-contain object-center sm:object-cover opacity-40"
        />
      </Parallax>

      <div className="absolute inset-0 bg-ink/35" />

      <Reveal className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-cream/60">
          Interlude
        </p>

        <blockquote className="mt-6 text-balance font-serif text-3xl leading-snug text-cream sm:text-5xl">
          “Rumah bukan tempat. Rumah adalah{" "}
          <em className="text-sand">kamu</em>.”
        </blockquote>

        <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-cream/60">
          Bali · 2025
        </p>
      </Reveal>
    </section>
  );
}
