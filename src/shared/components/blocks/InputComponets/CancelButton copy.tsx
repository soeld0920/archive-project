import classNames from "classnames";
import styles from "shared/styles/shared-components/CommonButton.module.css";

type CommonButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  width?: string;
  height?: string;
}

export default function CommonButton({onClick, label, className, width, height} : CommonButtonProps){
  const classes = classNames(styles.commonButton, className);
  return(
    <div style={{ width: width, height: height }}>
      <button className={classes} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}