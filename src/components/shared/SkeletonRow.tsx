import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

const SkeletonRow = () => {
  return (
    <TableRow className="animate-pulse bg-gray-800">
      {Array.from({ length: 9 }).map((_, i) => (
        <TableCell key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full rounded bg-gray-700" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeletonRow;
