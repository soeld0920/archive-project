import { Alert, Button, Flex, Space } from "antd"
import classNames from "classnames";
import { clearParams } from "lib/clearParams";
import { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import styles from "styles/modules/DetailPage.module.css"

export default function WritingTag({tag} : {tag : string[]}){
  const [alertValue, setAlertValue] = useState("")
  const navigate = useNavigate()
  const tagAlertClasses = classNames(styles.tagAlert,{[styles.shown] : alertValue !== ""})
  const [props] = useSearchParams()

  const onAlertClick = () => {
    const next = clearParams(props)
    navigate({pathname : "/search", search : `?${createSearchParams({...next,detail : alertValue})}`})
  }

  return (
    <div className={styles.tagWrapper}>
      <Alert message={`${alertValue} 태그로 검색하시겠습니까?`} type="info"
        action={
          <Space>
            <Button key={"true"} icon={<FaCheck/>} color="blue" type="text" onClick={onAlertClick}/>
            <Button key={"false"} icon={<FaXmark/>} color="red" type="text" onClick={() => setAlertValue("")}/>
          </Space>
        }
        className={tagAlertClasses}
      />
      <Flex gap="small">
        {
          tag.map((str) => 
          <Tag tag={str} key={str} setValue={setAlertValue}/>)
        }
      </Flex>
    </div>
  )
}

type TagProps = {tag : string, setValue : (value : string) => void}

function Tag({tag,setValue} : TagProps){
  return(
      <button className={styles.tag} value={tag} onClick={(e) => setValue(e.currentTarget.value)} type="button" aria-label={"태그 검색: ${tag}"}># {tag}</button>
  )
}