import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BooksFiltersProps } from "@/vite-env";
import type { FC } from "react";

const BooksFilters: FC<BooksFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  genreFilter,
  onGenreFilterChange,
  availabilitySort,
  onAvailabilitySortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 max-w-6xl mx-auto px-2">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full sm:w-1/3 text-white"
      />

      {/* Genre Filter */}
      <Select
        value={genreFilter}
        onValueChange={(value) =>
          onGenreFilterChange(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-full sm:w-1/4 text-white capitalize">
          <SelectValue placeholder="Filter by genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non_fiction">Non Fiction</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="biography">Biography</SelectItem>
          <SelectItem value="fantasy">Fantasy</SelectItem>
        </SelectContent>
      </Select>

      {/* Availability Sort */}
      <Select
        value={availabilitySort}
        onValueChange={(value) =>
          onAvailabilitySortChange(value as "none" | "asc" | "desc")
        }
      >
        <SelectTrigger className="w-full sm:w-1/4 text-white">
          <SelectValue placeholder="Sort by Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Sort</SelectItem>
          <SelectItem value="asc">Available First</SelectItem>
          <SelectItem value="desc">Unavailable First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BooksFilters;
