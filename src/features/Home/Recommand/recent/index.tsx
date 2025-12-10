import styles from "./Recent.module.css";
import { FilterStateProvider } from "./context/FilterState";
import { RecentProvider, useRecentContext } from "./context/RecentContext";
import { PageProvider } from "./context/PageContext";
import RecentFilter from "./components/Filter";
import RecentContent from "./components/RecentContent";

export default function Recent(){
  return (
    <div>
      <div className={styles.header}>
        <h2>Resent.text</h2>
        <span>최근 3일 내의 글을 보여드립니다.</span>
      </div>
      <FilterStateProvider>
        <RecentProvider>
          <RecentContentWrapper/>
        </RecentProvider>
      </FilterStateProvider>
    </div>
  );
}

function RecentContentWrapper(){
  const {writings} = useRecentContext();

  if (writings.length === 0) {
    return (
      <div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>
        최근에 작성된 글이 없네요;;;
      </div>
    );
  }

  return (
    <PageProvider>
      <RecentFilter/>
      <RecentContent/>
    </PageProvider>
  );
}

