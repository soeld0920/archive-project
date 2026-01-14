import { useSeriesContext } from "./context/useSeries";
import { useEffect, useRef } from "react";
import commonStyles from "features/BlogManage/style/BlogManage.module.css";
import { RxDragHandleHorizontal } from "react-icons/rx";
import styles from "../../style/SeriesManage.module.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { WritingIndex } from "shared/types/entity/Writing";

interface SortableItemProps {
  writing: WritingIndex;
  index: number;
}

function SortableItem({ writing, index }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: writing.writingUuid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      className={commonStyles.scrollableListItem}
    >
      <div className={styles.writingListItemContent}>
        <span 
          className={styles.writingListItemDragHandle}
          {...attributes}
          {...listeners}
        >
          <RxDragHandleHorizontal />
        </span>
        <span className={styles.writingListItemIndex}>#{index + 1}</span>
        <span className={styles.writingListItemTitle}>{writing.writingTitle}</span>
      </div>
    </li>
  );
}

export default function WritingList(){
  const { series, writingList, setWritingList } = useSeriesContext();
  const listRef = useRef<HTMLUListElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if(writingList.length > 5) {
      listRef.current!.style.overflowY = 'scroll';
    }
  }, [writingList, listRef.current]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWritingList((items) => {
        const oldIndex = items.findIndex((item) => item.writingUuid === active.id);
        const newIndex = items.findIndex((item) => item.writingUuid === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return(
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={writingList.map((writing) => writing.writingUuid)}
        strategy={verticalListSortingStrategy}
      >
        <ul ref={listRef} className={commonStyles.scrollableList}>
          {
            series == null ? (
              <li className={commonStyles.scrollableListItemEmpty}>시리즈를 선택해주세요</li>
            ) : writingList.length === 0 ? (
              <li className={commonStyles.scrollableListItemEmpty}>글이 없습니다.</li>
            ) : (
              writingList.map((writing, index) => (
                <SortableItem key={writing.writingUuid} writing={writing} index={index} />
              ))
            )
          }
        </ul>
      </SortableContext>
    </DndContext>
  )
}