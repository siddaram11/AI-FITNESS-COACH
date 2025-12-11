"use client";

import { useState, useEffect } from "react";

export type UserInput = {
  name: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  goal: string;
  level: string;
  location: string;
  diet: string;
  medicalHistory?: string;
  stressLevel?: string;
};

export default function PlanForm({
  onGenerate,
  loading,
}: {
  onGenerate: (data: UserInput) => void | Promise<void>;
  loading: boolean;
}) {
  const [form, setForm] = useState<UserInput>({
    name: "",
    age: 20,
    gender: "Male",
    heightCm: 170,
    weightKg: 70,
    goal: "Weight Loss",
    level: "Beginner",
    location: "Home",
    diet: "Veg",
    medicalHistory: "",
    stressLevel: "",
  });

  // ⭐ Load user name from localStorage (logged-in user)
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Prevent editing name
    if (name === "name") return;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "heightCm" || name === "weightKg"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const inputBase =
    "w-full px-3 py-2 rounded-xl border " +
    "bg-white/70 dark:bg-slate-900/60 " +
    "border-slate-300 dark:border-slate-700 " +
    "text-slate-800 dark:text-slate-100 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 " +
    "transition backdrop-blur-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white/40 dark:bg-slate-800/40 
        backdrop-blur-xl p-8 rounded-3xl 
        shadow-xl border border-slate-200/30 dark:border-white/10 
        space-y-6
      "
    >
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
        Your Personal Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* NAME FIELD — READ ONLY */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Name (from account)
          </label>
          <input
            name="name"
            value={form.name}
            readOnly
            className={`${inputBase} bg-gray-200 dark:bg-slate-700 cursor-not-allowed`}
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Age
          </label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
            className={inputBase}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Gender
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={inputBase}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Height (cm)
          </label>
          <input
            name="heightCm"
            type="number"
            value={form.heightCm}
            onChange={handleChange}
            required
            className={inputBase}
          />
        </div>

        {/* Weight */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Weight (kg)
          </label>
          <input
            name="weightKg"
            type="number"
            value={form.weightKg}
            onChange={handleChange}
            required
            className={inputBase}
          />
        </div>

        {/* Goal */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Fitness Goal
          </label>
          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className={inputBase}
          >
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Endurance</option>
            <option>General Fitness</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Fitness Level
          </label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className={inputBase}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Workout Location
          </label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className={inputBase}
          >
            <option>Home</option>
            <option>Gym</option>
            <option>Outdoor</option>
          </select>
        </div>

        {/* Diet */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Diet Preference
          </label>
          <select
            name="diet"
            value={form.diet}
            onChange={handleChange}
            className={inputBase}
          >
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Vegan</option>
            <option>Keto</option>
          </select>
        </div>

        {/* Medical History */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Medical History (optional)
          </label>
          <textarea
            name="medicalHistory"
            value={form.medicalHistory}
            onChange={handleChange}
            rows={2}
            className={inputBase}
            placeholder="Heart issues, knee pain, etc."
          />
        </div>

        {/* Stress Level */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Stress Level / Lifestyle (optional)
          </label>
          <textarea
            name="stressLevel"
            value={form.stressLevel}
            onChange={handleChange}
            rows={2}
            className={inputBase}
            placeholder="Sedentary, stressful job, night shifts..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-3 rounded-xl
          bg-indigo-600 hover:bg-indigo-700
          transition font-semibold text-white text-lg
          disabled:opacity-60
        "
      >
        {loading ? "Generating Plan..." : "Generate AI Plan"}
      </button>

      <p className="text-xs text-slate-600 dark:text-slate-400 text-center pt-2">
        Your plan is AI-generated and personalized using your inputs.
      </p>
    </form>
  );
}
