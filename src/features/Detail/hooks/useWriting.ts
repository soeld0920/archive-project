import { useState } from "react";
import type { User } from "shared/types/User";
import type { Series, Writing } from "shared/types/Writing";

export default function useWriting(){
  const [writing, setWriting] = useState<Writing | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [series, setSeries] = useState<Series | null>(null);
  return {writing, author, setWriting, setAuthor, series, setSeries};
}