// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let products = await Product.find();
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
  res.status(200).json({ tshirt });
};

export default connectDB(handler);
