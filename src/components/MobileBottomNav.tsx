import { NavLink, useLocation } from "react-router-dom";
import { Home, PlaySquare } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();
  const hidden = location.pathname.startsWith("/category/");

  if (hidden) return null;

  const linkBase =
    "flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium transition-colors";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-14 border-t border-white/10 bg-black/90 text-white backdrop-blur md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex h-full max-w-[480px] items-center justify-around">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            [
              linkBase,
              isActive ? "text-white" : "text-white/70 hover:text-white",
            ].join(" ")
          }
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/reels"
          className={({ isActive }) =>
            [
              linkBase,
              isActive ? "text-white" : "text-white/70 hover:text-white",
            ].join(" ")
          }
        >
          <PlaySquare className="h-5 w-5" />
          <span>Reels</span>
        </NavLink>
      </div>
    </nav>
  );
}

