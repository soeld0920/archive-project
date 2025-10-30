import {HighlightSpan} from "components/shared/HighlightSpan"
import styles from "styles/modules/Header.module.css"
import logo from "assets/img/logo-main.png"
import { FaRandom,FaSearch,FaStar  } from "react-icons/fa";
import { IoTimerSharp } from "react-icons/io5";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, } from "react";
import { categories as categoryList, type MainCategory, type SearchParams, type SubCategory } from "content/category";
import classNames from "classnames";

export default function Header(){
  return(
    <header className={styles.header}>
      <div className={styles.topNav}>
        <HighlightSpan>한국어로 배우는 쉬운 컴퓨터공학</HighlightSpan>
        <nav aria-label="유틸 메뉴">
          <ul>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/join">회원가입</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.mainNav}>
        <Link to="/" aria-label="홈으로"><img src={logo} alt="로고이미지" /></Link>
        <SearchDiv/>
        <ul className={styles.subNav} aria-label="보조 메뉴">
          <li className={styles.subNavBtn}><Link to="/" title="무작위 페이지" aria-label="무작위 페이지"><FaRandom/></Link></li>
          <li className={styles.subNavBtn}><Link to="/" title="인기있는 페이지" aria-label="인기있는 페이지"><FaStar/></Link></li>
          <li className={styles.subNavBtn}><Link to="/" title="최근 수정된 페이지" aria-label="최근 수정된 페이지"><IoTimerSharp/></Link></li>
        </ul>
      </div>
    </header>
  )
}



function SearchDiv(){
  const [maincategory, setMaincategory] = useState("카테고리");
  const [subcategory, setSubcategory] = useState("");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  const closeHidden = () => setOpen(false);

  const onSubmit = () => {
    if(searchText === "") {alert("검색어를 입력해주세요."); return;}
    let params : SearchParams = {detail : searchText};
    if(maincategory !== "카테고리") params.mainCategory = maincategory as MainCategory;
    if(subcategory !== "") params.subCategory = subcategory as SubCategory;
    navigate({pathname : "/search", search : `?${createSearchParams(params)}`})
  }

  return(
    <div style={{position : "relative"}}>
      <div className={styles.searchDiv}>
        <button className={styles.searchCategory} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="category-popover" aria-haspopup="dialog" type="button" ref={toggleRef}>
          <HighlightSpan className={styles.categoryText}>{maincategory}</HighlightSpan>
          <span className={styles.subcategoryText}>{subcategory}</span>
        </button>
        <input type="text" placeholder="TECH.text에서 찾아보기" value={searchText} className={styles.searchInput} onChange={e => setSearchText(e.target.value)} onKeyDown={e => {if(e.key === "Enter") onSubmit()}}/>
        <button className={styles.searchBtn} onClick={e => {e.preventDefault(); onSubmit()}}><FaSearch/></button>
      </div>
      <CategoryHidden setMaincategory={setMaincategory} setSubcategory={setSubcategory} closeHidden={closeHidden} open={open} toggleRef={toggleRef}/>
    </div>
  )
}



type CategoryHiddenProps = {
  setMaincategory : (text : string) => void
  setSubcategory : (text : string) => void
  closeHidden : () => void
  open : boolean
  toggleRef : React.RefObject<HTMLButtonElement | null>;
}

