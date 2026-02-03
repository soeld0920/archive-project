/*
  글 태그 보여주는 컴포넌트
  - 태그 클릭 시 해당 태그로 검색 페이지 이동

  TODO : 너무 많은 태그가 있으면 줄여서 보여주기
*/

import { ConfigProvider, Flex, Popconfirm } from "antd"
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import styles from "features/Detail/DetailPage.module.css"
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";
import type { Tag } from "shared/types/entity/Tag";

export default function WritingTag(){

  const {UUID} = useParams();
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")
  if(isError || isLoading) {console.error(error); return null;}
  const {tag} = writingDetail;
  
  return (
    <div  className={styles.tagWrapper}>
      <ConfigProvider>
        <Flex gap="small">
          {
            tag.map((tag : Tag) => 
            <Tag tag={tag.tagName} key={tag.tagId}/>)
          }
        </Flex>
      </ConfigProvider>
    </div>
  )
}

type TagProps = {tag : string}

function Tag({tag} : TagProps){
  const navigate = useNavigate()

  const onAlertClick = () => {
    navigate({pathname : "/search", search : `?${createSearchParams({detail : tag})}`})
  }

  return(
      <Popconfirm title={`${tag} 태그로 검색하시겠습니까?`} onConfirm={onAlertClick}>
        <button className={styles.tag} value={tag} type="button" aria-label={"태그 검색: ${tag}"}>
          # {tag}
        </button>
      </Popconfirm>
  )
}