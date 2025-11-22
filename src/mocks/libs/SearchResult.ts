import type { SearchParams } from "shared/types/category";
import type { FuseResult, IFuseOptions } from "fuse.js";
import Fuse from "fuse.js";
import type { WritingIndex } from "shared/types/Writing";
import { writingIndex } from "mocks/database/writingIndex";

export default function getSearchResult(searchParams : SearchParams){
  const fuseOption :IFuseOptions<WritingIndex> = {
    keys: [
      { name: "title",  weight: 0.6 },
      { name: "tag",    weight: 0.25 },
      { name: "author", weight: 0.15 },
    ],
    threshold: 0.35,        // 기본 0.6보다 엄격(오탈자 조금 허용)
    ignoreLocation: true,   // 한글/단어 길이에 유리
    minMatchCharLength: 2,  // 1글자 검색은 패스
    includeScore: true,     // 정렬/디버깅에 도움
    useExtendedSearch: true // ^접두, ="정확" 같은 고급 검색 허용
  };

  const index = Fuse.createIndex(fuseOption.keys || [], writingIndex);
  const fuse = new Fuse(writingIndex, fuseOption, index);
  const q = searchParams.detail.trim().normalize("NFC");
  if (q.length < 2) {return writingIndex.map(item => ({ item, score: 1 })) as FuseResult<WritingIndex>[]}
  return fuse.search(q) as FuseResult<WritingIndex>[];
}