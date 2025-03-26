import { PaginationResponse } from "@/types/index.ts";
import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export interface CustomPagination {
  rowCount: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
}

export function usePagination(
  from: string,
  serverPagination?: PaginationResponse
): CustomPagination {
  const search = useSearch({ from });
  const navigate = useNavigate();

  const pagination: PaginationState = {
    pageIndex: search.page ? Math.max(0, Number(search.page) - 1) : 0,
    pageSize: search.limit
      ? Number(search.limit)
      : serverPagination?.limit || 10,
  };

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;

    navigate({
      search: {
        ...search,
        page: newPagination.pageIndex + 1,
        limit: newPagination.pageSize,
      },
      replace: true,
    });
  };

  return {
    rowCount: serverPagination?.totalItems ?? 0,
    pagination,
    onPaginationChange,
  };
}
