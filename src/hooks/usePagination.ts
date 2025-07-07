import { useState } from "react";

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  return { currentPage, setCurrentPage, handleNextPage, handlePreviousPage };
}
