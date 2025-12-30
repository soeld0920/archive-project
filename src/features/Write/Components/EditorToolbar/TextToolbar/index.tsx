import TextStyleToolbar from "./TextStyleToolbar";
import TextStateToolbar from "./TextStateToolbar";
import styles from "features/Write/styles/EditorToolbar.module.css";
import TextAlign from "./TextAlign";

export default function TextToolbar() {
  
  return (
    <>
      <TextStyleToolbar/>
      <div className={styles.textToolbarLine}></div>
      <TextStateToolbar/>
      <div className={styles.textToolbarLine}></div>
      <TextAlign/>
    </>
  )
}