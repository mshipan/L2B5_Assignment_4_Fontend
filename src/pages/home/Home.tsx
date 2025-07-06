import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-md sm:max-w-xl md:max-w-3xl text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide break-words">
          Book Management System
        </h1>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 sm:mb-10">
          Manage your library efficiently with powerful tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
          <Button
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => navigate("/books")}
          >
            View Books
          </Button>
          <Button
            className="w-full sm:w-auto cursor-pointer"
            variant="outline"
            onClick={() => navigate("/create-book")}
          >
            Add New Book
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
