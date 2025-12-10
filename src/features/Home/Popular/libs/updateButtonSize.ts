export default function updateButtonSize(ref : React.RefObject<HTMLDivElement | null>){
  const updateWidth = () => {
    if (ref?.current) {
      const width = ref.current.offsetWidth;
      document.documentElement.style.setProperty('--criteria-button-container-width', `${width + 10}px`);
    }
  };

  updateWidth();
  window.addEventListener('resize', updateWidth);
  

  return () => {
    window.removeEventListener('resize', updateWidth);
  };
}