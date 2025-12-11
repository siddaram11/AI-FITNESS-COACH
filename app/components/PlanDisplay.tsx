"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export type Exercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
};

export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: Exercise[];
};

export type DietDay = {
  day: string;
  Breakfast: string;
  Lunch: string;
  Dinner: string;
  Snacks?: string;
};

export type PlanData = {
  workout: WorkoutDay[];
  diet: DietDay[];
  tips: string[];
};

type Props = {
  plan: PlanData | null;
};

export default function PlanDisplay({ plan }: Props) {
  const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");

  const [isSpeakingWorkout, setIsSpeakingWorkout] = useState(false);
  const [isSpeakingDiet, setIsSpeakingDiet] = useState(false);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  useEffect(() => {
    if (synth) synth.cancel();
    setIsSpeakingWorkout(false);
    setIsSpeakingDiet(false);
  }, [activeTab]);

  const stopSpeech = () => {
    if (!synth) return;
    synth.cancel();
    setIsSpeakingWorkout(false);
    setIsSpeakingDiet(false);
  };

  const startWorkoutSpeech = () => {
    if (!plan || !synth) return;

    const text = (plan.workout ?? [])
      .map(
        (d) =>
          `${d.day} - ${d.focus}. ` +
          (d.exercises ?? [])
            .map(
              (e) => `${e.name}. ${e.sets} sets of ${e.reps}. Rest ${e.rest}.`
            )
            .join(" ")
      )
      .join(" ");

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => setIsSpeakingWorkout(false);

    setIsSpeakingWorkout(true);
    synth.speak(utter);
  };

  const startDietSpeech = () => {
    if (!plan || !synth) return;

    const text = (plan.diet ?? [])
      .map(
        (d) =>
          `${d.day}: Breakfast ${d.Breakfast}. Lunch ${d.Lunch}. Dinner ${d.Dinner}. Snacks ${
            d.Snacks || "None"
          }.`
      )
      .join(" ");

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => setIsSpeakingDiet(false);

    setIsSpeakingDiet(true);
    synth.speak(utter);
  };

  // IMAGE MODAL
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const handleImage = async (prompt: string) => {
    setModalOpen(true);
    setModalLoading(true);
    setModalImage("/loading-placeholder.jpg");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const { imageUrl } = await res.json();

      setModalImage(imageUrl);
    } catch {
      setModalImage("/image-error.jpg");
    } finally {
      setModalLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <>
      <motion.div
        className="
          bg-white/70 dark:bg-slate-900/40
          backdrop-blur-xl shadow-xl 
          rounded-2xl p-6 space-y-6 
          border border-black/10 dark:border-white/10
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Your AI Fitness Plan</h2>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-black/20 dark:border-white/20 pb-2">
          <button
            className={`px-4 py-1 font-semibold ${
              activeTab === "workout"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500"
            }`}
            onClick={() => setActiveTab("workout")}
          >
            🏋️ Workout
          </button>

          <button
            className={`px-4 py-1 font-semibold ${
              activeTab === "diet"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-slate-500"
            }`}
            onClick={() => setActiveTab("diet")}
          >
            🥗 Diet
          </button>
        </div>

        {/* Workout Tab */}
        {activeTab === "workout" && (
          <>
            <button
              onClick={() =>
                isSpeakingWorkout ? stopSpeech() : startWorkoutSpeech()
              }
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs mb-3"
            >
              {isSpeakingWorkout ? "⏹ Stop" : "🔊 Read Workout"}
            </button>

            {(plan.workout ?? []).map((day, dayIndex) => (
              <div
                key={`workout-${dayIndex}`}
                className="mb-4 p-3 bg-white/10 dark:bg-white/5 rounded-xl border border-white/10"
              >
                <p className="font-medium">
                  {day.day} —{" "}
                  <span className="text-sm text-slate-400">{day.focus}</span>
                </p>

                {(day.exercises ?? []).map((ex, exIndex) => (
                  <div
                    key={`exercise-${dayIndex}-${exIndex}`}
                    className="flex justify-between items-center text-sm py-1"
                  >
                    <span>
                      {ex.name} — {ex.sets}×{ex.reps} (Rest {ex.rest})
                    </span>

                    <Camera
                      size={20}
                      className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                      onClick={() =>
                        handleImage(
                          `Gym exercise photo: ${ex.name}, proper form`
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {/* Diet Tab */}
        {activeTab === "diet" && (
          <>
            <button
              onClick={() =>
                isSpeakingDiet ? stopSpeech() : startDietSpeech()
              }
              className="px-3 py-1 bg-pink-600 text-white rounded-lg text-xs mb-3"
            >
              {isSpeakingDiet ? "⏹ Stop" : "🔊 Read Diet"}
            </button>

            {(plan.diet ?? []).map((d, dietIndex) => (
              <div
                key={`diet-${dietIndex}`}
                className="mb-4 p-3 bg-white/10 dark:bg-white/5 rounded-xl border border-white/10"
              >
                <p className="font-medium">{d.day}</p>

                {["Breakfast", "Lunch", "Dinner", "Snacks"].map(
                  (meal, mealIndex) => (
                    <div
                      key={`meal-${dietIndex}-${mealIndex}`}
                      className="flex justify-between items-center text-sm py-1"
                    >
                      <span>
                        <strong>{meal}:</strong>{" "}
                        {d[meal as keyof DietDay] || "—"}
                      </span>

                      <Camera
                        size={20}
                        className="cursor-pointer text-pink-500 hover:text-pink-700"
                        onClick={() =>
                          handleImage(
                            `Healthy food photo of ${d[meal as keyof DietDay]}`
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
            ))}
          </>
        )}

        {/* TIPS */}
        <section>
          <h3 className="font-semibold text-lg mb-2">💡 Tips & Motivation</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {(plan.tips ?? []).map((t, i) => (
              <li key={`tip-${i}`}>{t}</li>
            ))}
          </ul>
        </section>
      </motion.div>

      {/* IMAGE MODAL */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div
            className="bg-white dark:bg-slate-800 p-4 rounded-xl max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-xl text-slate-500 hover:text-black"
            >
              ×
            </button>

            {modalLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <img src={modalImage!} className="rounded-lg w-full" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
