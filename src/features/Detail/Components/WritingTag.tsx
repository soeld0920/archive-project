import { ConfigProvider, Flex, Popconfirm } from "antd"
import { clearParams } from "lib/clearParams";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import styles from "styles/modules/DetailPage.module.css"

export default function WritingTag({tag} : {tag : string[]}){

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
  const [props] = useSearchParams()

  const onAlertClick = () => {
    const next = clearParams(props)
    navigate({pathname : "/search", search : `?${createSearchParams({...next,detail : tag})}`})
  }

  return(
      <Popconfirm title={`${tag} 태그로 검색하시겠습니까?`} onConfirm={onAlertClick}>
        <button className={styles.tag} value={tag} type="button" aria-label={"태그 검색: ${tag}"}>
          # {tag}
        </button>
      </Popconfirm>
  )
}