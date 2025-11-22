import { createGlobalStyle } from "styled-components";
import { layout } from "../tokens/layout";

export const Layouts = createGlobalStyle`
  :root{
    --padding-basic : ${layout.s};
    --padding-inside : ${layout.m};
    --padding-inward : ${layout.l};
    --padding-gap : ${layout.gap_s};

    --gap-little : ${layout.gap_s};
    --gap-middle : ${layout.gap_m};
    --gap-large : ${layout.gap_l};
    --gap-more : ${layout.gap_xl};

    --margin-min : ${layout.s};
    --margin-basic : ${layout.m};
    --margin-large : ${layout.l};

    --gap-nav : var(--gap-little);
    --gap-div : var(--gap-large);
    --gap-section : var(--gap-more);
  }
`