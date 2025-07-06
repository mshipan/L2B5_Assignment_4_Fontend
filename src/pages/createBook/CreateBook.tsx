import type { FC } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { BookFormData } from "@/vite-env";
import { useCreateBookMutation } from "@/redux/features/allApis/booksApi/booksApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateBook: FC = () => {
  const form = useForm<BookFormData>();
  const navigate = useNavigate();

  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit = async (data: BookFormData) => {
    try {
      const payload = {
        ...data,
        copies: Number(data.copies),
      };

      const result = await createBook(payload).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
      navigate("/books");
    } catch (error) {
      const err = error as {
        data?: { error?: string; message?: string };
        message?: string;
      };

      toast.error(
        err?.data?.message || err?.message || "Something went wrong!"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[95%] sm:w-[90%] md:max-w-xl mx-auto my-8 "
    >
      <Card className="md:my-10 bg-gray-900 border border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-white text-xl sm:text-2xl text-center">
            Add New Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/** Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-base sm:text-lg mb-1">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Your Book Title..."
                        className="text-white placeholder:text-gray-600 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/** Author */}
              <FormField
                control={form.control}
                name="author"
                rules={{ required: "Author is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-base sm:text-lg mb-1">
                      Author
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Book Author..."
                        className="text-white placeholder:text-gray-600 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/** Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-base sm:text-lg mb-1">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        placeholder="Type Description Here..."
                        className="text-white placeholder:text-gray-600 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/** Genre */}
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-white text-base sm:text-lg mb-1">
                      Genre
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full text-white">
                          <SelectValue placeholder="Select a Genre..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non_fiction">Non Fiction</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="biography">Biography</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                {/** ISBN */}
                <FormField
                  control={form.control}
                  name="isbn"
                  rules={{ required: "ISBN is required" }}
                  render={({ field }) => (
                    <FormItem className="w-full md:flex-1">
                      <FormLabel className="text-white text-base sm:text-lg mb-1">
                        ISBN
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Book ISBN..."
                          className="text-white placeholder:text-gray-600 text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/** Copies */}
                <FormField
                  control={form.control}
                  name="copies"
                  rules={{ required: "Copies is required" }}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-32">
                      <FormLabel className="text-white text-base sm:text-lg mb-1">
                        Copies
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          placeholder="Book Copies..."
                          className="text-white placeholder:text-gray-600 text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/** Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="outline"
                  className="cursor-pointer"
                >
                  {isLoading ? "Creating..." : "Create Book"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateBook;
