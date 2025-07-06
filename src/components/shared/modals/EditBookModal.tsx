import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBookMutation } from "@/redux/features/allApis/booksApi/booksApi";
import type { BookFormData, ModalProps } from "@/vite-env";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditBookModal = ({ open, onClose, book }: ModalProps) => {
  const form = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      genre: "",
      isbn: "",
      copies: 0,
    },
  });

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [book, form]);

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const onSubmit = async (data: BookFormData) => {
    if (!book?._id) return;

    const payload = {
      ...data,
      copies: Number(data.copies),
    };

    try {
      const res = await updateBook({ id: book._id, data: payload }).unwrap();

      if (res.success) {
        toast.success(res.message || "Book updated successfully");
        onClose();
      }
    } catch (error) {
      const err = error as {
        data?: { error?: string; message?: string };
        message?: string;
      };
      toast.error(err?.data?.error || err?.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-gray-900 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl sm:text-2xl">
            Edit Book
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Book Title..."
                      className="text-white placeholder:text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Author</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Book Author..."
                      className="text-white placeholder:text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Type Description Here..."
                      className="text-white placeholder:text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Genre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Book Genre..."
                      className="text-white placeholder:text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ISBN + Copies (side-by-side on md+) */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="isbn"
                rules={{ required: "ISBN is required" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-white">ISBN</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Book ISBN..."
                        className="text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copies"
                rules={{ required: "Copies is required" }}
                render={({ field }) => (
                  <FormItem className="md:w-32 w-full">
                    <FormLabel className="text-white">Copies</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value || ""}
                        placeholder="Copies"
                        className="text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer */}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
