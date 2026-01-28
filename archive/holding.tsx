
  //카테고리 오픈 - div에 n초 동안 마우스 호버
  const selecterRef = useRef<HTMLDivElement>(null);
  //마우스오버 중 얼마나 오버했는지를 저장. 
  const [hoverTime, setHoverTime] = useState(0);
  //마우스오버 중인지를 체크
  const [isHovering, setIsHovering] = useState(false);
  //마우스오버 감지
  useEventListener("mouseenter", () => {
    setIsHovering(true);
  }, selecterRef as RefObject<HTMLDivElement>);

  useEventListener("mouseout", () => {
    setIsHovering(false);
  }, selecterRef as RefObject<HTMLDivElement>);

  //마우스오버 중이면 hovertime 증가, 도달 시 open 변경
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovering) {
      // hover 해제 시
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setHoverTime(0);
      return;
    }

    // hover 시작
    intervalRef.current = window.setInterval(() => {
      setHoverTime(prev => prev + 100);
    }, 100);

    // cleanup (isHovering 바뀌거나 언마운트)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering]);
  
  useEffect(() => {
    if(hoverTime >= HOVER_TIME){
      setOpenSelectCategory(true);
    }
  }, [hoverTime]);

  //클릭시 즉시 카테고리 오픈
  useEventListener("click", () => {
    setHoverTime(HOVER_TIME)
    setOpenSelectCategory(true);
  }, selecterRef as RefObject<HTMLDivElement>);