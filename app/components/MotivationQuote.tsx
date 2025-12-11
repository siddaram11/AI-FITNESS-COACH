"use client";

import { useEffect, useState } from "react";

export default function MotivationQuote() {
  const [quote, setQuote] = useState("Stay consistent. Tiny steps turn into big changes.");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/motivation", { method: "GET" });
      if (!res.ok) throw new Error("Failed to load quote");
      const data = await res.json();
      setQuote(data.quote);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <button
      type="button"
      onClick={fetchQuote}
      className="text-xs bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 px-3 py-2 rounded-2xl max-w-xs text-left shadow"
    >
      {loading ? "Refreshing..." : `“${quote}”`}
    </button>
  );
}
