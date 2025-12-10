import { useEffect, useState } from "react";
import type { WritingIndex } from "shared/types/Writing";
import type { WritingIndexWithExplan } from "../libs/api/getBinner";
import getBinner from "../libs/api/getBinner";

export default function useBinner() {
  const [updateAt, setUpdateAt] = useState<Date | null>(null);
  const [writingIndexWithExplan, setWritingIndexWithExplan] = useState<WritingIndexWithExplan[]>([]);
  const [currentWriting, setCurrentWriting] = useState<WritingIndex | null>(null);
  const [currentExplan, setCurrentExplan] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBinner();
        setUpdateAt(new Date(data.updateAt));
        setWritingIndexWithExplan(data.writingIndexWithExplan);
        
        // 첫 번째 글을 기본으로 설정
        if (data.writingIndexWithExplan.length > 0) {
          const first = data.writingIndexWithExplan[0];
          setCurrentWriting(first.writing);
          setCurrentExplan(first.explan);
        }
      } catch (error) {
        console.error("Failed to fetch binner data:", error);
      }
    };

    fetchData();
  }, []);

  // currentWriting이 변경될 때 currentExplan도 업데이트
  useEffect(() => {
    if (currentWriting) {
      const found = writingIndexWithExplan.find(item => item.writing.UUID === currentWriting.UUID);
      if (found) {
        setCurrentExplan(found.explan);
      } else {
        setCurrentExplan(null);
      }
    }
  }, [currentWriting, writingIndexWithExplan]);

  const handleSetCurrentWriting = (writing: WritingIndex) => {
    setCurrentWriting(writing);
  };

  return {
    updateAt,
    writingIndexWithExplan,
    currentWriting,
    setCurrentWriting: handleSetCurrentWriting,
    currentExplan,
  } as const;
}

