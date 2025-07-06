import type { BorrowPaginationProps } from "@/vite-env";

const BorrowPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: BorrowPaginationProps) => (
  <div className="flex justify-center mt-4 space-x-2">
    {Array.from({ length: totalPages }, (_, idx) => (
      <button
        key={idx}
        onClick={() => onPageChange(idx + 1)}
        disabled={currentPage === idx + 1}
        className={`px-3 py-1 rounded ${
          currentPage === idx + 1
            ? "bg-blue-600 text-white cursor-default"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        {idx + 1}
      </button>
    ))}
  </div>
);

export default BorrowPagination;
