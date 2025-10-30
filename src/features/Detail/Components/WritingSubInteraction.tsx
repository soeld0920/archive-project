import { Button, Flex, Tooltip } from "antd";
import { useMessageContext } from "context/message";
import doCopyTextAtclipboard from "lib/doCopyTextatClipboard";
import { FaPrint, FaShareAlt } from "react-icons/fa";
import { createSearchParams } from "react-router-dom";

type WritingSubInteractionProps = {
  UUID : string
}

export default function WritingSubInteraction({UUID} : WritingSubInteractionProps){
  const [messageApi] = useMessageContext()
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