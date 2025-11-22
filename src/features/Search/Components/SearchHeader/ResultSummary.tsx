import { usePageContent } from "features/Search/context/pageContent";
import { useWritingsContent } from "features/Search/context/writingsContent";

type ResultSummaryProps = {
  detail : string;
}

export default function ResultSummary({detail} : ResultSummaryProps){
  const [writings] = useWritingsContent();
  const {pageCount,page} = usePageContent();

  if(writings.length === 0)
    return(
      <p role="status" aria-live="polite">
        <span className="ErrorSpan">{detail}</span>에 대한 결과를 찾을 수 없습니다.
      </p>
    )

  return(
    <div role="status" aria-live="polite" style={{display : "flex"}}>
      <p>
        <span className="HighlighSpan">{detail}</span>에 대한 결과입니다.
      </p> 
      <p className="SubSpan">
        총 <span className="HighlighSpan">{writings.length}</span>개의 결과를 찾았습니다. 
        페이지 <span className="HighlightSpan">{page}</span> / {pageCount}
        </p>
    </div>
  )
}