import { useEffect, useRef, useState } from "react";
import type { TocType } from "../types/TocType";

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "");
}

export default function useTOC() {
  const writingRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<TocType[]>([]);

  useEffect(() => {
    const el = writingRef.current;
    if (!el) return;


    const collect = () => {
      const hs = el.querySelectorAll<HTMLHeadingElement>("h1, h2, h3, h4, h5, h6");
      const result: TocType[] = Array.from(hs).map((h) => {
        const depth = Number(h.tagName[1]); // 'H2' -> 2
        const text = (h.textContent ?? "").trim();
        let id = h.id;
        if (!id) {
          id = slugify(text);
          if (id) h.id = id; // rehype-slug가 없을 때 대비
        }
        return { depth, text, id };
      });

      setToc(result)
    };

    collect();

    const mo = new MutationObserver(() => collect());
    mo.observe(el, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);

  return { toc, writingRef };
}
