import type { FC } from "react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { NavLink } from "react-router";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import type { NavbarProps } from "@/vite-env";

const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 relative">
      <div className="md:max-w-[85%] mx-auto py-2 px-4 md:px-0 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={logo} alt="logo image" className="w-32" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item, i) => (
              <li key={i} className="capitalize">
                <NavLink
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive
                      ? "text-[#24b7cb] text-lg font-bold hover:text-white"
                      : "text-white text-lg font-bold hover:text-[#24b7cb]"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden z-50">
          <MdOutlineMenu
            onClick={() => setIsOpen(true)}
            className="text-white text-4xl cursor-pointer"
          />
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <MdOutlineClose
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl cursor-pointer"
          />
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col items-start px-6 gap-6">
          {navItems.map((item, i) => (
            <li key={i} className="capitalize w-full">
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? "text-[#24b7cb] text-lg font-bold hover:text-white block"
                    : "text-white text-lg font-bold hover:text-[#24b7cb] block"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
