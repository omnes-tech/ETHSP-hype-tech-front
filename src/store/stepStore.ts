import { create } from "zustand";

export interface StepperStore {
  step: number;
  setStep: (step: number) => void;
  select: string;
  setSelect: (select: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const StepperStore = create<StepperStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  select: "",
  setSelect: (select) => set({ select }),
  email: "",
  setEmail: (email) => set({ email }),
}));
