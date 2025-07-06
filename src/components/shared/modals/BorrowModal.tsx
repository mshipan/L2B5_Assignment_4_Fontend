import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/features/allApis/borrowApi/borrowApi";
import type { BorrowFormData, ModalProps } from "@/vite-env";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BorrowModal = ({ open, onClose, book }: ModalProps) => {
  const form = useForm<BorrowFormData>();

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const onSubmit = async (data: BorrowFormData) => {
    if (!book?._id) {
      toast.error("No book selected for borrowing.");
      return;
    }

    const payload = {
      ...data,
      quantity: Number(data.quantity),
      book: book._id,
    };

    try {
      const res = await borrowBook(payload).unwrap();

      if (res.success) {
        toast.success(res.message || "Book borrowed successfully.");
        form.reset();
        onClose();
      } else {
        toast.error(res.message || "Failed to borrow book.");
      }
    } catch (error) {
      const err = error as {
        data?: { error?: string; message?: string };
        message?: string;
      };
      toast.error(err?.data?.error || err?.message || "Borrowing failed!");
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Form {...form}>
        <div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Borrow Book</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground">
                Borrowing:{" "}
                <span className="font-semibold">
                  {book?.title || "No book selected"}
                </span>
              </p>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/** Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  rules={{ required: "Quantity is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg mb-1">
                        Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          placeholder="Enter number of copies..."
                          className="text-black placeholder:text-gray-600 text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/** Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  rules={{ required: "Quantity is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-4">
                      <FormLabel className="text-base sm:text-lg mb-1">
                        Due Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-6">
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
                    {isLoading ? "Borrow..." : "Borrow"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </div>
      </Form>
    </Dialog>
  );
};

export default BorrowModal;
