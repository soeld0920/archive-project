import { create } from "zustand";

interface PageStore {
  page : number;
  setPage : (page: number) => void;
  pageCount : number;
  setPageCount : (pageCount: number) => void;
  resultCount : number;
  setResultCount : (resultCount: number) => void;
  prevPage : () => void;
  nextPage : () => void;
  PAGE_SIZE : number;
}

export const usePageStore = create<PageStore>((set) => ({
  page : 1,
  setPage : (page: number) => set({page}),
  pageCount : 1,
  setPageCount : (pageCount: number) => set({pageCount}),
  resultCount : 0,
  setResultCount : (resultCount: number) => set({resultCount}),
  prevPage : () => set((state) => ({page : Math.max(1, state.page - 1)})),
  nextPage : () => set((state) => ({page : Math.min(state.page + 1, state.pageCount)})),
  PAGE_SIZE : 10,
}))