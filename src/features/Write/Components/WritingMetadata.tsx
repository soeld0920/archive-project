/*
  글 메타데이터 설정 컴포넌트
  카테고리, 시리즈, 제목을 설정
*/

import { useState } from "react";
import CategorySelect from "shared/components/features/CategorySelect";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import InputTextNumber from "shared/components/blocks/InputComponets/InputTextNumber";

export default function WritingMetadata() {
  const [title, setTitle] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<MainCategory | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>(undefined);
  const [seriesUuid, setSeriesUuid] = useState<string | undefined>(undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
      {/* 제목 입력 */}
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
          제목
        </label>
        <InputTextNumber
          value={title}
          setValue={setTitle}
          placeholder="글 제목을 입력하세요"
          width="100%"
        />
      </div>

      {/* 카테고리 선택 */}
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
          카테고리
        </label>
        <CategorySelect
          mainCategory={mainCategory}
          subCategory={subCategory}
          setMainCategory={setMainCategory}
          setSubCategory={setSubCategory}
          width="100%"
        />
      </div>

      {/* 시리즈 선택 */}
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
          시리즈 (선택사항)
        </label>
        <InputTextNumber
          value={seriesUuid || ""}
          setValue={(value) => setSeriesUuid(value || undefined)}
          placeholder="시리즈 UUID를 입력하세요"
          width="100%"
        />
      </div>
    </div>
  );
}

