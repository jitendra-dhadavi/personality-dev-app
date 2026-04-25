import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Heart, Play, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ReelItem({
  reel,
  index,
  active,
  isMuted,
  onToggleMute,
  onBecameVisible,
  rootEl,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [liked, setLiked] = useState(false);

  const observerOptions = useMemo(
    () => ({
      root: rootEl,
      threshold: [0, 0.5, 0.7, 0.8, 1],
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
      } else {
        // Pause any video that's not sufficiently visible
        videoRef.current?.pause();
      }
    }, observerOptions);

    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onBecameVisible, observerOptions]);

  const tryPlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      setAutoplayFailed(false);
      await v.play();
    } catch {
      setAutoplayFailed(true);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!active) {
      v.pause();
      setAutoplayFailed(false);
      return;
    }

    void tryPlay();
  }, [active, isMuted, tryPlay]);

  return (
    <section ref={containerRef} className="relative h-screen w-full snap-start bg-black overflow-hidden">
      {/* Video (mobile style: full height, cover) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={reel.videoUrl}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsReady(true)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
      />

      {/* Loading */}
      {!isReady && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex items-center gap-3 text-white/90">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-sm">Loading…</span>
          </div>
        </div>
      )}

      {/* Buffering */}
      {isReady && isBuffering && (
        <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
          Buffering…
        </div>
      )}

      {/* Autoplay fallback */}
      {isReady && active && autoplayFailed && (
        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            onClick={tryPlay}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-white backdrop-blur border border-white/15 hover:bg-white/20 transition"
            aria-label="Play video"
          >
            <Play className="h-5 w-5" />
            <span className="text-sm font-medium">Tap to play</span>
          </button>
        </div>
      )}

      {/* Bottom gradient + text */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[78%]">
            <h2 className="text-base font-semibold leading-snug text-white drop-shadow">{reel.title}</h2>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{reel.description}</p>
          </div>

          {/* Right-side controls */}
          <div className="flex flex-col items-center gap-2 pb-1">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => setLiked((v) => !v)}
              className="h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart className={liked ? "fill-white" : ""} />
            </Button>

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
          </div>
        </div>
      </div>
    </section>
  );
}

