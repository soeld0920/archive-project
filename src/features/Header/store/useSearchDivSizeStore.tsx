import { create } from "zustand";

interface SearchDivSizeStore {
  width : number;
  height : number;
  setWidth : (width : number) => void;
  setHeight : (height : number) => void;
  setSize : (width : number, height : number) => void;
}

export const useSearchDivSizeStore = create<SearchDivSizeStore>((set) => {
  return {
    width : 0,
    height : 0,
    setWidth : (width : number) => set({width}),
    setHeight : (height : number) => set({height}),
    setSize : (width : number, height : number) => set({width, height}),
  }
})