import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <header className="text-slate-200 bg-slate-700 body-font mb-1 shadow-xl fixed w-full z-50">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-yellow-500 mb-4 md:mb-0"
          >
            <FaShoppingCart size={45} />
            <span className="ml-3 text-xl">CodeStore</span>
          </Link>
          <nav className="text-white md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/tshirts"}
              className="mr-5 hover:text-slate-400 cursor-pointer"
            >
              Tshirts
            </Link>
            <Link
              href={"/mugs"}
              className="mr-5 hover:text-slate-400 cursor-pointer"
            >
              Mugs
            </Link>
            <Link
              href={"/hoodies"}
              className="mr-5 hover:text-slate-400 cursor-pointer"
            >
              Hoodies
            </Link>
            <Link
              href={"/phones"}
              className="mr-5 hover:text-slate-400 cursor-pointer"
            >
              Smart Phones
            </Link>
          </nav>
          <div className="flex flex-col items-center">
            <BsCartCheckFill className="" size={40} color={"white"} />
            <span className="text-xl text-white">My Cart</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
