import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/tweettune-icon.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          tweetTune
        </h1>
      </Link>
    </header>
  );
};

export default Header;
