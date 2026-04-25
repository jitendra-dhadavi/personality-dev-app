// Top navigation bar with branding and dark mode toggle
import { Link, NavLink } from "react-router-dom";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/slices/themeSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition-bounce">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base sm:text-lg text-foreground">Personality Development App</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground -mt-0.5">Skills • Growth • Reels</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-xl text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-secondary text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                ].join(" ")
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/reels"
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-xl text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-secondary text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                ].join(" ")
              }
            >
              Reels
            </NavLink>
          </div>
        </div>

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
