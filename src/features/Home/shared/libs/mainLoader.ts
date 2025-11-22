import type { BinnerWritingData } from "mocks/handlers/writingHandlers";
import fetchBinnerWriting from "mocks/handlers/writingHandlers";
import fetchWritingIndexList from "backend/Writing/fetchWritingIndexList";
import type { WritingIndex } from "shared/types/Writing";

export type MainLoaderData = {
  writingIdxs : WritingIndex[]
  binnerWritings?: BinnerWritingData
}

export async function mainLoader() : Promise<MainLoaderData>{
  const writingIndexLiat : WritingIndex[] = await fetchWritingIndexList();
  const binnerWritings = await fetchBinnerWriting();
  return {writingIdxs : writingIndexLiat, binnerWritings : binnerWritings};
}