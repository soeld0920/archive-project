import type { WritingIndex } from "shared/types/Writing";
import styles from "styles/modules/Main/Recommand.module.css";

export default function MRCard({ item }: { item: WritingIndex }){
  const extraTags = Math.max(0, item.tag.length - 3);
  const showTags = item.tag.slice(0,3);

  return (
    <article className={styles.mrCard}>
      {item.image ? (
        <img src={item.image} alt={item.title} className={styles.mrCardImage} />
      ) : (
        <div className={styles.mrCardImageEmpty} />
      )}

      <h4 className={styles.mrCardTitle}>{item.title}</h4>

      <div className={styles.mrCardTags}>
        {showTags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
        {extraTags > 0 && <span className={styles.tagMore}>+{extraTags}</span>}
      </div>
    </article>
  )
}
