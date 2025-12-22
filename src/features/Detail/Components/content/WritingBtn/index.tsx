import { Flex } from "antd";
import GreatToggleButton from "./GreatToggleButton";
import { BookmarkToggleButton } from "./BookMarkToggleButton";
import { useWritingContext } from "features/Detail/context/WritingContext";
import { WritingInteractionProvider, useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import type HttpError from "shared/types/HttpError";
import { useEffect } from "react";
import { api } from "axois/api";
import type { WritingInteractionState } from "features/Detail/types/WritingInteractionState";

function WritingInteractionContent(){
  const {writing} = useWritingContext();
  const {setGreat, setBookmark} = useWritingInteractionContext();

  useEffect(() => {
    const fetchInteractionState = async () => {
      if(!writing) return;
      const response : WritingInteractionState = await api.get(`/writing/${writing.writingUuid}/interactionState`)
      .then(res => res.data)
      .catch((e : HttpError) => {throw e});
      
      setGreat(response.greated);
      setBookmark(response.bookmarked);
    }
    fetchInteractionState();
  },[
    writing,
    setGreat,
    setBookmark,
  ]);

  return(
    <Flex gap="small">
      <GreatToggleButton/>
      <BookmarkToggleButton/>
    </Flex>
  )
}

export default function WritingInteraction(){
  return(
    <WritingInteractionProvider>
      <WritingInteractionContent/>
    </WritingInteractionProvider>
  )
}