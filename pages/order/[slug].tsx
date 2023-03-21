import React from "react";
import ProductDetail from "@/components/product/ProductDetail";

const productDetail = (props: any) => {
  return <ProductDetail cart={props.cart} addToCart={props.addToCart} />;
};

export default productDetail;
