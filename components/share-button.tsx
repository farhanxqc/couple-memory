"use client";

import { useState } from "react";
import { Link2, Share2 } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: document.title,
      text: "Cerita kami — Agatha & Farhan",
      url,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(data);
        return;
      } catch {
        // User cancelled; fall through to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context); nothing else to try.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-clay hover:text-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
    >
      {copied ? (
        <Link2 aria-hidden className="h-3.5 w-3.5" />
      ) : (
        <Share2 aria-hidden className="h-3.5 w-3.5" />
      )}
      {copied ? "Tautan disalin" : "Bagikan kenangan"}
    </button>
  );
}
