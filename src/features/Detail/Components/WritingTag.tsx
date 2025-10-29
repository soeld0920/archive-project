import styles from "styles/modules/DetailPage.module.css"

export default function WritingTag({tag} : {tag : string}){
  return(
    <h4 className={styles.tag}># {tag}</h4>
  )
}