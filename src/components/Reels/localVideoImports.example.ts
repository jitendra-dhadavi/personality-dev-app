/**
 * Example: importing videos from `src/assets/videos/` (bundled by Vite).
 *
 * If you prefer `/public/videos`, you DON'T need this—just reference `/videos/*.mp4`
 * directly in `reelsData.json` like this project currently does.
 */

// Put files here: `src/assets/videos/reel-1.mp4`, etc.
const videoModules = import.meta.glob<string>("../../assets/videos/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
});

export const localVideoUrls = Object.values(videoModules);

