import { create } from "zustand";
import { PlanData } from "@/components/PlanDisplay";

type PlanState = {
  plan: PlanData | null;
  setPlan: (p: PlanData | null) => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  plan: null,
  setPlan: (p) => set({ plan: p }),
}));
