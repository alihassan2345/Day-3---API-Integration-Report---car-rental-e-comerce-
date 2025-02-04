import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import React from "react";
import { CiSearch } from "react-icons/ci";
import { VscListFilter } from "react-icons/vsc";
import { FaHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full h-auto border bg-[#C3D4E966] p-4">
      {/* MORENT Heading */}
      <div className="flex justify-between items-center flex-col md:flex-row">
        <Link href={"/"}>
          <h1 className="text-[24px] md:text-[32px] font-bold text-blue-700 md:order-1 md:text-left text-center w-full md:w-auto">
            MORENT
          </h1>
        </Link>

        {/* SEARCH BOX */}
        <div className="w-full md:w-[492px] h-[44px] border-2 bg-white rounded-md flex items-center justify-between px-4 mt-4 md:mt-0 md:order-2">
          <input
            type="text"
            placeholder="Search something here"
            className="flex-grow focus:outline-none text-sm md:text-base"
          />
          <CiSearch className="text-gray-500 cursor-pointer w-5 h-5" />
          <VscListFilter className="text-gray-500 cursor-pointer w-5 h-5" />
        </div>

        {/* Profile and Settings */}
        <div className="flex justify-center items-center gap-4 mt-4 md:mt-0 md:order-3">
          <Link href="/whislist">
            <FaHeart className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer " />
          </Link>
          <FaBell className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
          <IoMdSettings className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
