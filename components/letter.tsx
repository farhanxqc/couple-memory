"use client";

import { useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export function Letter() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="surat"
      aria-labelledby="letter-title"
      className="px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-cream shadow-soft sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-cream/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-cream/10" />

            <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-clay/20 font-serif text-lg text-sand sm:right-10 sm:top-10">
              F
            </div>

            <p className="text-[10px] uppercase tracking-[0.32em] text-cream/55">
              A Letter
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h2
                  id="letter-title"
                  className="font-serif text-4xl leading-none sm:text-5xl"
                >
                  {siteConfig.letter.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-cream/70">
                  {siteConfig.letter.preview}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="letter-body"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {open ? (
                  <MailOpen aria-hidden className="h-4 w-4" />
                ) : (
                  <Mail aria-hidden className="h-4 w-4" />
                )}
                {open ? "Tutup surat" : "Buka surat"}
              </button>
            </div>

            <div
              id="letter-body"
              aria-hidden={!open}
              className={`grid transition-all duration-500 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-8 border-t border-cream/15 pt-8">
                  {siteConfig.letter.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-sm leading-8 text-cream/75 first:mt-0 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <p className="mt-8 font-serif text-2xl text-sand">
                    {siteConfig.letter.signature}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
