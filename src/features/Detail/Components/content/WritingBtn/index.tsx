import { Flex } from "antd";
import GreatToggleButton from "./GreatToggleButton";
import { BookmarkToggleButton } from "./BookMarkToggleButton";
import { WritingInteractionProvider, useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import type HttpError from "shared/types/HttpError";
import { useEffect } from "react";
import { api } from "axios/api";
import type { WritingInteractionState } from "features/Detail/types/WritingInteractionState";
import { useParams } from "react-router-dom";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";

function WritingInteractionContent(){
  const {UUID} = useParams();
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")
  const {setGreat, setBookmark} = useWritingInteractionContext();

  if(isError || isLoading) {console.error(error); return null;}

  useEffect(() => {
    const fetchInteractionState = async () => {
      if(!writingDetail) return;
      const response : WritingInteractionState = await api.get(`/writing/${writingDetail.writingUuid}/interactionState`)
      .then(res => res.data)
      .catch((e : HttpError) => {throw e});
      
      setGreat(response.greated);
      setBookmark(response.bookmarked);
    }
    fetchInteractionState();
  },[
    writingDetail,
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