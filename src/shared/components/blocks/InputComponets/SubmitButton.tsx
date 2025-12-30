import classNames from "classnames";
import styles from "shared/styles/shared-components/SubmitButton.module.css";

type SubmitButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  width?: string;
  height?: string;
  fontSize?: string;
}

export default function SubmitButton({onClick, label, className, width, height, fontSize} : SubmitButtonProps){
  const classes = classNames(styles.submitButton, className);
  return(
    <div style={{ width: width, height: height }}>
      <button className={classes} onClick={onClick} style={{ fontSize: fontSize }}>
        {label}
      </button>
    </div>
  )
}