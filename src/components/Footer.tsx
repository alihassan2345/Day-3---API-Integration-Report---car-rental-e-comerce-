import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col md:flex-row md:items-start">
        {/* MORENT LOGO and PARAGRAPH */}
        <div className="w-full md:w-64 text-center md:text-left flex flex-col items-center md:items-start">
          <span className="text-[36px] text-blue-600 font-bold">MORENT</span>
          <p className="mt-2 text-sm text-gray-500 text-center md:text-left">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        {/* Links Section (About, Community, Socials) */}
        <div className="flex-grow flex flex-col md:flex-row gap-10 mt-10 md:mt-0 text-center md:text-left">
          {/* About Section */}
          <div className="w-full md:w-1/3 flex flex-col">
            <h2 className="title-font text-[20px] font-bold text-gray-900 tracking-widest mb-3">
              About
            </h2>
            <ul className="gap-y-4 flex flex-col font-normal">
              <li>
                <Link href={""}>How it works</Link>
              </li>
              <li>
                <Link href={""}>Featured</Link>
              </li>
              <li>
                <Link href={""}>Partnership</Link>
              </li>
              <li>
                <Link href={""}>Business Relation</Link>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="w-full md:w-1/3 flex flex-col">
            <h2 className="title-font text-[20px] font-bold text-gray-900 tracking-widest mb-3">
              Socials
            </h2>
            <ul className="gap-y-4 flex flex-col font-normal">
              <li>
                <Link href={""}>Discord</Link>
              </li>
              <li>
                <Link href={""}>Instagram</Link>
              </li>
              <li>
                <Link href={""}>Twitter</Link>
              </li>
              <li>
                <Link href={""}>Facebook</Link>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="w-full md:w-1/3 flex flex-col mt-10 md:mt-0">
            <h2 className="title-font text-[20px] font-bold text-gray-900 tracking-widest mb-3">
              Categories
            </h2>
            <ul className="gap-y-4 flex flex-col font-normal">
              <li>
                <Link href={""}>Web Development</Link>
              </li>
              <li>
                <Link href={""}>Mobile Apps</Link>
              </li>
              <li>
                <Link href={""}>UI/UX Design</Link>
              </li>
              <li>
                <Link href={""}>Digital Marketing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2022 MORENT. All rights reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start font-semibold text-black">
            Privacy & Policy Terms & Condition
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
