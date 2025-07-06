import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/features/allApis/borrowApi/borrowApi";
import type { BorrowedBook } from "@/vite-env";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useMemo, useState } from "react";
import BorrowSearch from "./BorrowSearch";
import BorrowSortSelector from "./BorrowSortSelector";
import BorrowPagination from "./BorrowPagination";
import SkeletonRow from "@/components/shared/SkeletonRow";

const BorrowTable = () => {
  const { data: borrowSummary, isLoading } =
    useGetBorrowSummaryQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatWithOrdinal = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayWithOrdinal = format(date, "do", { locale: enUS });
    const rest = format(date, "MMMM yyyy");
    return `${dayWithOrdinal} ${rest}`;
  };

  const filteredData = useMemo(() => {
    if (!borrowSummary?.data) return [];

    return borrowSummary.data.filter((item: BorrowedBook) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [borrowSummary, searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const dateA = new Date(a.dueDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.dueDate || b.createdAt || 0).getTime();

      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredData, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-0"
    >
      <div className="flex items-end justify-between gap-2 mb-4 px-2">
        <BorrowSearch
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
        />
        <BorrowSortSelector
          sortOrder={sortOrder}
          onSortChange={(val) => {
            setSortOrder(val);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="max-w-screen overflow-x-auto px-2">
        <Table className="w-full min-w-[700px] text-lg text-left border border-gray-700 rounded-lg">
          <TableHeader className="text-xl">
            <TableRow className="bg-gray-700">
              <TableHead className="px-4 py-2 text-white">#</TableHead>
              <TableHead className="px-4 py-2 text-white">Book Title</TableHead>
              <TableHead className="px-4 py-2 text-white">ISBN</TableHead>
              <TableHead className="px-4 py-2 text-white">Due Date</TableHead>
              <TableHead className="px-4 py-2 text-white text-center">
                Total Quantity Borrowed
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : paginatedData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-white py-4">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData?.map((borrow: BorrowedBook, i: number) => (
                <TableRow
                  key={borrow._id}
                  className="hover:bg-gray-800 transition-colors duration-200 even:bg-gray-900 odd:bg-gray-800"
                >
                  <TableCell className="px-4 py-3 text-white">
                    {i + 1 + (currentPage - 1) * itemsPerPage}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {borrow.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {borrow.isbn}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {borrow.dueDate ? formatWithOrdinal(borrow.dueDate) : "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white text-center">
                    {borrow.totalQuantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BorrowPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.div>
  );
};

export default BorrowTable;
