/*
	목차 훅 (useTOC)
	- 글 본문(ref)에 포함된 제목(h1~h6)을 스캔하여 목차 배열(`TocType[]`)을 생성합니다.
	- 제목 요소에 id가 없으면 자동으로 slug 스타일의 id를 생성하여 설정합니다.
	- `MutationObserver`로 본문 내용 변경을 감지하여 동적으로 목차를 갱신합니다.

	사용법:
	const { toc, writingRef } = useTOC()
	<div ref={writingRef}>...글 콘텐츠...</div>

	반환값:
	- `toc`: { depth, text, id } 배열 (features/Detail/types/TocType)
	- `writingRef`: 본문을 연결할 `ref` (컴포넌트에 할당)
*/

import { useEffect, useRef, useState } from "react";
import type { TocType } from "../types/TocType";

function slugify(text: string){
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s]+/g, "-")
		.replace(/[^a-z0-9\-]/g, "");
}

export default function useTOC(){
	const writingRef = useRef<HTMLDivElement | null>(null);
	const [toc, setToc] = useState<TocType[]>([]);

	useEffect(() => {
		const el = writingRef.current;
		if(!el) return;

		// 본문에서 h1~h6 요소를 찾아 목차를 생성
		const buildToc = () => {
			const headings = Array.from(el.querySelectorAll('h1,h2,h3,h4,h5,h6')) as HTMLElement[];
			const list: TocType[] = [];

			headings.forEach((h) => {
				const text = (h.textContent || "").trim();
				if(!text) return;

				// id가 없으면 슬러그를 생성하고 중복을 피함
				let id = h.id || slugify(text);
				if(!id) id = String(Math.random()).slice(2);

				// 고유 id 보장
				let unique = id;
				let idx = 1;
				while(document.getElementById(unique)){
					unique = `${id}-${idx++}`;
				}
				id = unique;
				h.id = id;

				const depth = Number(h.tagName.replace('H','')) || 1;
				list.push({ depth, text, id });
			});

			setToc(list);
		};

		// 초기 생성
		buildToc();

		// 본문 내부가 바뀌면 재생성 (동적 로딩/렌더링 대비)
		const mo = new MutationObserver(() => {
			buildToc();
		});
		mo.observe(el, { childList: true, subtree: true });

		return () => {
			mo.disconnect();
		};

	}, [writingRef.current]);

	return { toc, writingRef } as const;
}

