import styles from "styles/modules/Main/Recommand.module.css";
import { FilterStateProvider } from "./context/filterState";
import MRFilter from "./MRFilter";
import MRContent from "./MRContent";

export default function MR(){
  return (
  <div>
    <div className={styles.MRheader}>
      <h2>Resent.text</h2>
      <span>최근 3일 내의 글을 보여드립니다.</span>
    </div>
    <FilterStateProvider>
      <MRFilter/>
      <MRContent/>
    </FilterStateProvider>
  </div>
  );
}