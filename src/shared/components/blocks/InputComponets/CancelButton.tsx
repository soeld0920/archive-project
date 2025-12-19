import classNames from "classnames";
import styles from "shared/styles/shared-components/CancelButton.module.css";

type CancelButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  width?: string;
  height?: string;
}

export default function CancelButton({onClick, label, className, width, height} : CancelButtonProps){
  const classes = classNames(styles.cancelButton, className);
  return(
    <div style={{ width: width, height: height }}>
      <button className={classes} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}