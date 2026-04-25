import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { Reel } from "@/redux/slices/reelsSlice";
import { Button } from "@/components/ui/button";

type Props = {
  reel: Reel;
  index: number;
  active: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onBecameVisible: (index: number) => void;
  rootEl: HTMLElement | null;
};

export default function ReelItem({
  reel,
  index,
  active,
  isMuted,
  onToggleMute,
  onBecameVisible,
  rootEl,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({
      root: rootEl,
      threshold: [0, 0.5, 0.8, 1],
    }),
    [rootEl],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
        onBecameVisible(index);
      }
    }, observerOptions);

    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onBecameVisible, observerOptions]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!active) {
      v.pause();
      return;
    }

    const playIfPossible = async () => {
      try {
        await v.play();
      } catch {
        // Autoplay may be blocked when unmuted; user can tap the mute button.
      }
    };

    playIfPossible();
  }, [active, isMuted]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black"
      aria-label={reel.title}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          src={reel.videoUrl}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsReady(true)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
        />
      </div>

      {/* Loading */}
      {!isReady && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex items-center gap-3 text-white/90">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-sm">Loading…</span>
          </div>
        </div>
      )}

      {/* Buffering indicator (optional) */}
      {isReady && isBuffering && (
        <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
          Buffering…
        </div>
      )}

      {/* Dark gradient for readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[75%] text-white">
            <h2 className="text-lg sm:text-xl font-semibold leading-snug">{reel.title}</h2>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{reel.description}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={onToggleMute}
              className="h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>

            {/* Optional like button placeholder */}
            <div className="h-11 w-11 rounded-full bg-white/5 border border-white/10" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

