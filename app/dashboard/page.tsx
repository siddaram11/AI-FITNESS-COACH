"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlanForm, { UserInput } from "@/components/PlanForm";
import MotivationQuote from "@/components/MotivationQuote";
import { usePlanStore } from "@/store/planStore";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const setPlan = usePlanStore((s) => s.setPlan);
  const router = useRouter();

  // ----------------------------------------------------------------
  // ⭐ Handle Plan Generation + Store User Inputs + Store Plan
  // ----------------------------------------------------------------
  const handleGenerate = async (formData: UserInput) => {
    try {
      setLoading(true);

      // logged in user info from localStorage
      const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email || null, // send user email
          formData: formData,            // send user inputs
        }),
      });

      if (!res.ok) throw new Error("Failed to generate plan");

      const json = await res.json();

      // ⭐ Save plan in Zustand
      setPlan(json.plan);

      // ⭐ Save everything in localStorage
      localStorage.setItem(
        "generatedPlan",
        JSON.stringify({
          user: formData,
          plan: json.plan,
        })
      );

      // Go to plan viewer page
      router.push("/plan");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // ----------------------------------------------------------------
  // UI
  // ----------------------------------------------------------------
  return (
    <main
      className="
        min-h-screen pt-20
        bg-gradient-to-br 
        from-slate-100 via-white to-slate-200 
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        text-slate-900 dark:text-white
      "
    >
      {/* GLOBAL HEADER */}
      <Header />

      <div className="container max-w-5xl mx-auto py-12 px-4">
        {/* PAGE TITLE */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💪 AI Fitness Coach
            <span className="block w-24 h-1 mt-2 bg-emerald-500 rounded-full"></span>
          </motion.h1>

          <div className="hidden md:block">
            <MotivationQuote />
          </div>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          className="
            max-w-2xl mx-auto 
            backdrop-blur-xl 
            bg-white/40 dark:bg-slate-900/40 
            border border-slate-300/50 dark:border-white/10 
            shadow-xl p-8 rounded-3xl
          "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Your Personalized AI Workout & Diet Plan
          </h2>

          <p className="text-center text-slate-600 dark:text-slate-300 text-sm mb-6">
            Answer a few questions and let AI build your fitness plan!
          </p>

          {/* FORM COMPONENT */}
          <PlanForm onGenerate={handleGenerate} loading={loading} />
        </motion.div>

        {/* QUOTE MOBILE VIEW */}
        <div className="mt-10 md:hidden flex justify-center">
          <MotivationQuote />
        </div>
      </div>
    </main>
  );
  
}
