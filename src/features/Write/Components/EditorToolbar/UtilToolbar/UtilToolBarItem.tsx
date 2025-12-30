import styles from "features/Write/styles/EditorToolbar.module.css";

type UtilToolBarItemProps = {
  icon : React.ReactNode;
  onClick : () => void;
  text : string;
}

export default function UtilToolBarItem({icon, onClick, text} : UtilToolBarItemProps) {
  return (
    <button className={styles.utilToolBarItem} onClick={onClick}>
      <div className={styles.utilToolBarItemIcon}>{icon}</div>
      <div className={styles.utilToolBarItemText}>{text}</div>
    </button>
  )
}