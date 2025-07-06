import type { BorrowSearchBarProps } from "@/vite-env";

const BorrowSearch = ({ searchTerm, onSearchChange }: BorrowSearchBarProps) => (
  <input
    type="text"
    placeholder="Search by book title..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className="border border-gray-400 rounded px-3 py-2 w-full max-w-sm text-white"
  />
);

export default BorrowSearch;
