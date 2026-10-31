"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Music2,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const GESTURES = ["pointerdown", "keydown", "touchstart"] as const;
const tracks = siteConfig.music.tracks;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = String(total % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const gestureHandler = useRef<(() => void) | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const track = tracks[trackIndex];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const stopGestures = useCallback(() => {
    const handler = gestureHandler.current;
    if (handler) {
      GESTURES.forEach((event) => window.removeEventListener(event, handler));
      gestureHandler.current = null;
    }
    setNeedsGesture(false);
  }, []);

  // Attempt unmuted autoplay; browsers may reject until the first gesture.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    audio
      .play()
      .then(() => stopGestures())
      .catch(() => {
        setNeedsGesture(true);
      });

    function onGesture() {
      const element = audioRef.current;
      if (!element || !gestureHandler.current) return;
      element
        .play()
        .then(() => stopGestures())
        .catch(() => {
          // Keep waiting for a gesture the browser accepts.
        });
    }

    gestureHandler.current = onGesture;
    GESTURES.forEach((event) =>
      window.addEventListener(event, onGesture, { passive: true })
    );

    return () => {
      const handler = gestureHandler.current;
      if (handler) {
        GESTURES.forEach((event) => window.removeEventListener(event, handler));
      }
      audio.pause();
    };
  }, [stopGestures]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => stopGestures()).catch(() => {});
    } else {
      audio.pause();
    }
  };

  const nextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = !audio.paused;
    setTrackIndex((value) => (value + 1) % tracks.length);
    setCurrent(0);
    setDuration(0);
    if (wasPlaying || !audio.paused) {
      requestAnimationFrame(() => {
        audio.play().catch(() => {});
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        key={track.src}
        src={track.src}
        preload="metadata"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {expanded && (
          <div
            role="group"
            aria-label="Pemutar musik"
            className="w-[calc(100vw-2rem)] rounded-3xl bg-ink/95 p-5 text-cream shadow-soft backdrop-blur sm:w-80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.24em] text-cream/50">
                  Now playing
                </p>
                <p className="mt-1.5 font-serif text-xl leading-tight">
                  {track.title}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.08em] text-cream/60">
                  {track.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Tutup pemutar musik"
                className="-mr-1 -mt-1 rounded-full p-1.5 text-cream/60 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(event) => {
                const audio = audioRef.current;
                if (!audio) return;
                audio.currentTime = Number(event.target.value);
                setCurrent(audio.currentTime);
              }}
              aria-label="Posisi lagu"
              className="mt-4 w-full accent-clay"
            />

            <div className="flex items-center justify-between text-[10px] tabular-nums tracking-[0.08em] text-cream/50">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={muted}
                  aria-label={muted ? "Nyalakan suara" : "Bisukan suara"}
                  className="rounded-full p-2 text-cream/70 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                >
                  {muted ? (
                    <VolumeX aria-hidden className="h-4 w-4" />
                  ) : (
                    <Volume2 aria-hidden className="h-4 w-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label={`Ganti lagu, sekarang ${track.title}`}
                  className="rounded-full p-2 text-cream/70 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                >
                  <SkipForward aria-hidden className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                aria-label={playing ? "Jeda musik" : "Putar musik"}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {playing ? (
                  <Pause aria-hidden className="h-4 w-4 fill-ink" />
                ) : (
                  <Play aria-hidden className="ml-0.5 h-4 w-4 fill-ink" />
                )}
              </button>
            </div>
          </div>
        )}

        {needsGesture && !expanded && (
          <p className="hidden max-w-[11rem] rounded-full bg-ink/90 px-3 py-1.5 text-right text-[9px] uppercase leading-4 tracking-[0.16em] text-cream/80 backdrop-blur sm:block">
            Ketuk di mana saja untuk memutar musik
          </p>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-label={expanded ? "Tutup pemutar musik" : "Buka pemutar musik"}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-soft ring-1 ring-cream/15 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
          >
            <span
              className={`absolute inset-1.5 rounded-full bg-[radial-gradient(circle_at_center,#3a2c25_0%,#241b16_62%,#17110e_100%)] ${
                playing ? "animate-spin [animation-duration:6s]" : ""
              } ${reduceMotion ? "!animate-none" : ""}`}
            >
              <span className="absolute inset-0 rounded-full border border-cream/10" />
              <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
            </span>
            <Music2 aria-hidden className="relative h-4 w-4 text-cream/80" />
          </button>
        </div>
      </div>
    </>
  );
}
