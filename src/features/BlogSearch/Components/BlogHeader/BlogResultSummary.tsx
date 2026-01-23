import { useBlogWritingsContent } from "../../context/BlogWritingsContext";

type BlogResultSummaryProps = {
  userUuid: string;
}

export default function BlogResultSummary({userUuid} : BlogResultSummaryProps){
  const [writings] = useBlogWritingsContent();
  const count = writings.length;
  
  return(
    <h2 style={{margin: 0}}>
      {userUuid ? `${count}개의 글` : "유저를 찾을 수 없습니다"}
    </h2>
  )
}
