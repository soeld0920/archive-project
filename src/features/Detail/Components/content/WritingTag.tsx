/*
  글 태그 보여주는 컴포넌트
  - 태그 클릭 시 해당 태그로 검색 페이지 이동

  TODO : 너무 많은 태그가 있으면 줄여서 보여주기
*/

import { ConfigProvider, Flex, Popconfirm } from "antd"
import { createSearchParams, useNavigate } from "react-router-dom";
import styles from "features/Detail/DetailPage.module.css"
import { useWritingContext } from "features/Detail/context/WritingContext";

export default function WritingTag(){

  const {writing} = useWritingContext();
  if(!writing) return null;
  const {tag} = writing;
  
  return (
    <div  className={styles.tagWrapper}>
      <ConfigProvider>
        <Flex gap="small">
          {
            tag.map((str) => 
            <Tag tag={str} key={str}/>)
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