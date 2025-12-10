import createGetFetch from "shared/lib/utils/createGetFetch";
import type { WritingIndex } from "shared/types/Writing";

export type RecentResponse = {
  writingIndex: WritingIndex[];
};

export default async function getRecent(): Promise<RecentResponse> {
  return createGetFetch<RecentResponse>("/api/writing/recent");
}

