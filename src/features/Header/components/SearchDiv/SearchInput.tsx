
import { useState } from "react";
import styles from "features/Header/Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "features/Header/hooks/useSearch";

// 검색창 역할
export function SearchInput(){
  const [searchText, setSearchText] = useState(""); 
  const {handleSearchSubmit} = useSearch();

  return(
    <>
      <input type="text" placeholder="TECH.text에서 찾아보기" 
      value={searchText} className={styles.searchInput} 
      onChange={e => setSearchText(e.target.value)}
      onKeyDown={e => {if(e.key === "Enter") handleSearchSubmit(searchText)}}/>
      <button className={styles.searchBtn} 
      onClick={e => {e.preventDefault(); handleSearchSubmit(searchText);}}>
        <FaSearch/>
      </button>
    </>
  )
}