function CategoryHidden({setMaincategory, setSubcategory, closeHidden, open, toggleRef} : CategoryHiddenProps){ 
  const [subNav, setSubNav] = useState<{text : string, subCategory : string[]}>({text : "", subCategory : []})
  const categoryRoot = useMemo(() => categoryList.map((c,i) => ({...c, "focused" : false, id : i})), []);
  const [categories, setCategories] = useState(categoryRoot)
  const [activeCategory , setActiveCategory] = useState<{categorySection : "main" | "sub" | "none", idx : number}>({categorySection : "none", idx : 0});

  useEffect(() => {
    setSubNav({ text: "", subCategory: [] });
    setCategories(categoryRoot);
    
    if (!open) return;
    setActiveCategory({categorySection : "none", idx : 0});
    setMaincategory("카테고리");
    setSubcategory("");
  }, [open]);


  const onMainSelect = (id: number) => {
    const selected = categories.find(c => c.id === id);
    if (!selected) return;

    setCategories(prev => prev.map(item => ({ ...item, focused: item.id === id })));

    setSubNav({ text: selected.text, subCategory: selected.subCategory });
    setMaincategory(selected.text);
  };

  const onSubSelect = (item : string | number | undefined) => {
    if(typeof item === "number") item = subNav.subCategory.find((_,i) => i === item);
    if(!item) return
    setSubcategory(item);
    closeHidden();
  }

  // 최신 값 보관용 ref
  const activeRef = useRef(activeCategory);
  useEffect(() => { activeRef.current = activeCategory; }, [activeCategory]);

  const countsRef = useRef({ main: 0, sub: 0 });
  useEffect(() => {
    countsRef.current = {
      main: categories.length,
      sub: subNav.subCategory.length,
    };
  }, [categories.length, subNav.subCategory.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      const dir = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeHidden();
          break;

        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault();
          setActiveCategory(prev => {
            if (prev.categorySection === "none") return { categorySection: "main", idx: 0 };
            const len = prev.categorySection === "main" ? countsRef.current.main
                    : prev.categorySection === "sub"  ? countsRef.current.sub : 1;
            if (!len) return prev;
            return { ...prev, idx: (prev.idx + dir + len) % len };
          });
          break;

        case "ArrowRight":
          e.preventDefault();
          setActiveCategory(prev => {
            if (prev.categorySection === "none") return { categorySection: "main", idx: 0 };
            if (prev.categorySection === "main" && countsRef.current.sub > 0)
              return { categorySection: "sub", idx: 0 };
            return prev;
          });
          break;

        case "ArrowLeft":
          e.preventDefault();
          setActiveCategory(prev => {
            if (prev.categorySection === "sub") return { categorySection: "main", idx: 0 };
            if (prev.categorySection === "none") return { categorySection: "main", idx: 0 };
            return prev;
          });
          break;

        case "Enter":
          e.preventDefault();
          const cur = activeRef.current;
          if (cur.categorySection === "main") {
            onMainSelect(cur.idx);
            setActiveCategory({ categorySection: "sub", idx: 0 });
          } else if (cur.categorySection === "sub") {
            onSubSelect(subNav.subCategory[cur.idx]);
          }
          break;
      }
    };


    window.addEventListener("keydown",  onKeyDown);
    return () => {window.removeEventListener("keydown", onKeyDown);}
  }, [open, closeHidden, onMainSelect, onSubSelect]);


  const panelRef = useRef<HTMLDivElement>(null);     // 히든 div
  useEffect(() => {
    if (!open) return; // 열릴 때만 리스너 등록

    const onOutside = (e: PointerEvent) => {
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      console.log(e.target)
      if (!panel) return;

      const target = e.target as Node;
      // 패널 내부 or 토글 버튼 클릭은 무시
      if (panel.contains(target) || (toggle && toggle.contains(target))) return;

      closeHidden();
    };

    window.addEventListener("pointerdown", onOutside);
    return () => window.removeEventListener("pointerdown", onOutside);
  }, [open, closeHidden]);

  return(
    <div ref={panelRef} className={classNames(styles.categoryHidden, subNav.text !== "" && styles.showSubNav, open && styles.isOpen)}>
      <div style={{display:"flex", height : "400px"}}>
        <div className={classNames(styles.panelHeader, subNav.text !== "" && styles.showSubNav, open && styles.isOpen)}>
          <MainCategoryList items={categories.map(c => ({id : c.id,text : c.text,focused : c.focused}))} onSelect={onMainSelect} active={activeCategory.categorySection === "main" ? activeCategory.idx : undefined}/>
        </div>
        <div className={classNames(styles.body, subNav.text !== "" && styles.showSubNav)}>
          <SubCategoryList label={subNav.text} items={subNav.subCategory} onSelect={onSubSelect} active={activeCategory.categorySection === "sub" ? activeCategory.idx : undefined}/>
        </div>
      </div>
      <div className={classNames(styles.bottomBox, subNav.text !== "" && styles.showSubNav, open && styles.isOpen)} >
        <button onClick={closeHidden}>닫기 ×</button>
      </div>
    </div>
  )
}

type MainCategoryListProps = {
  items: { id: number; text: string; focused: boolean }[];
  onSelect: (id: number) => void;
  active? : number
};

function MainCategoryList({items, onSelect, active} : MainCategoryListProps){
  return(
    <>
      <div className={styles.title}>
        <HighlightSpan>대분류선택</HighlightSpan>
      </div>
      <ul className={styles.mainCategoryNav}>
        {
          items.map((item,i) => {
            return(
              <li key={item.id} style={{height : `calc(100% / ${items.length})`,backgroundColor : item.focused ? "var(--background-point-hazy)" : "transparent", textDecoration : active === i ? "underline" : "none"}}>
                <button onClick={() => onSelect(item.id)} className="navItem">
                  {item.text}
                </button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

type SubCategoryListProps = {
  label: string;
  items: string[];
  onSelect: (text: string) => void;
  active? : number
};

function SubCategoryList({label, items, onSelect, active} : SubCategoryListProps){
  return(
    <>
      <div className={styles.title}>
        <HighlightSpan>{label}의 소분류선택</HighlightSpan>
      </div>
      <ul className={styles.subCategoryNav}>
        {
          items.map((item,i) => {
            return(
              <li key={item}>
                <button onClick={() => onSelect(item)} className="navItem"  style={{textDecoration : active === i ? "underline" : "none"}}>
                  {item}
                </button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

