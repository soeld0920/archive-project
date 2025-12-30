import { FaImage, FaVideo } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import { useEditorContext } from "features/Write/context/useEditorContext";
import InputImage from "shared/components/blocks/InputComponets/InputImage";
import { useEffect, useRef, useState } from "react";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function FileToolBar() {
  const {handleImage, handleVideo} = useEditorContext();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const onImageClick = () => {
    imageInputRef.current?.click();
  }

  useEffect(() => {
    if(image) {
      handleImage(image);
      setImage(null);
    }
  }, [image]);

  return (
    <>
      <UtilToolBarItem icon={<FaImage/>} onClick={onImageClick} text="그림"/>
      <InputImage width="100px" height="100px" setImage={setImage} ref={imageInputRef} className={styles.imageInput}/>
      <UtilToolBarItem icon={<FaVideo/>} onClick={() => {handleVideo("")}} text="동영상"/>
    </>
  )
}