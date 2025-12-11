"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main
      className="
        min-h-screen 
        text-white
        bg-gradient-to-br
        from-blue-200 via-white to-blue-100
        dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]
      "
    >
      {/* ⭐ GLOBAL HEADER */}
      <header
        className="
          w-full px-6 py-4 
          flex justify-between items-center 
          bg-white/30 dark:bg-white/10 
          backdrop-blur-md shadow-md border-b border-white/20
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-xl sm:text-2xl 
            font-extrabold tracking-wide 
            text-slate-900 dark:text-white
          "
        >
          <span className="text-indigo-600 dark:text-indigo-400">AI</span>{" "}
          Fitness Coach
        </Link>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              p-2 rounded-full 
              bg-white/40 hover:bg-white/60 
              dark:bg-white/20 dark:hover:bg-white/30 
              transition
            "
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-300" />
            ) : (
              <Moon size={20} className="text-slate-800" />
            )}
          </button>
        )}
      </header>

      {/* ⭐ PAGE CONTENT */}
      <div
        className="
          flex items-center justify-center 
          px-6 sm:px-10 py-12 sm:py-20
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl text-center space-y-10"
        >
          {/* Title */}
          <motion.h1
            className="
              text-4xl sm:text-5xl md:text-6xl 
              font-extrabold 
              leading-tight 
              text-slate-900 dark:text-white
            "
          >
            Transform Your Body.
            <span className="text-indigo-600 dark:text-indigo-400 block">
              Transform Your Life.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <p
            className="
              text-base sm:text-lg md:text-xl 
              text-slate-700 dark:text-gray-300 
              max-w-2xl mx-auto 
              px-2
            "
          >
            Welcome to <strong>AI Fitness Coach</strong> — your personal
            AI-powered trainer. Customized workouts, smart diet plans, and
            motivational guidance tailored just for you.
          </p>

          {/* Motivational Quote */}
          <motion.p
            className="
              text-lg sm:text-xl 
              italic font-semibold 
              text-indigo-600 dark:text-indigo-300
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            “The body achieves what the mind believes.”
          </motion.p>

          {/* CTA Buttons */}
          <div
            className="
              flex flex-col sm:flex-row 
              items-center justify-center 
              gap-4 sm:gap-6 mt-6
            "
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <button
                className="
                  w-full 
                  px-8 py-3 
                  bg-indigo-600 hover:bg-indigo-700 
                  text-white text-lg 
                  rounded-2xl shadow-xl transition
                "
              >
                Get Started
              </button>
            </Link>

            <Link href="/login" className="w-full sm:w-auto">
              <button
                className="
                  w-full 
                  px-8 py-3 
                  bg-white text-indigo-700 
                  text-lg rounded-2xl shadow-xl 
                  hover:bg-gray-200 transition
                "
              >
                Login
              </button>
            </Link>
          </div>

          {/* FEATURES SECTION */}
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              gap-6 sm:gap-8 
              mt-16 px-4
            "
          >
            <FeatureCard
              title="🏋️ Smart Workouts"
              desc="AI-tailored weekly workouts based on your strength, goals, and progress."
            />
            <FeatureCard
              title="🥗 Personalized Diets"
              desc="Meal plans crafted around your preferences, goals, and macros."
            />
            <FeatureCard
              title="🔥 Daily Motivation"
              desc="Stay inspired with AI-generated motivational quotes and insights."
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* ⭐ Feature Card Component */
function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        p-6 
        bg-white/60 dark:bg-white/10 
        backdrop-blur-xl 
        rounded-2xl shadow-lg 
        text-slate-800 dark:text-gray-300
        hover:scale-[1.03] transition 
      "
    >
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">
        {title}
      </h3>
      <p className="text-sm sm:text-base">{desc}</p>
    </div>
  );
}
