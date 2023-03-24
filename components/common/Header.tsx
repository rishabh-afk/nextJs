import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const [product, setProduct] = useState({
    color: "",
    price: "",
    size: "",
    title: "",
    _id: "",
  });
  const slug = useRouter();
  const data = {
    slug: slug.asPath.split("/")[2],
  };
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getProVariant", data)
      .then((response) => {
        if (response.data.product != null) {
          const data = response.data;
          setProduct(response.data.product);
        }
      });
  }, [slug]);
  const [showCart, setShowCart] = useState(false);
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
          <Link href={"login"}>
            <div className="flex flex-col items-center cursor-pointer mr-5">
              <CgProfile size={40} color={"white"} />
              <span className="text-xl text-white">My Profile</span>
            </div>
          </Link>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowCart(!showCart)}
          >
            <BsCartCheckFill className="" size={40} color={"white"} />
            <span className="text-xl text-white">My Cart</span>
          </div>
        </div>
        {showCart && (
          <>
            <div className="absolute w-1/4 rounded shadow-xl top-30 right-0 bg-slate-200 text-black">
              <h2 className="text-center text-2xl font-semibold py-2">
                My Cart
              </h2>
              <ul className="p-4 pb-0">
                {props.cart[0]?.itemCode === "" ? (
                  <>
                    <div className="flex justify-center">
                      <p className="p-4 pt-0">Your Cart is empty !</p>
                    </div>
                  </>
                ) : (
                  <>
                    {props.cart.map((cartItem: any, index: any) => {
                      return (
                        <div key={index}>
                          <li className="border-b-2 border-b-slate-300 pb-3">
                            <div className="flex">
                              <div className="flex w-2/3 flex-col gap-2">
                                <h3 className="font-bold text-xl">
                                  {cartItem?.name}
                                </h3>
                                {/* <p>Description</p> */}
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <p className="w-1/3">Quantity</p>
                                <div className="flex gap-5 items-center">
                                  <span
                                    onClick={() =>
                                      props.removeFromCart(product._id, 1)
                                    }
                                    className="text-2xl bg-white px-4 py-1 rounded cursor-pointer"
                                  >
                                    -
                                  </span>
                                  <span className="text-xl">
                                    {cartItem?.qty}
                                  </span>
                                  <span
                                    onClick={() => {
                                      props.addToCart(
                                        product._id,
                                        product.title,
                                        product.price,
                                        product.size,
                                        product.color,
                                        1
                                      );
                                    }}
                                    className="text-2xl bg-white px-3 py-1 rounded cursor-pointer"
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                    <div>Total Amount: Rs. {props.total} /-</div>
                  </>
                )}
              </ul>
              {props.cart.length > 0 && props.cart[0].itemCode !== "" && (
                <div className="flex gap-5 justify-center py-4">
                  <Link href={"checkout"}>
                    <button className="px-8 py-2 border border-slate-600 hover:border-slate-500 hover:bg-slate-500 text-white bg-slate-600 rounded">
                      Checkout
                    </button>
                  </Link>
                  <button
                    onClick={() => props.clearcart()}
                    className="px-8 py-2 border border-slate-600 hover:border-slate-500 hover:bg-slate-500 text-white bg-slate-600 rounded"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
