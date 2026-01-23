import InputText from "shared/components/blocks/InputComponets/InputText";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import CategorySelect from "shared/components/features/CategorySelect";
import commonStyles from "features/BlogManage/style/BlogManage.module.css";
import styles from "features/BlogManage/style/SeriesManage.module.css";
import { useState } from "react";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import CommonButton from "shared/components/blocks/InputComponets/CommonButton";
import { api } from "axios/api";
import { useMessageContext } from "app/providers/message";

export default function CreateSeries(){
  const [category, setCategory] = useState<MainCategory | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [messageApi] = useMessageContext();

  const handleCreateSeries = async () => {
    if(!title){
      messageApi.open({type : "error", content : "제목을 입력해주세요", duration : 2});
      return;
    }

    await api.post("/series", {
      title : title,
      categoryId : category?.id || null
    }).then(() => {
      messageApi.open({type : "success", content : "시리즈가 추가되었습니다.", duration : 2});
      window.location.reload();
    }).catch(() => {
      messageApi.open({type : "error", content : "시리즈 추가에 실패했습니다.", duration : 2});
    }).finally(() => {
      setTitle("");
      setCategory(undefined);
      setSubCategory(undefined);
    });
  }

  return(
    <div className={commonStyles.formSection}>
      <div className={styles.createSeriesItems}>
        <div className={styles.createSeriesItem}>
          <div style={{display: "flex", alignItems: "end", gap: "30px"}}>
            <h3 >카테고리</h3>
            <CommonButton label="카테고리 설정 안함"  width="200px" height="30px" fontSize="14px"
            onClick={() => {setCategory(undefined); setSubCategory(undefined);}}/>
          </div>
          <CategorySelect mainCategory={category} subCategory={subCategory} 
          setMainCategory={setCategory} setSubCategory={setSubCategory} flexDirection="row"/>
        </div>
        <div className={styles.createSeriesItem}>
          <h3>제목</h3>
          <InputText value={title} setValue={setTitle} placeholder="제목을 입력하세요" width="auto" height="auto"/>
        </div>
      </div>
      <div><SubmitButton label="시리즈 추가" onClick={handleCreateSeries} /></div>
    </div>
  )
}