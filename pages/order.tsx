import ProductDetail from "@/components/product/ProductDetail";
import React from "react";

const Order = (props: any) => {
  return (
    <div>
      <ProductDetail cart={props.cart} addToCart={props.addToCart} />
    </div>
  );
};

export default Order;
