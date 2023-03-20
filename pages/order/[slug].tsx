import React from "react";
import ProductDetail from "@/components/product/ProductDetail";
import Product from "@/models/Product";
import mongoose from "mongoose";
import config from "../../appconfig/config";

const productDetail = (props: any, { variants, product }: any) => {
    console.log(product, variants);

  return (
    <ProductDetail
      variants={variants}
      product={product}
      cart={props.cart}
      addToCart={props.addToCart}
    />
  );
};

export async function getServerSideProps(context: any) {
  if (mongoose.connections[0].readyState) {
    await mongoose.connect(config.MONGO_URL);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product?.title });
  let colorSizeSlug: any = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item?.color || " ")) {
      colorSizeSlug[item?.color || " "][item.size || " "] = { slug: item.slug };
    } else {
      colorSizeSlug[item?.color || " "] = {};
      colorSizeSlug[item?.color || " "][item.size || " "] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default productDetail;
