import { FaImage, FaVideo } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";

export default function FileToolBar() {
  return (
    <>
      <UtilToolBarItem icon={<FaImage/>} onClick={() => {}} text="그림"/>
      <UtilToolBarItem icon={<FaVideo/>} onClick={() => {}} text="동영상"/>
    </>
  )
}