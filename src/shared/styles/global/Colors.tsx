import { createGlobalStyle } from "styled-components";
import { colorTable } from "../tokens/colorStyle";

export const Colors = createGlobalStyle`
  :root{
    --background-wrap :${colorTable.gray_50};
    --background-basic : ${colorTable.gray_100};
    --background-gray : ${colorTable.gray_200};
    --background-darkGray : ${colorTable.gray_300};
    --background-black : ${colorTable.gray_500};
    --background-drakBlack : ${colorTable.gray_500};
    --background-warning : ${colorTable.red_100};
    --background-caution : ${colorTable.yellow_100};
    --background-point : ${colorTable.blue_600};
    --background-point-hazy : ${colorTable.blue_100};
    --background-point-secondary : ${colorTable.blue_300};
    
    --color-text-primary : ${colorTable.gray_700};
    --color-text-secondary : ${colorTable.gray_500};
    --color-text-bold : ${colorTable.gray_800};
    --color-text-heavy : ${colorTable.gray_900};
    --color-text-hazy : ${colorTable.gray_400};
    --color-text-error : ${colorTable.red_600};
    --color-text-warning : ${colorTable.red_500};
    --color-text-attention : ${colorTable.yellow_600};
    --color-text-caution : ${colorTable.yellow_400};
    --color-text-semiHighlight : ${colorTable.blue_300};
    --color-text-highlight : ${colorTable.blue_600};

    --border-color : var(--background-darkGray);
    --border-color-gray : ${colorTable.gray_400};
    --border-color-black : ${colorTable.gray_700};
    --border-color-blue : ${colorTable.blue_600};

    --surface-wrap: var(--background-wrap);
    --surface-card: var(--background-basic);
    --surface-muted: var(--background-gray);
  }
`