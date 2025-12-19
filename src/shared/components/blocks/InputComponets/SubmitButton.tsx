import classNames from "classnames";
import { FaPaperPlane } from "react-icons/fa";
import styles from "shared/styles/shared-components/SubmitButton.module.css";

type SubmitButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  width?: string;
  height?: string;
}

export default function SubmitButton({onClick, label, className, width, height} : SubmitButtonProps){
  const classes = classNames(styles.submitButton, className);
  return(
    <div style={{ width: width, height: height }}>
      <button className={classes} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}