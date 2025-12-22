/*
  Input type = image 컴포넌트
  이미지 파일을 입력받는 컴포넌트.
*/

import { useMessageContext } from "app/providers/message";
import { api } from "axois/api";
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { parseSizeStringToNum } from "shared/lib/utils/parseSizeStringToNum";
import styles from "shared/styles/shared-components/InputImage.module.css";

type InputImageProps = {
  setImage: (image: string) => void;
  width: string;
  height: string;
  type : "text" | "icon";
}

export default function InputImage({setImage, width, height, type = "icon"} : InputImageProps){
  const [value, setValue] = useState<string>("");
  const [messageApi] = useMessageContext();
  const inputRef = useRef<HTMLInputElement>(null);

  //이미지 파일 저장
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    //이미지 파일 존재 여부 확인
    if(e.target.files?.length === 0){
      messageApi.open({type : "error", content : "이미지 파일을 선택해주세요.", duration : 2});
      setValue("");
      return;
    }

    //이미지 파일 확장자 확인
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file?.name.split(".").pop()?.toLowerCase();
    if(!fileExtension || !allowedExtensions.includes(fileExtension)){
      messageApi.open({type : "error", content : "올바르지 않는 파일 형식입니다.", duration : 2});
      setValue("");
      return;
    }

    //파일 크기 확인
    if(file?.size && file.size > 3 * 1024 * 1024){
      messageApi.open({type : "error", content : "파일 크기가 너무 큽니다. (최대 3MB)", duration : 2});
      setValue("");
      return;
    }

    //업로드
    //FormData를 사용하여 Java MultipartFile로 전송
    if(!file) {
      messageApi.open({type : "error", content : "파일을 선택해주세요.", duration : 2});
      setValue("");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    //성공 시 해당 url이 반환됨. 실패시 에러가 반환됨
    //FormData를 사용하면 브라우저가 자동으로 multipart/form-data와 boundary를 설정함
    //interceptor에서 Content-Type 헤더가 자동으로 제거됨
    const res = await api.post("/upload/", formData);
    if(res.status !== 200){
      messageApi.open({type : "error", content : "이미지 업로드 실패", duration : 2});
      setValue("");
      return;
    }

    console.log(res.data);
    setImage(res.data.url);
    return;
  }

  const handleWrapperClick = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ width: width, height: height }}>
      <div className={styles.wrapper} onClick={handleWrapperClick}>
        <input 
          ref={inputRef}
          type="file" 
          accept="image/*" 
          className={styles.input} 
          onChange={handleImageChange} 
          value={value} 
        />
        {type === "icon" && <CiImageOn size={parseSizeStringToNum(width) / 1.3} />}
        {type === "text" && <span>이미지 업로드</span>}
      </div> 
    </div>
  )
}