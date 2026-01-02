/*
글에 포함된 코드 블록을 렌더링하는 컴포넌트
코드 복사 버튼을 포함
*/

import { Button } from "antd";
import { useMessageContext } from "app/providers/message";
import doCopyTextAtclipboard from "shared/lib/utils/doCopyTextAtClipboard";
import { useCallback, useMemo } from "react";
import { FaRegCopy } from "react-icons/fa";
import styles from "shared/styles/modules/CodeBlock.module.css"
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export default function TiptapCodeBlockView({ node }: any) {
  const [api] = useMessageContext();
  const language = node.attrs.language;
  
  // codeblock 내부 텍스트 추출 (복사용)
  const text = useMemo(() => node.textContent ?? "", [node]);

  const handleCopy = useCallback(() => {
    const ok = doCopyTextAtclipboard(text);
    if (ok) api.success("복사되었습니다!");
    else api.error("복사에 실패했습니다.");
  }, [api, text]);

  return (
    <NodeViewWrapper className={styles.codeWrap}>
      <div className={styles.codeHeader}>
        {language}
        <Button
          type="primary"
          shape="circle"
          onClick={handleCopy}
          aria-label="코드 복사"
          title="코드 복사"
          className={styles.copyBtn}
        >
          <FaRegCopy />
        </Button>
      </div>
      <pre className={styles.codePre}>
        {/* TipTap이 여기에 실제 코드 텍스트를 편집/렌더 */}
        <code className={`language-${language} ${styles.code}`}>
          <NodeViewContent as="div" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
}