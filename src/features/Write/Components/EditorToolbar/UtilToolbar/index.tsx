import styles from "features/Write/styles/EditorToolbar.module.css";
import FileToolBar from "./FileToolBar";
import FormToolBar from "./FormToolBar";
import CodeToolBar from "./CodeToolBar";

export default function UtilToolbar() {
  return (
    <div className={styles.utilToolbar}>
      <FileToolBar/>
      <div className={styles.utilToolbarSeparator}/>
      <FormToolBar/>
      <div className={styles.utilToolbarSeparator}/>
      <CodeToolBar/>
    </div>
  )
}