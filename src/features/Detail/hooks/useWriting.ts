import { useState } from "react";
import type { Writing } from "shared/types/Writing";

export default function useWriting(UUID : string){
  const [writing, setWriting] = useState<Writing | null>(null);
  return writing;
}