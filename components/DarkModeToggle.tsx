// components/DarkModeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Don't render until after hydration

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${theme === "dark" ? "text-white" : "text-[#5F6368]"}`}
    >
      {theme === "light" ? <FaMoon size={30} /> : <IoSunnyOutline size={30} />}
    </button>
  );
}
