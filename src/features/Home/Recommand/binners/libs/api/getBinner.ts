import createGetFetch from "shared/lib/utils/createGetFetch";
import type { WritingIndex } from "shared/types/Writing";

export type WritingIndexWithExplan = {
  writing: WritingIndex;
  explan: {
    title: string;
    description: string;
  };
};

export type BinnerResponse = {
  updateAt: string; // ISO date string
  writingIndexWithExplan: WritingIndexWithExplan[];
};

export default async function getBinner(): Promise<BinnerResponse> {
  return createGetFetch<BinnerResponse>("/api/writing/binner");
}

