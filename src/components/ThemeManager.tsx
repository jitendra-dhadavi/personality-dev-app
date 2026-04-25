// Applies the current theme mode to the <html> element
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

const ThemeManager = () => {
  const mode = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  return null;
};

export default ThemeManager;
