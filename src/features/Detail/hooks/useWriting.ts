import { useEffect, useState } from "react";
import type { User } from "shared/types/User";
import type { CommentRes, Series, Writing } from "shared/types/Writing";
import type { WritingLink } from "shared/types/WritingLink";

export default function useWriting(){
  const [writing, setWriting] = useState<Writing | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [series, setSeries] = useState<Series | null>(null);
  const [seriesWritngsLink, setSeriesWritngsLink] = useState<{prev : WritingLink | null, next : WritingLink | null} | null>(null);
  const [greatCount, setGreatCount] = useState(0);
  const [commentContent, setCommentContent] = useState<CommentRes[]>([]);
  useEffect(() => {
    if(writing) setGreatCount(writing.great);
  }, [writing]);
  return {writing, author, setWriting, setAuthor, series, setSeries,
    seriesWritngsLink, setSeriesWritngsLink, greatCount, setGreatCount, commentContent, setCommentContent};
}