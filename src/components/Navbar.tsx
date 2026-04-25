// Top navigation bar with branding and dark mode toggle
import { Link } from "react-router-dom";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/slices/themeSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition-bounce">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base sm:text-lg text-foreground">Elevate</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground -mt-0.5">Personality Development</span>
          </div>
        </Link>

        <button
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle dark mode"
          className="p-2.5 rounded-xl border border-border bg-card hover:bg-secondary hover:scale-105 transition-bounce"
        >
          {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
