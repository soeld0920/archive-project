/*
글에 포함된 코드 블록을 렌더링하는 컴포넌트
코드 복사 버튼을 포함
*/

import { Button } from "antd";
import { useMessageContext } from "app/providers/message";
import doCopyTextAtclipboard from "shared/lib/utils/doCopyTextAtClipboard";
import { useCallback } from "react";
import { FaRegCopy } from "react-icons/fa";
import styles from "styles/modules/CodeBlock.module.css"

type CodeBlockProps = {
  children: string;
};

export default function CodeBlock({ children }: CodeBlockProps) {
  const [api] = useMessageContext();

  const handleCopy = useCallback(async () => {
    const ok = doCopyTextAtclipboard(children);
    if(ok)api.success("복사되었습니다!");
    else api.error("복사에 실패했습니다.");
  }, [api, children]);

  return (
    <div className={styles.codeWrap}>
      {/* 항상 렌더 + hover/focus로만 보이게 */}
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

      <div>
        <pre className={styles.codePre}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
