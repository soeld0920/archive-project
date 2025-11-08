import { Button } from "antd";
import { useMessageContext } from "context/message";
import doCopyTextAtclipboard from "lib/doCopyTextatClipboard";
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
