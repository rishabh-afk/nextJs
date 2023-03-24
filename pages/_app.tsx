import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [total, setTotal] = useState(0);
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
  const saveCart = async (item: any) => {
    localStorage.setItem("cart", JSON.stringify(item));
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    let total = 0;
    await cartData.map((item: any) => {
      total += item.price * item.qty;
    });
    setTotal(total);
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        const getData = JSON.parse(localStorage.getItem("cart") || "[]");
        let total = 0;
        getData.map((item: any) => {
          total += item.price * item.qty;
        });
        setTotal(total);
        setCart(getData);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [total]);

  const addToCart = async (
    itemCode: string,
    name: string,
    price: number,
    size: string,
    variant: string,
    qty: number
  ) => {
    let existingCart = await JSON.parse(localStorage.getItem("cart") || "[]");
    if (existingCart.length === 0 || existingCart[0].itemCode === "") {
      setCart([{ itemCode, name, variant, size, price, qty }]);
      saveCart([{ itemCode, name, variant, size, price, qty }]);
    } else {
      existingCart.map((item: any) => {
        if (item.itemCode === itemCode) {
          let newQty = item.qty + qty;
          existingCart = existingCart.filter(
            (item: any) => item.itemCode != itemCode
          );
          if (existingCart.length === 0) {
            setCart([{ itemCode, name, variant, size, price, qty: newQty }]);
            saveCart([{ itemCode, name, variant, size, price, qty: newQty }]);
          } else {
            setCart([
              ...existingCart,
              { itemCode, name, variant, size, price, qty: newQty },
            ]);
            saveCart([
              ...existingCart,
              { itemCode, name, variant, size, price, qty: newQty },
            ]);
          }
        } else {
          setCart([
            ...existingCart,
            { itemCode, name, variant, size, price, qty },
          ]);
          saveCart([
            ...existingCart,
            { itemCode, name, variant, size, price, qty },
          ]);
        }
      });
    }
  };

  const clearcart = () => {
    setTotal(0);
    setCart([
      {
        itemCode: "",
        name: "",
        variant: "",
        size: "",
        price: 0,
        qty: 0,
      },
    ]);
    localStorage.clear();
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    let newCart = cart;
    newCart.map((cartItem) => {
      if (cartItem.itemCode === itemCode) {
        cartItem.qty = cartItem.qty - qty;
      }
      if (cartItem.qty <= 0) {
        newCart = newCart.filter((item) => item.itemCode !== itemCode);
        if (newCart.length === 0) {
          clearcart();
          return;
        }
      }
      setCart(newCart);
      saveCart(newCart);
    });
  };

  return (
    <>
      <ToastContainer autoClose={1000} closeButton closeOnClick />
      <Header
        cart={cart}
        total={total}
        addToCart={addToCart}
        clearcart={clearcart}
        removeFromCart={removeFromCart}
      />
      <Component
        cart={cart}
        total={total}
        addToCart={addToCart}
        clearcart={clearcart}
        removeFromCart={removeFromCart}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
