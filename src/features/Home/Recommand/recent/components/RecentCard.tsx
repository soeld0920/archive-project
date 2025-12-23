import type { WritingIndex } from "shared/types/entity/Writing";
import styles from "../Recent.module.css";

export default function RecentCard({ item }: { item: WritingIndex  | undefined}){
  if(item === undefined) return null;
  const extraTags = Math.max(0, item.tag.length - 3);
  const showTags = item.tag;

  return (
    <article className={styles.card}>
      {item.image ? (
        <img src={item.image} alt={item.title} className={styles.cardImage} />
      ) : (
        <div className={styles.cardImageEmpty} />
      )}

      <h4 className={styles.cardTitle}>{item.title}</h4>

      <div className={styles.cardTags}>
        {showTags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
        {extraTags > 0 && <span className={styles.tagMore}>+{extraTags}</span>}
      </div>
    </article>
  )
}

