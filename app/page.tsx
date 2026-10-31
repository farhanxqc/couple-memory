import { BentoGallery } from "@/components/bento-gallery";
import { FilmMode } from "@/components/film-mode";
import { Hero } from "@/components/hero";
import { Letter } from "@/components/letter";
import { Preloader } from "@/components/preloader";
import { ReadingProgress } from "@/components/reading-progress";
import { Reveal } from "@/components/motion/reveal";
import { MusicPlayer } from "@/components/music-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryParallax } from "@/components/story-parallax";
import { StoryStats } from "@/components/story-stats";
import { ThenNow } from "@/components/then-now";
import { galleryItems } from "@/lib/gallery";

export default function HomePage() {
  return (
    <main id="top" className="relative overflow-hidden">
      <Preloader />
      <ReadingProgress />
      <SiteHeader />
      <Hero />

      <section
        id="cerita"
        aria-labelledby="cerita-title"
        className="px-5 py-20 sm:px-8 sm:py-28"
      >
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-clay">
            Prolog
          </p>

          <h2
            id="cerita-title"
            className="mt-5 text-balance font-serif text-4xl leading-[1.05] sm:text-6xl"
          >
            Bukan tentang tujuan, tapi tentang{" "}
            <em className="text-clay">siapa</em> di samping kita.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
            Kami tidak menyimpan semua hal. Hanya momen yang membuat waktu
            terasa berhenti.
          </p>

          <StoryStats />
        </Reveal>
      </section>

      <section
        id="galeri"
        aria-labelledby="galeri-title"
        className="px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-clay">
                The Archive
              </p>
              <h2
                id="galeri-title"
                className="mt-4 font-serif text-4xl leading-none sm:text-5xl"
              >
                Potongan cerita kita.
              </h2>
            </div>

            <p className="max-w-xs text-xs leading-6 text-ink/70 sm:text-right">
              {galleryItems.length} bingkai yang kami pilih dari ribuan momen
              biasa.
            </p>
          </Reveal>

          <BentoGallery />
        </div>
      </section>

      <StoryParallax />
      <ThenNow />
      <Letter />
      <MusicPlayer />
      <SiteFooter />
    </main>
  );
}
