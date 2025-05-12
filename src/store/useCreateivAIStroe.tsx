import { create } from "zustand";
import { persist } from "zustand/middleware";

type OutlineCard = {
  id: string;
  title: string;
  order: number;
};

type CreativeAIStore = {
  
  outlines: OutlineCard[];
  addOutlines: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};

const useCreativeAIStore = create(
  persist<CreativeAIStore>(
    (set) => ({
      resetOutlines: ()=>{
        set({outlines: []})
      },
      currentAiPrompt: "",
      setCurrentAiPrompt: (prompt: string) =>
        set(() => ({
          currentAiPrompt: prompt,
        })),
      outlines: [],

      addOutlines: (outline: OutlineCard) =>
        set((state) => ({
          outlines: [...state.outlines, outline],
        })),

      addMultipleOutlines: (outlines: OutlineCard[]) =>
        set(() => ({
          outlines: [...outlines],
        })),
    }),
    
    {
      name: "creative-ai", // Name for localStorage
    }
  )
);

export default useCreativeAIStore;