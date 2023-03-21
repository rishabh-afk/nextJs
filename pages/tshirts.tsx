import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";
import config from "../appconfig/config";

const Tshirts = ({ products }: any) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap gap-5 -m-4 justify-center">
          {Object.keys(products).map((item: any) => {
            return (
              <div
                key={products[item]._id}
                className="lg:w-[20%] md:w-[45%] p-4 w-full shadow-lg"
              >
                <Link
                  href={`/order/${products[item].slug}`}
                  className="block relative h-72 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://m.media-amazon.com/images/I/61RcQb3xa8L._UL1500_.jpg"
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                  </h2>
                  <p className="mt-1">{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes("s") && (
                      <span className="border p-1 bg-slate-300">S</span>
                    )}
                    {products[item].size.includes("m") && (
                      <span className="border p-1 bg-slate-300">M</span>
                    )}
                    {products[item].size.includes("xl") && (
                      <span className="border p-1 bg-slate-300">XL</span>
                    )}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes("red") && (
                      <span className="px-2 mr-2 h-1 bg-red-600 rounded-full"></span>
                    )}
                    {products[item].color.includes("white") && (
                      <span className="px-2 mr-2 h-1 bg-white rounded-full"></span>
                    )}
                    {products[item].color.includes("yellow") && (
                      <span className="px-2 mr-2 h-1 bg-yellow-300 rounded-full"></span>
                    )}
                    {products[item].color.includes("green") && (
                      <span className="px-2 mr-2 h-1 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  if (mongoose.connections[0].readyState) {
    await mongoose.connect(config.MONGO_URL);
  }
  let products = await Product.find({ category: "upper" });
  let tshirt: any = {};
  products.map((product: any) => {
    if (product.title in tshirt) {
      if (
        !tshirt[product.title].color.includes(product.color) &&
        product.availableQty > 0
      ) {
        tshirt[product.title].color.push(product.color);
      }
      if (
        !tshirt[product.title].size.includes(product.size) &&
        product.availableQty > 0
      ) {
        tshirt[product.title].size.push(product.size);
      }
    } else {
      tshirt[product.title] = JSON.parse(JSON.stringify(product));
      if (product.availableQty > 0) {
        tshirt[product.title].size = [product.size];
        tshirt[product.title].color = [product.color];
      }
    }
  });
  return {
    props: { products: JSON.parse(JSON.stringify(tshirt)) },
  };
}

export default Tshirts;
