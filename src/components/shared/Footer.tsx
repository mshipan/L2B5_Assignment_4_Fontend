import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-[85%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Library Management. All rights
            reserved.
          </p>
        </div>

        <div>
          <p className="text-sm">
            Developed by{" "}
            <a
              href="https://github.com/mshipan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#24b7cb] hover:underline"
            >
              Shipan Mallik
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
