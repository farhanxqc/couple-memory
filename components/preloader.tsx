"use client";

import { useEffect, useState } from "react";

// Brief branded intro. Skipped once per session so navigation stays snappy.
export function Preloader() {
  const [hidden, setHidden] = useState(true);
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("preloader-seen")) return;

    setSeen(false);
    setHidden(false);

    const timer = setTimeout(() => {
      sessionStorage.setItem("preloader-seen", "1");
      setHidden(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (seen) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink text-cream transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="animate-pulse font-serif text-4xl tracking-[0.14em] sm:text-5xl">
        A <span className="text-clay">&</span> F
      </p>
    </div>
  );
}
