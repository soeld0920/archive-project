import styles from "features/Write/styles/Tags.module.css";

type TagInputItemProps = {
  tag : string;
}

export default function TagInputItem({tag} : TagInputItemProps) {
  return (
    <div className={styles.tagItem}>
      <span>#</span>
      <span>{tag}</span>
    </div>
  )
}