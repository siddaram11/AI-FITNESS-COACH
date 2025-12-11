"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Signup successful!");
    router.push("/login");
  };

  return (
    <main
      className="
        min-h-screen pt-20 
        bg-gradient-to-br 
        from-blue-200 via-white to-blue-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        text-slate-900 dark:text-white
      "
    >
      {/* ⭐ GLOBAL HEADER */}
      <Header />

      <div
        className="
          flex items-center justify-center 
          px-4 sm:px-6 md:px-10 
          py-12 sm:py-20
        "
      >
        <div
          className="
            bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl 
            p-6 sm:p-8 md:p-10 
            rounded-3xl 
            border border-slate-300/50 dark:border-white/10 
            shadow-2xl 
            w-full max-w-md
          "
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <input
              className="
                w-full p-3 rounded-xl 
                bg-white/80 dark:bg-slate-800 
                border border-slate-300 dark:border-slate-600 
                placeholder-slate-500 dark:placeholder-slate-400 
                text-slate-900 dark:text-white
                text-base sm:text-lg
              "
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Email */}
            <input
              className="
                w-full p-3 rounded-xl 
                bg-white/80 dark:bg-slate-800 
                border border-slate-300 dark:border-slate-600 
                placeholder-slate-500 dark:placeholder-slate-400 
                text-slate-900 dark:text-white
                text-base sm:text-lg
              "
              placeholder="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* Password */}
            <input
              className="
                w-full p-3 rounded-xl 
                bg-white/80 dark:bg-slate-800 
                border border-slate-300 dark:border-slate-600 
                placeholder-slate-500 dark:placeholder-slate-400 
                text-slate-900 dark:text-white
                text-base sm:text-lg
              "
              placeholder="Password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* Button */}
            <button
              type="submit"
              className="
                w-full py-3 
                bg-indigo-600 hover:bg-indigo-700 
                rounded-xl shadow-lg 
                text-white font-semibold text-lg
                transition-all 
              "
            >
              Sign Up
            </button>
          </form>

          {/* Login redirect */}
          <p className="text-center mt-4 text-sm sm:text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 dark:text-indigo-300 underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
