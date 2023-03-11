// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<String>>
) {
  const data = req.body;
  const pincodes = ["110045", "110046", "110047", "110048", "110049", "110050"];
  return res.status(200).json(pincodes);
}
