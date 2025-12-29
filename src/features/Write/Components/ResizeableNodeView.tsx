import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import styles from "shared/Write/styles/ResizeableNodeView.module.css";

export default function ResizeableNodeView(props : any){
  const {node, updateAttributes} = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  
  const currentWidth = node.attrs.width === 'auto' ? undefined : node.attrs.width;
  const currentHeight = node.attrs.height === 'auto' ? undefined : node.attrs.height;

  // 드래그 리사이즈 시작
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;
    
    setIsResizing(true);
    const img = containerRef.current.querySelector('img');
    if (!img) return;
    
    const imgRect = img.getBoundingClientRect();
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: imgRect.width,
      height: imgRect.height
    };
  };

  // 드래그 리사이즈 중
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      
      const newWidth = Math.max(50, resizeStartRef.current.width + deltaX);
      const newHeight = Math.max(50, resizeStartRef.current.height + deltaY);
      
      updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, updateAttributes]);

  return (
    <NodeViewWrapper className={styles.resizeableImage}>
      <div ref={containerRef} className={styles.imageContainer}>
        <img 
          src={node.attrs.src} 
          alt="image" 
          style={{
            width: currentWidth || 'auto', 
            height: currentHeight || 'auto',
            maxWidth: '100%',
            display: 'block'
          }} 
          draggable={false}
        />
        <div 
          className={styles.resizeHandle}
          onMouseDown={handleResizeStart}
        />
      </div>
    </NodeViewWrapper>
  )
}