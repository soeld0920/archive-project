import { Flex } from "antd";
import GreatToggleButton from "./GreatToggleButton";
import { BookmarkToggleButton } from "./BookMarkToggleButton";

export default function WritingInteraction(){
  return(
    <Flex gap="small">
      <GreatToggleButton/>
      <BookmarkToggleButton/>
      {/* <CommentMoveButton length={comment.length}/> */}
    </Flex>
  )
}