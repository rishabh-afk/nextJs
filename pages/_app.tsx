import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState([
    {
      itemCode: "",
      name: "",
      variant: "",
      size: "",
      price: 0,
      qty: 0,
    },
  ]);
  const [total, setTotal] = useState(0);
  // const saveCart = (item: any) => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   let total = 0;
  //   cart.map((item) => {
  //     total += item.price * item.qty;
  //   });
  //   setTotal(total);
  // };

  // useEffect(() => {
  //   try {
  //     if (localStorage.getItem("cart")) {
  //       setCart(JSON.parse(localStorage.getItem("cart") || ""));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     localStorage.clear();
  //   }
  // }, []);

  // const addToCart = (
  //   itemCode: string,
  //   name: string,
  //   variant: string,
  //   size: string,
  //   price: number,
  //   qty: number
  // ) => {
  //   console.log(itemCode, name, variant, size, price, qty);
  //   // return;
  //   const newCart = localStorage.getItem("cart") || [];
  //   JSON.parse(JSON.stringify(newCart)).map((cartItem: any) => {
  //     if (cartItem.itemCode === itemCode) {
  //       cartItem.qty = cartItem.qty + qty;
  //     } else {
  //       let obj = {
  //         itemCode: itemCode,
  //         name: name,
  //         variant: variant,
  //         price: price,
  //         qty: qty,
  //         size: size,
  //       };
  //       localStorage.setItem("cart", JSON.stringify(obj));
  //     }
  //     // setCart(obj);
  //     saveCart(newCart);
  //   });
  // };

  // const clearcart = () => {
  //   setCart([]);
  //   saveCart([]);
  // };

  // const removeFromCart = (
  //   itemCode: string,
  //   name: string,
  //   variant: string,
  //   size: string,
  //   price: number,
  //   qty: number
  // ) => {
  //   const newCart = cart;
  //   newCart.map((cartItem) => {
  //     if (cartItem.itemCode === itemCode) {
  //       cartItem.qty = cartItem.qty - qty;
  //     }
  //     if (cartItem.qty <= 0) {
  //       newCart.slice(cart.indexOf(cartItem), 1);
  //     }
  //     setCart(newCart);
  //     saveCart(newCart);
  //   });
  // };

  return (
    <>
      <Layout
        // cart={cart}
        // addToCart={addToCart}
        // removeFromCart={removeFromCart}
        // clearcart={clearcart}
        // total={total}
      >
        <Component
          // cart={cart}
          // addToCart={addToCart}
          // removeFromCart={removeFromCart}
          // clearcart={clearcart}
          // total={total}
          {...pageProps}
        />
        <ToastContainer />
      </Layout>
    </>
  );
}
