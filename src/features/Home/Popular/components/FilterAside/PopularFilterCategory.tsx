import { useState } from "react";
import { type MainCategory, type SubCategory } from "shared/types/entity/Category";
import styles from "features/Home/Popular/Popular.module.css";
import { useFilterStateContext } from "../../context/filterState";

export default function PopularFilterCategory() {
  const {setFilterMainCategory, setFilterSubCategory} = useFilterStateContext();
  const {filter} = useFilterStateContext();
  const selectedMainCategory = filter.mainCategory;
  const selectedSubCategory = filter.subCategory;
  const [openCategory, setOpenCategory] = useState(false);
  const [openMainCategory, setOpenMainCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const handleMainCategorySelect = (category: MainCategory) => {
    setFilterMainCategory(category);
    setFilterSubCategory(undefined);
    setOpenMainCategory(false);
    setOpenSubCategory(true);
  };

  const handleSubCategorySelect = (subCat: SubCategory) => {
    setFilterSubCategory(subCat);
    setOpenSubCategory(false);
  };

  const toggleCategory = () => {
    setOpenCategory(prev => !prev);
  };

  const toggleMainCategory = () => {
    setOpenMainCategory(prev => !prev);
  };

  const toggleSubCategory = () => {
    if (openMainCategory) {
      setOpenSubCategory(prev => !prev);
    }
  };

  return (
    <div className={styles.filterCategory}>
      <button 
        className={styles.filterCategoryTitle}
        onClick={toggleCategory}
      >
        <span>카테고리{selectedMainCategory ? ` : ${selectedMainCategory}` : ""}</span>
        <span className={styles.filterIcon}>{openCategory ? "▼" : "▶"}</span>
      </button>
      
      {openCategory && (
        <div className={styles.filterCategoryContent}>
          {/* 대분류 */}
          <div className={styles.filterMainCategory}>
            <button 
              className={styles.filterSubTitle}
              onClick={toggleMainCategory}
            >
              <span>대분류{selectedMainCategory ? ` : ${selectedMainCategory}` : ""}</span>
              <span className={styles.filterIcon}>{openMainCategory ? "▼" : "▶"}</span>
            </button>
            
            {openMainCategory && (
              <div className={styles.filterMainCategoryValues}>
                {categories.map((category) => (
                  <button
                    key={category.text}
                    className={styles.filterMainCategoryItem}
                    onClick={() => handleMainCategorySelect(category.text as MainCategory)}
                  >
                    {category.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 소분류 */}
          <div className={styles.filterSubCategory}>
            <button 
              className={`${styles.filterSubTitle} ${!selectedMainCategory ? styles.disabled : ""}`}
              onClick={toggleSubCategory}
              disabled={!selectedMainCategory}
            >
              <span>소분류{selectedSubCategory ? ` : ${selectedSubCategory}` : ""}</span>
              <span className={styles.filterIcon}>{openSubCategory ? "▼" : "▶"}</span>
            </button>
            
            {openSubCategory && selectedMainCategory && (
              <div className={styles.filterSubCategoryValues}>
                {Array.from(SUB_MAP.get(selectedMainCategory) || []).map((subCat) => (
                  <button
                    key={subCat}
                    className={styles.filterSubCategoryItem}
                    onClick={() => handleSubCategorySelect(subCat as SubCategory)}
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


