"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  // ⭐ Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-xl bg-black/20 dark:bg-white/10 border-b border-white/10 px-6 py-4 flex justify-between items-center z-50">
      <Link href="/">
        <h1 className="text-xl font-bold text-white">AI Fitness Coach</h1>
      </Link>

      {/* Do NOT render theme toggle until mounted */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-300" />
          ) : (
            <Moon size={20} className="text-indigo-600" />
          )}
        </button>
      )}
    </header>
  );
}
