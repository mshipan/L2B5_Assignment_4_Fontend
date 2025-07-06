import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import AllBooks from "@/pages/allBooks/AllBooks";
import CreateBook from "@/pages/createBook/CreateBook";
import BorrowSummary from "@/pages/borrowSummary/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
