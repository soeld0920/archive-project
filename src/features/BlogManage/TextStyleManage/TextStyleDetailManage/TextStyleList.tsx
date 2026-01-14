import type { TextStyle } from "shared/types/entity/TextStyle";
import commonStyles from "../../style/BlogManage.module.css";
import { useEffect, useRef, useState } from "react";
import { api } from "axios/api";
import styles from "../../style/TextStyle.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TextStyleList(){
  const [textStyleList, setTextStyleList] = useState<TextStyle[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchTextStyleList = async () => {
      const response = await api.get("/textStyle/me");
      setTextStyleList(response.data);
    }
    fetchTextStyleList();
  }, []);

  useEffect(() => {
    if(textStyleList.length > 5){
      listRef.current!.style.overflowY = "scroll";
    }
  }, [textStyleList, listRef]);

  const genetateLabel = (textStyle: TextStyle) => {
    let label = "";
    if(textStyle.fontFamily) label += `${textStyle.fontFamily.name} | `;
    if(textStyle.textRole) label += `${textStyle.textRole.name} | `;
    if(textStyle.size) label += `${textStyle.size}px | `;
    if(textStyle.bold) label += `굵게 | `;
    if(textStyle.italic) label += `기울임 | `;
    if(textStyle.underline) label += `밑줄 | `;
    if(textStyle.strikeout) label += `취소선 | `;
    if(textStyle.color) label += `색상: ${textStyle.color} | `;
    if(textStyle.highlight) label += `하이라이트: ${textStyle.highlight} | `;
    if(textStyle.align) label += `${textStyle.align == "left" ? "왼쪽 정렬 | " : textStyle.align == "center" ? "가운데 정렬 | " : "오른쪽 정렬 | "}`;
    return label.slice(0, -3);
  }

  return(
    <ul className={commonStyles.scrollableList} ref={listRef}>
      {textStyleList.length === 0 ? (
        <li className={commonStyles.scrollableListItemEmpty}>글자 스타일이 없습니다.</li>
      ) : (
        textStyleList.map((textStyle) => (
          <li key={textStyle.id} className={commonStyles.scrollableListItem}>
            <div className={styles.textStyleItem}>
              <span className={styles.textStyleName}>{textStyle.name}</span>
              <span className={styles.textStyleLabel}>{genetateLabel(textStyle)}</span>
            </div>
            <div className={commonStyles.scrollableListItemButtons}>
              <button className={styles.seriesListItemButton} aria-label="수정"
              onClick={() => {}} disabled={textStyle.id <= 3}
              ><MdEdit /></button>
              <button className={styles.seriesListItemButton} aria-label="삭제"
              onClick={() => {}} disabled={textStyle.id <= 3}
              ><MdDelete /></button>
            </div>
          </li>
        ))
      )}
    </ul>
  )
}
