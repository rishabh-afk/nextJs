// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let product = await Product.findOne({ slug: req.body.slug });
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
  return res
    .status(200)
    .json({
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    });
}
