import { Button, Flex, message, Tooltip } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import doCopyTextAtclipboard from "lib/doCopyTextatClipboard";
import { FaPrint, FaRegCopy, FaShareAlt } from "react-icons/fa";
import { createSearchParams } from "react-router-dom";

type WritingSubInteractionProps = {
  UUID : string
  message : {
    messageApi : MessageInstance
  }
}

export default function WritingSubInteraction({UUID, message} : WritingSubInteractionProps){
  const messageApi = message.messageApi
  const url = (() => {
    const origin = window.location.origin;                    // ex) https://example.com
    const base = (import.meta as any).env?.BASE_URL ?? "/";   // ex) /archive-project/
    const search = `?${createSearchParams({ UUID }).toString()}`;
    return `${origin}${base.replace(/\/?$/, "/")}page${search}`;
  })()



  const onShareClick = () => {
    const result = doCopyTextAtclipboard(url);
    if(result) messageApi.open({content : "링크가 복사되었어요!", type : "success"})
    else messageApi.open({content : "복사에 실패했습니다.", type : "error"})
  }

  return (
    <Flex gap="small">
      <Tooltip title="공유하기">
        <Button onClick={onShareClick}>
          <FaShareAlt /> 공유하기
        </Button>
      </Tooltip>
      <Tooltip title="인쇄하기">
        <Button onClick={() => window.print()}>
          <FaPrint /> 인쇄하기
        </Button>
      </Tooltip>
    </Flex>
  )
}