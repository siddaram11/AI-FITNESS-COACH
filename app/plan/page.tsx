"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import PlanDisplay from "@/components/PlanDisplay";
import MotivationQuote from "@/components/MotivationQuote";
import { usePlanStore } from "@/store/planStore";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";

export default function PlanPage() {
  const plan = usePlanStore((s) => s.plan);
  const setPlan = usePlanStore((s) => s.setPlan);
  const router = useRouter();

  // CLEAR
  const handleClear = () => {
    setPlan(null);
    localStorage.removeItem("generatedPlan");
    router.push("/");
  };

  // REGENERATE
  const handleRegenerate = () => {
    setPlan(null);
    localStorage.removeItem("generatedPlan");
    router.push("/dashboard");
  };

  // EXPORT PDF (safe & hardened)
  const handleExportPDF = () => {
    if (!plan) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    let y = 40;
    let page = 1;

    const primary = "#4F46E5";
    const lightText = "#666";
    const margin = 40;
    const maxWidth = pageWidth - margin * 2;

    // Reduced font sizes
    const H0_SIZE = 20; // Main title (AI Fitness Coach)
    const H1_SIZE = 14; // Section titles
    const H2_SIZE = 12; // Day titles
    const TEXT_SIZE = 10;

    const footer = () => {
      doc.setFontSize(TEXT_SIZE - 2);
      doc.setTextColor(lightText);
      doc.text(`Page ${page}`, pageWidth - 60, 820);
      page++;
    };

    const ensureSpace = (min = 30) => {
      if (y + min > 780) {
        footer();
        doc.addPage();
        y = 40;
      }
    };

    const sectionHeader = (title: string) => {
      ensureSpace(40);
      doc.setFillColor(primary);
      doc.rect(0, y - 20, pageWidth, 30, "F");

      doc.setTextColor("#fff");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(H1_SIZE);
      doc.text(title, margin, y);

      doc.setTextColor("#000");
      y += 30;
    };

    // Safe wrapText: always ensure `lines` is an array
    const wrapText = (text: any, indent = margin) => {
      // Protect against null/undefined and non-string input
      if (text === null || text === undefined) return;

      // stringify to avoid objects causing issues
      const raw = String(text);

      let lines: string[] | string = doc.splitTextToSize(raw, maxWidth);

      if (!Array.isArray(lines)) {
        // if jsPDF returned a string, convert to array
        lines = [String(lines)];
      }

      (lines as string[]).forEach((line) => {
        if (y > 760) {
          footer();
          doc.addPage();
          y = 40;
        }
        doc.setFontSize(TEXT_SIZE);
        doc.text(line, indent, y);
        y += 14;
      });
    };

    // -------------------------------------------------
    // TOP MAIN HEADING
    // -------------------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(H0_SIZE);
    doc.setTextColor("#000");
    doc.text("AI Fitness Coach", margin, y);
    y += 28;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(TEXT_SIZE + 1);
    doc.text("Your Personalized Fitness Plan", margin, y);
    y += 25;

    // Divider line
    doc.setDrawColor(primary);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 25;

    // -------------------------------------------------
    // WORKOUT SECTION (starts immediately)
    // -------------------------------------------------
    sectionHeader("7-Day Workout Plan");

    const workoutArr = Array.isArray(plan.workout) ? plan.workout : [];

    workoutArr.forEach((day: any) => {
      ensureSpace();

      const dayTitle = `${day?.day ?? "Day"}${day?.focus ? " — " + day.focus : ""}`;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(H2_SIZE);
      doc.text(dayTitle, margin, y);
      y += 18;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(TEXT_SIZE);

      const exercises = Array.isArray(day?.exercises) ? day.exercises : [];
      exercises.forEach((ex: any) => {
        const name = ex?.name ?? "Exercise";
        const sets = ex?.sets ?? "—";
        const reps = ex?.reps ?? "—";
        const rest = ex?.rest ?? "—";

        wrapText(`• ${name}: ${sets} sets × ${reps} reps (Rest ${rest})`, margin + 20);
      });

      y += 6;
    });

    footer();
    doc.addPage();
    y = 40;

    // -------------------------------------------------
    // DIET SECTION
    // -------------------------------------------------
    sectionHeader("7-Day Diet Plan");

    const dietArr = Array.isArray(plan.diet) ? plan.diet : [];
    dietArr.forEach((dayDiet: any) => {
      ensureSpace();

      const dayLabel = dayDiet?.day ?? "Day";
      doc.setFont("helvetica", "bold");
      doc.setFontSize(H2_SIZE);
      doc.text(dayLabel, margin, y);
      y += 18;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(TEXT_SIZE);

      wrapText(`Breakfast: ${dayDiet?.Breakfast ?? "—"}`, margin + 20);
      wrapText(`Lunch: ${dayDiet?.Lunch ?? "—"}`, margin + 20);
      wrapText(`Dinner: ${dayDiet?.Dinner ?? "—"}`, margin + 20);
      wrapText(`Snacks: ${dayDiet?.Snacks ?? "None"}`, margin + 20);

      y += 6;
    });

    footer();
    doc.addPage();
    y = 40;

    // -------------------------------------------------
    // TIPS SECTION
    // -------------------------------------------------
    sectionHeader("Tips & Motivation");

    const tipsArr = Array.isArray(plan.tips) ? plan.tips : [];
    tipsArr.forEach((tip: any) => {
      ensureSpace();
      wrapText(`• ${tip}`, margin);
    });

    footer();

    doc.save("AI-Fitness-Plan.pdf");
  };

  if (!plan) return null;

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-black">
      <Header />

      <div className="container mx-auto px-4 py-12 space-y-12">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">
            Your Personalized{" "}
            <span className="text-indigo-600">AI Fitness Plan</span>
          </h1>

          <MotivationQuote />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/10"
        >
          <div className="flex justify-end gap-3 mb-5">
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
            >
              Export PDF
            </button>

            <button
              onClick={handleRegenerate}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm"
            >
              Regenerate
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              Logout
            </button>
          </div>

          <PlanDisplay plan={plan} />
        </motion.div>
      </div>
    </main>
  );
}
