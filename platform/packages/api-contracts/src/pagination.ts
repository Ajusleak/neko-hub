import type { PageInfo } from "@neikos/domain-types";

export interface PaginatedData<T> {
  readonly items: readonly T[];
  readonly page: PageInfo;
}
