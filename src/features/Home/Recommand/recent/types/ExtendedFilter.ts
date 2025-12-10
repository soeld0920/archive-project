import type { Filter } from "shared/types/Filter";

export type ExtendedFilter = Filter & {
  tag?: string[];
};

