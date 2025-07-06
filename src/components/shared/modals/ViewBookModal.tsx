import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ModalProps } from "@/vite-env";

const ViewBookModal = ({ open, onClose, book }: ModalProps) => {
  if (!book) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-gray-900 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl sm:text-2xl text-center">
            Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-semibold capitalize">{book.title}</h2>
            <p className="text-gray-400 text-sm">by {book.author}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-400">Genre</p>
              <p className="capitalize">{book.genre}</p>
            </div>
            <div>
              <p className="text-gray-400">ISBN</p>
              <p>{book.isbn}</p>
            </div>
            <div>
              <p className="text-gray-400">Copies</p>
              <p>{book.copies}</p>
            </div>
            <div>
              <p className="text-gray-400">Availability</p>
              <p
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  book.available
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {book.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Description</p>
            <p className="text-justify leading-relaxed border p-3 rounded-md border-gray-700 bg-gray-800">
              {book.description || "No description provided."}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <DialogClose asChild>
              <Button
                variant="default"
                type="button"
                className="bg-white text-black hover:bg-white cursor-pointer"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookModal;
