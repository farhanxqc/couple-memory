"use client";

import { useEffect, useState } from "react";
import { chapters, galleryItems } from "@/lib/gallery";
import { siteConfig } from "@/lib/site";

const start = new Date(`${siteConfig.relationshipStart}T00:00:00`);

export function StoryStats() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const elapsed = Date.now() - start.getTime();
    setDays(Math.max(0, Math.floor(elapsed / 86_400_000)));
  }, []);

  return (
    <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-6 text-center">
      <div>
        <p className="font-serif text-3xl leading-none sm:text-4xl">
          {days ?? "—"}
        </p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-ink/60">
          hari bersama
        </p>
      </div>

      <div>
        <p className="font-serif text-3xl leading-none sm:text-4xl">
          {galleryItems.length}
        </p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-ink/60">
          momen
        </p>
      </div>

      <div>
        <p className="font-serif text-3xl leading-none sm:text-4xl">
          {chapters.length}
        </p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-ink/60">
          bab
        </p>
      </div>
    </div>
  );
}
