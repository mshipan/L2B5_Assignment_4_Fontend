/// <reference types="vite/client" />
interface NavItem {
  path: string;
  label: string;
}

export interface NavbarProps {
  navItems: NavItem[];
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  genre: string;
  isbn: string;
  copies: number;
}

export interface BooksFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  genreFilter: string;
  onGenreFilterChange: (value: string) => void;
  availabilitySort: "none" | "asc" | "desc";
  onAvailabilitySortChange: (value: "none" | "asc" | "desc") => void;
}

export interface BooksPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  book?: Book | null;
}

export interface BorrowFormData {
  quantity: number;
  dueDate: Date;
}

export interface BorrowedBook {
  _id: string;
  title: string;
  isbn: string;
  dueDate: date;
  totalQuantity: number;
}

export interface BorrowSearchBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export interface BorrowSortSelectorProps {
  sortOrder: "latest" | "oldest";
  onSortChange: (val: "latest" | "oldest") => void;
}

export interface BorrowPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
