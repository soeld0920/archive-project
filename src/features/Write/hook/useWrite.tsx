import { useState } from "react";

export default function useWrite() {
  const [title, setTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [seriesUuid, setSeriesUuid] = useState<string | null>(null);
  const [tag, setTag] = useState<string[]>([]);

  return {title, setTitle, categoryId, setCategoryId, seriesUuid, setSeriesUuid, tag, setTag} as const;
}