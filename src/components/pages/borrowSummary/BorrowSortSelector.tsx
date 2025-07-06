import type { BorrowSortSelectorProps } from "@/vite-env";

const BorrowSortSelector = ({
  sortOrder,
  onSortChange,
}: BorrowSortSelectorProps) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <p className="text-white">Sort By: </p>
    <select
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value as "latest" | "oldest")}
      className="border border-gray-400 rounded px-3 py-2 text-white"
    >
      <option value="latest" className="text-black">
        Latest
      </option>
      <option value="oldest" className="text-black">
        Oldest
      </option>
    </select>
  </div>
);

export default BorrowSortSelector;
