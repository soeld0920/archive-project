import styles from "../style/BlogManage.module.css";
import TextStyleDetailManage from "./TextStyleDetailManage";

export default function TextStyleManage(){
  return(
    <ul className={styles.list}>
      <TextStyleDetailManage />
    </ul>
  )
}