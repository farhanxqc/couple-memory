"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { galleryItems } from "@/lib/gallery";
import { blurPlaceholders } from "@/lib/blur-placeholders";

const SLIDE_MS = 4500;

// Full-screen slideshow: photos drift while the music keeps playing.
export function FilmMode() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = galleryItems[index];

  const close = useCallback(() => setOpen(false), []);

  const next = useCallback(() => {
    setIndex((value) => (value + 1) % galleryItems.length);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || paused) return;
    const timer = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [open, paused, index, next]);

  const placeholder = blurPlaceholders[
    current.src.replace("/photos/", "").replace(".jpg", "")
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setPaused(false);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur transition-colors hover:border-cream hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <Play aria-hidden className="h-3.5 w-3.5 fill-current" />
        Putar cerita
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Slideshow cerita"
        onClose={close}
        className="m-0 h-full max-h-full w-full max-w-full bg-ink p-0 text-cream"
      >
        {open && (
          <div className="relative h-full w-full">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              priority
              placeholder={placeholder ? "blur" : undefined}
              blurDataURL={placeholder}
              className="animate-[film-kenburns_5s_ease-out_forwards] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.24em] text-cream/55">
                {index + 1} / {galleryItems.length} · {current.date}
              </p>
            </div>

            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                aria-label={paused ? "Lanjutkan slideshow" : "Jeda slideshow"}
                className="rounded-full bg-ink/60 p-2.5 text-cream backdrop-blur transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                {paused ? (
                  <Play aria-hidden className="h-5 w-5 fill-current" />
                ) : (
                  <Pause aria-hidden className="h-5 w-5" />
                )}
              </button>

              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Tutup slideshow"
                className="rounded-full bg-ink/60 p-2.5 text-cream backdrop-blur transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
