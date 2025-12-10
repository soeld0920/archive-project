import classNames from "classnames";
import "../../styles/modules/Button.css";

export function PrevButton({ className, onClick }: { className?: string, onClick?: () => void}){
  const classNamess = classNames({"prevButton" : true, [className ?? ""] : true});
  return (
    <button aria-label="이전" onClick={onClick} className={classNamess}>◀</button>
  )
}

export function NextButton({ className, onClick }: { className?: string, onClick?: () => void}){
  const classNamess = classNames({"nextButton" : true, [className ?? ""] : true});
  return (
    <button aria-label="다음" onClick={onClick} className={classNamess}>▶</button>
  )
}