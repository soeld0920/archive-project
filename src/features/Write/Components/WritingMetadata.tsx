/*
  글 메타데이터 설정 컴포넌트
  카테고리, 시리즈, 제목을 설정
*/

import { useEffect, useState } from "react";
import CategorySelect from "shared/components/features/CategorySelect";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import InputText from "shared/components/blocks/InputComponets/InputText";
import styles from "features/Write/styles/WritingMetadata.module.css";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import { api } from "axios/api";
import type { SeriesIndex } from "../types/SeriesIndex";
import { useWriteContext } from "../context/useWriteContext";

export default function WritingMetadata() {
  const {title, setTitle, categoryId, setCategoryId, setSeriesUuid} = useWriteContext();
  const [mainCategory, setMainCategory] = useState<MainCategory | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>(undefined);
  const [series, setSeries] = useState<SeriesIndex | undefined>(undefined);

  const fetchSeries = async () => {
    const response = await api.get("/series/me/index");
    return response.data;
  }

  useEffect(() => {
    if(series) {
      setSeriesUuid(series.seriesUuid);
    }
  }, [series?.seriesUuid]);

  useEffect(() => {
    if(subCategory) {
      setCategoryId(subCategory.id);
    }
  }, [subCategory?.id]);

  useEffect(() => {
    if(categoryId && mainCategory === undefined && subCategory === undefined) {
      const fetchCategory = async () => {
        const response = await api.get(`/category/detail/${categoryId}`);
        return response.data;
      }
      fetchCategory().then((data) => {
        setMainCategory(data.mainCategory);
        setSubCategory(data.subCategory);
      });
    }
  }, [categoryId]);

  return (
    <div className={styles.writingMetadataWrapper}>
      {/* 카테고리 선택 */}
      <div className={styles.categorySelectWrapper}>
        <label className={styles.selectLabel}>
          카테고리 :
        </label>
        <CategorySelect
          mainCategory={mainCategory}
          subCategory={subCategory}
          setMainCategory={setMainCategory}
          setSubCategory={setSubCategory}
          flexDirection="row"
          width="300px"
        />
      </div>

      {/* 시리즈 선택 */}
      <div className={styles.seriesSelectWrapper}>
        <label className={styles.selectLabel}>
          시리즈 :
        </label>
        <Dropdown options={[]} setOptions={fetchSeries} value={series} onChange={setSeries}
          toString={(value) => value.title}
          label={series?.title || "시리즈 없음"} width="300px" height="40px" />
      </div>

      {/* 제목 입력 */}
      <div className={styles.titleInputWrapper}>
        <InputText
          value={title}
          setValue={setTitle}
          placeholder="제목"
          width="100%"
          className={styles.titleInput}
          border={false}
        />
      </div>
    </div>
  );
}

