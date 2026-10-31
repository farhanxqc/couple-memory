import { Heart } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-12 sm:px-8">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="font-serif text-3xl">Agatha &amp; Farhan</p>

        <p className="max-w-md text-sm leading-7 text-ink/70">
          Terima kasih sudah menjadi bagian dari cerita yang tidak pernah
          selesai ini.
        </p>

        <a
          href="#top"
          className="text-[11px] uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-clay"
        >
          Kembali ke atas
        </a>

        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-ink/70">
          Dibuat dengan
          <Heart aria-hidden className="h-3 w-3 fill-clay text-clay" />
          2026
        </p>
      </Reveal>
    </footer>
  );
}
