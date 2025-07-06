import BorrowTable from "@/components/pages/borrowSummary/BorrowTable";
import type { FC } from "react";

const BorrowSummary: FC = () => {
  return (
    <div className="my-8 space-y-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center gap-2">
          Borrow Summary
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          View the list of borrowed books and the total quantity borrowed for
          each.
        </p>
        <div className="w-24 h-1 bg-[#24b7cb] mx-auto rounded-full"></div>
      </div>

      <BorrowTable />
    </div>
  );
};

export default BorrowSummary;
