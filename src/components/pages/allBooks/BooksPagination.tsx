import { Button } from "@/components/ui/button";
import type { BooksPaginationProps } from "@/vite-env";
import type { FC } from "react";

const BooksPagination: FC<BooksPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-3 text-white select-none">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 cursor-pointer"
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`btn btn-sm ${
            currentPage === pageNum ? "btn-primary" : "btn-outline"
          }`}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};

export default BooksPagination;
