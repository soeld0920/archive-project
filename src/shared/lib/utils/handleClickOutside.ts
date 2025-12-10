//panel, button ref를 받아 클릭 이벤트 핸들러를 생성.
//훅함수를 받아 이 ref를 제외한 곳에 클릭이벤트가 발생하면 훅함수에 false 주입

export default function handleClickOutside(
  panelRef : React.RefObject<HTMLDivElement | null>, 
  buttonRef : React.RefObject<HTMLButtonElement | null>, 
  hookFunction : (state : boolean) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (panelRef.current && 
      !panelRef.current.contains(event.target as Node) && 
      buttonRef.current && 
      !buttonRef.current.contains(event.target as Node)) {
      hookFunction(false);
    }
  };

  return handleClick;
}