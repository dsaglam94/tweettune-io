import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="max-w-[1100px] mx-auto">
      <div className="sm:flex-row sm:p-8 flex flex-col items-center justify-between gap-5 p-6">
        <Link href="/" className="flex items-center space-x-1">
          <Image
            alt="header text"
            src="/tweettune-icon.png"
            className="sm:w-12 sm:h-12 w-8 h-8"
            width={32}
            height={32}
          />
          <h1 className="sm:text-4xl text-3xl font-bold ml-2 tracking-tight">
            tweetTune
          </h1>
        </Link>

        <Link
          href="https://github.com/dsaglam94/tweettune-io"
          target="_blank"
          className="flex items-center space-x-1 border px-4 py-2 rounded-full border-gray-600 text-gray-600 shadow-lg hover:bg-gray-100"
        >
          <FaGithub size={20} />
          <h1 className="sm:text-sm text-xs font-bold ml-2 tracking-tight">
            Check the project
          </h1>
        </Link>
      </div>
      <div className="w-full border-b-2" />
    </header>
  );
};

export default Header;
