import { create,type StoreApi,type UseBoundStore } from "zustand";

interface SizeStore {
  width : number;
  height : number;
  setWidth : (width : number) => void;
  setHeight : (height : number) => void;
  setSize : (width : number, height : number) => void;
}

// key별로 독립된 store를 관리하는 Map
const storeMap = new Map<string, UseBoundStore<StoreApi<SizeStore>>>();

/**
 * 고유한 key를 사용하여 독립된 SizeStore를 생성하거나 반환합니다.
 * @param key - store를 식별하는 고유한 키
 * @returns 해당 key에 대한 SizeStore 훅
 */
function createSizeStore(key: string): UseBoundStore<StoreApi<SizeStore>> {
  if (!storeMap.has(key)) {
    storeMap.set(key, create<SizeStore>((set) => ({
      width : 0,
      height : 0,
      setWidth : (width : number) => set({width}),
      setHeight : (height : number) => set({height}),
      setSize : (width : number, height : number) => set({width, height}),
    })));
  }
  return storeMap.get(key)!;
}

/**
 * 고유한 key를 사용하여 독립된 SizeStore에 접근하는 훅입니다.
 * 각 컴포넌트는 고유한 key를 사용하여 독립된 store를 사용할 수 있습니다.
 * @param key - store를 식별하는 고유한 키
 * @returns 해당 key에 대한 SizeStore 상태 및 메서드
 */
export function useSizeStore(key: string): SizeStore {
  const store = createSizeStore(key);
  return store();
}

/**
 * @deprecated 여러 컴포넌트가 같은 store를 공유하면 충돌이 발생할 수 있습니다.
 * 대신 useSizeStore(key)를 사용하여 각 컴포넌트에 고유한 store를 할당하세요.
 */
export const useSizeStoreLegacy = create<SizeStore>((set) => {
  return {
    width : 0,
    height : 0,
    setWidth : (width : number) => set({width}),
    setHeight : (height : number) => set({height}),
    setSize : (width : number, height : number) => set({width, height}),
  }
})