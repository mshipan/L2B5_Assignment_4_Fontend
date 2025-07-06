import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { FC } from "react";
import { Outlet } from "react-router";

const MainLayout: FC = () => {
  const navItems = [
    { path: "/", label: "home" },
    { path: "/books", label: "all books" },
    { path: "/create-book", label: "add book" },
    { path: "/borrow-summary", label: "borrow summary" },
  ];
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar navItems={navItems} />

      <main className="flex-1 md:max-w-[85%] w-full mx-auto py-6 flex items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
