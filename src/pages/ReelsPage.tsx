import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReelItem from "@/components/Reels/ReelItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveReel, setReels, type Reel } from "@/redux/slices/reelsSlice";
import reelsData from "@/data/reelsData.json";

const ReelsPage = () => {
  const dispatch = useAppDispatch();
  const reels = useAppSelector((s) => s.reels.items);
  const activeIndex = useAppSelector((s) => s.reels.activeIndex);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const data = useMemo(() => reelsData as Reel[], []);

  useEffect(() => {
    if (reels.length === 0) dispatch(setReels(data));
  }, [dispatch, data, reels.length]);

  const onBecameVisible = useCallback(
    (index: number) => {
      if (index !== activeIndex) dispatch(setActiveReel(index));
    },
    [activeIndex, dispatch],
  );

  const onToggleMute = useCallback(() => setIsMuted((m) => !m), []);

  return (
    <div className="h-[100svh] w-full bg-black text-white">
      {/* Top bar */}
      <div className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/55 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="rounded-full bg-black/40 px-3 py-2 text-sm text-white/90 backdrop-blur">
          Reels
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollerRef}
        className="h-[100svh] w-full overflow-y-scroll scroll-smooth snap-y snap-mandatory"
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
  );
};

export default ReelsPage;

