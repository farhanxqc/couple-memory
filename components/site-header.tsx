export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-2xl tracking-[0.08em] text-cream"
        >
          A <span className="text-clay">&</span> F
        </a>

        <nav aria-label="Navigasi utama" className="flex items-center gap-6">
          <a
            href="#cerita"
            className="text-[10px] uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-cream"
          >
            Cerita
          </a>
          <a
            href="#galeri"
            className="text-[10px] uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-cream"
          >
            Galeri
          </a>
          <a
            href="#surat"
            className="text-[10px] uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-cream"
          >
            Surat
          </a>
        </nav>
      </div>
    </header>
  );
}
