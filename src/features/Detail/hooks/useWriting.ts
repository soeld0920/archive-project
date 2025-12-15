import { useState } from "react";
import type { WritingDetail } from "../types/WritingDetail";

export default function useWriting(){
  const [writing, setWriting] = useState<WritingDetail | null | undefined>(undefined);
  return {writing, setWriting};
}