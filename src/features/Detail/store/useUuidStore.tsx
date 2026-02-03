import { create } from "zustand";

interface UuidStore {
  uuid : string;
  setUuid : (uuid : string) => void;
}

const useUuidStore = create<UuidStore>((set) => ({
  uuid : "",
  setUuid : (uuid : string) => set({ uuid }),
}))

export default useUuidStore;