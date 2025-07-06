import { motion } from "framer-motion";
import BorrowModal from "@/components/shared/modals/BorrowModal";
import EditBookModal from "@/components/shared/modals/EditBookModal";
import ViewBookModal from "@/components/shared/modals/ViewBookModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/features/allApis/booksApi/booksApi";
import type { Book } from "@/vite-env";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaBook, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoWarningOutline } from "react-icons/io5";
import { renderToString } from "react-dom/server";
import BooksFilters from "./BooksFilters";
import BooksPagination from "./BooksPagination";
import SkeletonRow from "@/components/shared/SkeletonRow";

const BooksTable = () => {
  const ITEMS_PER_PAGE = 5;
  const iconHtml = renderToString(<IoWarningOutline size={40} color="red" />);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [viewBookModalOpen, setViewBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilitySort, setAvailabilitySort] = useState<
    "none" | "asc" | "desc"
  >("none");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allBooks, isLoading } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const filteredBooks = useMemo(() => {
    if (!allBooks?.data) return [];

    let filtered = allBooks.data;

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered?.filter(
        (book: Book) =>
          book.title.toLowerCase().includes(lowerSearch) ||
          book.author.toLowerCase().includes(lowerSearch)
      );
    }

    if (genreFilter) {
      filtered = filtered?.filter((book: Book) => book.genre === genreFilter);
    }

    if (availabilitySort !== "none") {
      filtered = filtered?.slice()?.sort((a: Book, b: Book) => {
        if (availabilitySort === "asc") {
          return a.available === b.available ? 0 : a.available ? -1 : 1;
        } else {
          return a.available === b.available ? 0 : a.available ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [allBooks, searchTerm, genreFilter, availabilitySort]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBooks?.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenBorrowModal = (book: Book) => {
    setBorrowModalOpen(true);
    setSelectedBook(book);
  };

  const handleCloseBorrowModal = () => {
    setBorrowModalOpen(false);
  };

  const handleOpenEditBookModal = (book: Book) => {
    setEditBookModalOpen(true);
    setSelectedBook(book);
  };

  const handleCloseEditBookModal = () => {
    setEditBookModalOpen(false);
  };

  const handleOpenViewBookModal = (book: Book) => {
    setViewBookModalOpen(true);
    setSelectedBook(book);
  };

  const handleCloseViewBookModal = () => {
    setViewBookModalOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure to delete this?",
      icon: "info",
      iconHtml,
      background: "#1f2937",
      color: "#f1f5f9",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes!",
      cancelButtonText: "No",
      customClass: {
        title: "text-lg sm:text-xl",
        htmlContainer: "text-base text-gray-300",
        confirmButton: "px-4 py-2 text-sm font-medium",
        cancelButton: "px-4 py-2 text-sm font-medium",
        popup: "rounded-lg shadow-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteBook(id).unwrap();

        if (res.success) {
          toast.success(res.message || "Book has been deleted.");
        }
      } catch (error) {
        const err = error as {
          data?: { error?: string; message?: string };
          message?: string;
        };
        toast.error(
          err?.data?.error || err?.message || "Something went wrong!"
        );
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <BooksFilters
        searchTerm={searchTerm}
        onSearchTermChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        genreFilter={genreFilter}
        onGenreFilterChange={(val) => {
          setGenreFilter(val);
          setCurrentPage(1);
        }}
        availabilitySort={availabilitySort}
        onAvailabilitySortChange={(val) => {
          setAvailabilitySort(val);
          setCurrentPage(1);
        }}
      />
      <div className="max-w-screen overflow-x-auto px-2">
        <Table className="w-full max-w-[700px] text-lg text-left border border-gray-700 rounded-lg ">
          <TableHeader className="text-xl">
            <TableRow className="bg-gray-700">
              <TableHead className="px-4 py-2 text-white">#</TableHead>
              <TableHead className="px-4 py-2 text-white">Title</TableHead>
              <TableHead className="px-4 py-2 text-white">Author</TableHead>
              <TableHead className="px-4 py-2 text-white">Genre</TableHead>
              <TableHead className="px-4 py-2 text-white">ISBN</TableHead>
              <TableHead className="px-4 py-2 text-white">Copies</TableHead>
              <TableHead className="px-4 py-2 text-white">
                Availability
              </TableHead>
              <TableHead className="px-4 py-2 text-white">Details</TableHead>
              <TableHead className="px-4 py-2 text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : paginatedBooks?.length > 0 ? (
              paginatedBooks?.map((book: Book, i: number) => (
                <TableRow
                  key={book._id}
                  className="hover:bg-gray-800 transition-colors duration-200 even:bg-gray-900 odd:bg-gray-800"
                >
                  <TableCell className="px-4 py-3 text-white">
                    {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {book.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {book.author}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {book.genre}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {book.isbn}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white">
                    {book.copies}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        book.available
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <FaEye
                      title="View"
                      className="text-green-400 hover:text-green-600 cursor-pointer"
                      onClick={() => handleOpenViewBookModal(book)}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 flex items-center gap-2">
                    <FaEdit
                      title="Edit"
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                      onClick={() => handleOpenEditBookModal(book)}
                    />
                    <FaTrash
                      title="Delete"
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDelete(book._id)}
                    />
                    <FaBook
                      title="Borrow"
                      className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                      onClick={() => handleOpenBorrowModal(book)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-400 py-6 text-base"
                >
                  {searchTerm.trim()
                    ? `No books found for “${searchTerm}”`
                    : "No books available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BooksPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BorrowModal
        open={borrowModalOpen}
        onClose={handleCloseBorrowModal}
        book={selectedBook}
      />
      <EditBookModal
        open={editBookModalOpen}
        onClose={handleCloseEditBookModal}
        book={selectedBook}
      />
      <ViewBookModal
        open={viewBookModalOpen}
        onClose={handleCloseViewBookModal}
        book={selectedBook}
      />
    </motion.div>
  );
};

export default BooksTable;
