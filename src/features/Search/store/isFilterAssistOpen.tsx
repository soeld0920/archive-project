import { create } from "zustand";

interface IsFilterAssistOpenType {
  isFilterAssistOpen: boolean;
  setIsFilterAssistOpen: (isFilterAssistOpen: boolean) => void;
}

const useIsFilterAssistOpenStore = create<IsFilterAssistOpenType>((set) => ({
  isFilterAssistOpen: false,
  setIsFilterAssistOpen: (isFilterAssistOpen: boolean) => set({ isFilterAssistOpen }),
}));

export default useIsFilterAssistOpenStore;