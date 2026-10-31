"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ShareButton } from "@/components/share-button";
import {
  chapters,
  galleryItems,
  type GalleryItem,
  type GallerySpan,
} from "@/lib/gallery";
import { blurPlaceholders } from "@/lib/blur-placeholders";

const spanClasses: Record<GallerySpan, string> = {
  hero: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  standard: "col-span-1 row-span-1",
};

const sizesBySpan: Record<GallerySpan, string> = {
  hero: "(max-width: 767px) 100vw, 50vw",
  wide: "(max-width: 767px) 100vw, 50vw",
  tall: "(max-width: 767px) 50vw, 25vw",
  standard: "(max-width: 767px) 50vw, 25vw",
};

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  delay: number;
  onOpen: (index: number) => void;
};

function GalleryCard({ item, index, delay, onOpen }: GalleryCardProps) {
  const placeholder = blurPlaceholders[item.src.replace("/photos/", "").replace(".jpg", "")];

  return (
    <Reveal delay={delay} className={spanClasses[item.span]}>
      <figure className="group relative h-full overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/5">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizesBySpan[item.span]}
          placeholder={placeholder ? "blur" : undefined}
          blurDataURL={placeholder}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 sm:opacity-60 sm:group-hover:opacity-90" />

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:translate-y-2 sm:p-5 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <p className="font-serif text-lg leading-tight text-cream sm:text-xl">
            {item.caption}
          </p>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-cream/65">
            {item.date}
          </p>
        </figcaption>

        <button
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`Buka foto: ${item.caption}`}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cream"
        />
      </figure>
    </Reveal>
  );
}

export function BentoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const current = openIndex === null ? null : galleryItems[openIndex];

  const close = useCallback(() => setOpenIndex(null), []);

  const next = useCallback(() => {
    setOpenIndex((index) =>
      index === null ? 0 : (index + 1) % galleryItems.length
    );
  }, []);

  const previous = useCallback(() => {
    setOpenIndex((index) =>
      index === null
        ? galleryItems.length - 1
        : (index - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const openRandom = () => {
    setOpenIndex(Math.floor(Math.random() * galleryItems.length));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
    }

    if (openIndex === null && dialog.open) {
      dialog.close();
    }

    document.body.style.overflow = openIndex !== null ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, next, previous]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.24em] text-ink/60">
          {galleryItems.length} bingkai · {chapters.length} bab
        </p>

        <button
          type="button"
          onClick={openRandom}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-clay hover:text-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
        >
          <Shuffle aria-hidden className="h-3.5 w-3.5" />
          Kenangan acak
        </button>
      </div>

      <div className="mb-8 flex justify-end">
        <ShareButton />
      </div>

      <nav
        aria-label="Bab galeri"
        className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-ink/10 py-4 sm:mb-14"
      >
        {chapters.map((chapter) => (
          <a
            key={chapter.number}
            href={`#bab-${chapter.number}`}
            className="text-[9px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          >
            {String(chapter.number).padStart(2, "0")} · {chapter.title}
          </a>
        ))}
      </nav>

      <div className="space-y-16 sm:space-y-24">
        {chapters.map((chapter) => (
          <section
            key={chapter.number}
            id={`bab-${chapter.number}`}
            aria-labelledby={`bab-${chapter.number}-title`}
            className="scroll-mt-8"
          >
            <Reveal className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-clay">
                Bab {String(chapter.number).padStart(2, "0")}
              </p>

              <div>
                <h3
                  id={`bab-${chapter.number}-title`}
                  className="font-serif text-3xl leading-tight sm:text-4xl"
                >
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70">
                  {chapter.intro}
                </p>
              </div>
            </Reveal>

            <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[14rem]">
              {chapter.items.map((item, itemIndex) => (
                <GalleryCard
                  key={item.src}
                  item={item}
                  index={galleryItems.indexOf(item)}
                  delay={Math.min(itemIndex * 0.06, 0.3)}
                  onOpen={(index) => setOpenIndex(index)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-caption"
        onClose={close}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(1100px,94vw)] max-w-none bg-transparent p-0 text-cream"
      >
        {openIndex !== null && current && (
          <div className="relative">
            <div
              className="relative h-[66vh] w-full overflow-hidden rounded-2xl bg-ink/40 sm:h-[74vh]"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const distance =
                  event.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(distance) < 50) return;
                if (distance < 0) next();
                else previous();
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 94vw, 1100px"
                placeholder={
                  blurPlaceholders[current.src.replace("/photos/", "").replace(".jpg", "")]
                    ? "blur"
                    : undefined
                }
                blurDataURL={
                  blurPlaceholders[current.src.replace("/photos/", "").replace(".jpg", "")]
                }
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-cream/50">
                  Bab {String(current.chapter).padStart(2, "0")} ·{" "}
                  {current.chapterTitle}
                </p>
                <p
                  id="lightbox-caption"
                  className="mt-1.5 font-serif text-2xl text-cream"
                >
                  {current.caption}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/55">
                  {current.date}
                </p>
              </div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/55">
                {openIndex + 1} / {galleryItems.length}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Tutup galeri"
              className="absolute right-3 top-3 z-20 rounded-full bg-ink/60 p-2.5 text-cream backdrop-blur transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={previous}
              aria-label="Foto sebelumnya"
              className="absolute -left-3 top-1/3 z-20 rounded-full bg-ink/60 p-2.5 text-cream backdrop-blur transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:-left-14"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Foto berikutnya"
              className="absolute -right-3 top-1/3 z-20 rounded-full bg-ink/60 p-2.5 text-cream backdrop-blur transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:-right-14"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
