import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReelItem from "@/components/Reels/ReelItem.jsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveReel, setReels } from "@/redux/slices/reelsSlice";
import reelsData from "@/data/reelsData.json";

export default function ReelsPage() {
  const dispatch = useAppDispatch();
  const reels = useAppSelector((s) => s.reels.items);
  const activeIndex = useAppSelector((s) => s.reels.activeIndex);

  const scrollerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const data = useMemo(() => reelsData, []);

  // CRITICAL: prevent body scroll so we don't get double scrollbars.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "auto";
    };
  }, []);

  useEffect(() => {
    if (reels.length === 0) dispatch(setReels(data));
  }, [dispatch, data, reels.length]);

  const onBecameVisible = useCallback(
    (index) => {
      if (index !== activeIndex) dispatch(setActiveReel(index));
    },
    [activeIndex, dispatch],
  );

  const onToggleMute = useCallback(() => setIsMuted((m) => !m), []);

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-black text-white">
      {/* Single scroll container (the ONLY scrollable element) */}
      <div className="relative h-screen w-full max-w-[380px] bg-black overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl">
        {/* Overlay top bar (does NOT affect layout height) */}
        <div className="absolute left-0 right-0 top-0 z-20 px-3 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-white backdrop-blur border border-white/10 hover:bg-black/55 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <div className="rounded-full bg-black/40 px-3 py-2 text-sm text-white/90 backdrop-blur border border-white/10">
              Reels
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
        >
          {reels.map((reel, idx) => (
            <ReelItem
              key={reel.id}
              reel={reel}
              index={idx}
              active={idx === activeIndex}
              isMuted={isMuted}
              onToggleMute={onToggleMute}
              onBecameVisible={onBecameVisible}
              rootEl={scrollerRef.current}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

