import { useState, useMemo } from 'react';

type UsePaginatorProps = {
  total?: number;
  initialState: {
    pageSize?: number;
    currentPage: number;
    isDisabled?: boolean;
  };
};

export const usePaginator = ({ total, initialState }: UsePaginatorProps) => {
  const [pageSize, setPageSize] = useState<number>(initialState.pageSize ?? 0);
  const [currentPage, setCurrentPage] = useState<number>(initialState.currentPage);
  const [isDisabled, setIsDisabled] = useState<boolean>(initialState.isDisabled ?? false);

  const offset = useMemo(() => {
    if (!pageSize) {
      return 0;
    }
    return currentPage * pageSize - pageSize;
  }, [currentPage, pageSize]);

  const pagesQuantity = useMemo(() => {
    if (!total || !pageSize) {
      return 0;
    }
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  return {
    offset,
    currentPage,
    pagesQuantity,
    setCurrentPage,
    pageSize,
    setPageSize,
    isDisabled,
    setIsDisabled,
  };
};
