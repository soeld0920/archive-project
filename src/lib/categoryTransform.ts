import type { Category } from "types/note";

const categoryName = {
  Algorithm : "알고리즘",
  Wrong : "오답노트",
  Dictionary : "사전"
}

export function categoryToString(category : Category) : string{
  return categoryName[category];
}