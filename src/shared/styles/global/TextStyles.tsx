import { createGlobalStyle } from "styled-components"
import { font, scales, weight } from "../tokens/textStyle"

export const TextStyles = createGlobalStyle`
  :root{
    --scales-xxs : ${scales.xxs}px;
    --scales-xs : ${scales.xs}px;
    --scales-s : ${scales.s}px;
    --scales-sm : ${scales.sm}px;
    --scales-m : ${scales.m}px;
    --scales-ml : ${scales.ml}px;
    --scales-l : ${scales.l}px;
    --scales-xl : ${scales.xl}px;
    --scales-xxl : ${scales.xxl}px;

    --scales-basic : var(--scales-sm);

    --weight-thin : ${weight.thin};
    --weight-regular : ${weight.regular};
    --weight-bold : ${weight.bold};
    --weight-heavy : ${weight.heavy};

    --font-title : ${font.title};
    --font-detailKor : ${font.detailKor};
    --font-detailEng : ${font.detailEng};
    --font-code : ${font.code};
    --font-list : ${font.list};
  }
`