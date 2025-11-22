import { useState, useCallback } from "react";
import { categories, type MainCategory, type SubCategory, SUB_MAP } from "shared/types/category";
import styles from "styles/modules/Main/Popular.module.css";

type MPFilterCategoryProps = {
  selectedMainCategory: MainCategory | null;
  selectedSubCategory: SubCategory | null;
  onMainCategorySelect: (category: MainCategory) => void;
  onSubCategorySelect: (subCat: SubCategory) => void;
}

export default function MPFilterCategory({
  selectedMainCategory,
  selectedSubCategory,
  onMainCategorySelect,
  onSubCategorySelect,
}: MPFilterCategoryProps) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openMainCategory, setOpenMainCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const handleMainCategorySelect = useCallback((category: MainCategory) => {
    onMainCategorySelect(category);
    setOpenMainCategory(false);
    setOpenSubCategory(true);
  }, [onMainCategorySelect]);

  const handleSubCategorySelect = useCallback((subCat: SubCategory) => {
    onSubCategorySelect(subCat);
    setOpenSubCategory(false);
  }, [onSubCategorySelect]);

  const toggleCategory = useCallback(() => {
    setOpenCategory(prev => !prev);
  }, []);

  const toggleMainCategory = useCallback(() => {
    setOpenMainCategory(prev => !prev);
  }, []);

  const toggleSubCategory = useCallback(() => {
    if (selectedMainCategory) {
      setOpenSubCategory(prev => !prev);
    }
  }, [selectedMainCategory]);

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

