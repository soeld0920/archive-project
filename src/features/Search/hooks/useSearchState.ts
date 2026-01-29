import { useState } from "react";

export default function useSearchState(){
  const [searchState, setSearchState] = useState<"loading" | "noResults" | "results">("loading");
  return [searchState, setSearchState] as const;
}