import BooksTable from "@/components/pages/allBooks/BooksTable";

const AllBooks = () => {
  return (
    <div className="my-8 space-y-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center gap-2">
          All Library Books
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Explore the complete list of books available in the library.
        </p>
        <div className="w-24 h-1 bg-[#24b7cb] mx-auto rounded-full"></div>
      </div>

      <BooksTable />
    </div>
  );
};

export default AllBooks;
