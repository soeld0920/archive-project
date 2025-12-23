/*
  글 작성 페이지
  url : /write
*/

import Wrapper from "shared/components/blocks/Wrapper";
import WriteEditor from "./Components/WriteEditor";
import { useState } from "react";
import InputText from "shared/components/blocks/InputComponets/InputText";
import CategorySelect from "shared/components/features/CategorySelect";
import {  useEditor } from "@tiptap/react";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import { api } from "axois/api";
import { useMessageContext } from "app/providers/message";
import { editorExtensions } from "shared/constants/editor";

export default function WriteFeature(){
  const [title, setTitle] = useState("");
  const [mainCategory, setMainCategory] = useState<MainCategory | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>(undefined);
  const [tag, setTag] = useState<string>("");
  const editor = useEditor({
    extensions: editorExtensions,
    content: 'Hello World!',
  })
  const [messageApi] = useMessageContext();
  //todo : 시리즈 여부 확인 및 이 유저가 가지고있는 시리즈 목록 조회

  const handleSubmit = async () => {
    if(editor?.isEmpty) {
      messageApi.error("내용을 입력해주세요.");
      return;
    }
    else if(title === "") {
      messageApi.error("제목을 입력해주세요.");
      return;
    }
    else if(mainCategory === undefined) {
      messageApi.error("대분류를 선택해주세요.");
      return;
    }
    else if(subCategory === undefined) {
      messageApi.error("소분류를 선택해주세요.");
      return;
    }

    const tags : string[] = tag.split(",");
    const content = editor?.getJSON() || "";
    const subCategoryId : number = subCategory.id;

    await api.post("/writing", {
      title,
      content,
      categoryId :subCategoryId,
      tag : tags,
      //todo : series 결정
      seriesUuid : null
    }).then(() => {
      messageApi.success("작성이 완료되었습니다.");
    }).catch(() => {
      messageApi.error("작성에 실패했습니다.");
    });

  }

  return(
    <Wrapper>
      <InputText value={title} setValue={setTitle} placeholder="제목을 입력하세요" width="500px" height="30px" />
      <CategorySelect mainCategory={mainCategory} subCategory={subCategory} setMainCategory={setMainCategory} setSubCategory={setSubCategory} width="500px" height="30px" />
      <InputText value={tag} setValue={setTag} placeholder="태그를 입력하세요" width="500px" height="30px" />
      <WriteEditor editor={editor}/>
      <SubmitButton onClick={handleSubmit} label="작성하기" width="500px" height="30px" />
    </Wrapper>
  )
}