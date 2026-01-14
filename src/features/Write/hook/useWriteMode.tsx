import { useState } from "react";

export type WriteMode = "write" | "edit";

export default function useWriteMode(initialMode: WriteMode = "write") {
  const [mode, setMode] = useState<WriteMode>(initialMode);

  return { mode, setMode } as const;
}

