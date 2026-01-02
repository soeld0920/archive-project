import { useEffect, useRef, useState, type RefObject } from "react"
import { useEventListener } from "usehooks-ts"
import { useEditorContext } from "features/Write/context/useEditorContext";
import classNames from "classnames";
import styles from "features/Write/styles/EditorToolbar.module.css";

type SelectTableProps = {
  active: boolean;
  setActive: (active: boolean) => void;
}

export function SelectTable({ active, setActive }: SelectTableProps){
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const {insertTable} = useEditorContext();

  useEventListener("mouseover", (e) => {
    const target = e.target as HTMLTableCellElement;
    const rowIndex = target.getAttribute("data-row");
    const colIndex = target.getAttribute("data-col");
    setRow(Number(rowIndex));
    setCol(Number(colIndex));
  },  tableRef as unknown as RefObject<Document>)

  useEventListener("click", () => {
    insertTable(row, col);
    setActive(false);
  },  tableRef as unknown as RefObject<Document>)

  return(
    <div className={classNames(styles.selectTableWrapper, { [styles.selectTableWrapperActive]: active })}>
      <div className={styles.selectTableTitle}>{row} x {col}</div>
      <table ref={tableRef} className={styles.selectTable}>
        <tbody>
        {
          Array.from({length: 10}, (_, rowIndex) => (
            <tr key={rowIndex}>
              {
                Array.from({length: 10}, (_, colIndex) => (
                  <td key={colIndex} data-row={rowIndex + 1} data-col={colIndex + 1} 
                  className={(row >= rowIndex + 1 && col >= colIndex + 1) ? styles.selectTableCell : ""}/>
                ))
              }
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  )
}