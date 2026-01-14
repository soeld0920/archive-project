import { useEffect, useState } from "react";
import { useWriteModeContext } from "../context/useWriteModeContext";
import { useParams } from "react-router-dom";
import { api } from "axios/api";
import type HttpError from "shared/types/HttpError";
import { useEditorContext } from "../context/useEditorContext";
import type { Tag } from "shared/types/entity/Tag";

export default function useWrite() {
  const [title, setTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [seriesUuid, setSeriesUuid] = useState<string | null>(null);
  const [tag, setTag] = useState<string[]>([]);
  const {mode} = useWriteModeContext();
  const params = useParams();
  const UUID = params.UUID as string;
  const {editor} = useEditorContext();

  useEffect(() => {
    if(mode === "edit") {
      const fetchData = async () => {
        const data = await api.get(`/writing/${UUID}`)
        .then(res => res.data)
        .catch((e : HttpError) => {throw e});
        setTitle(data.writingTitle);
        setCategoryId(data.categoryId);
        setSeriesUuid(data.seriesUuid);
        setTag(data.tag.map((tag : Tag) => tag.tagName));
        editor?.commands.setContent(data.content);
        editor?.commands.focus();
      }
      fetchData();
    }
    }, [UUID, mode]);

  return {title, setTitle, categoryId, setCategoryId, seriesUuid, setSeriesUuid, tag, setTag} as const;
}