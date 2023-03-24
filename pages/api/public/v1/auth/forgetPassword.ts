// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../models/User";
import connectDB from "../../../../../middleware/mongoose";
import { string } from "../../../../../strings/strings";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const method = req.method;
  switch (method) {
    case "POST":
      try {
        const userExists = await User.find({ email: req.body.email });
        if (!userExists) {
          return res.status(200).send({ message: "Email Id does not exist" });
        }
        return res.status(200).send({ message: string.success });
      } catch (error) {
        return res.status(400).send({ error: error });
      }
    case "PUT":
      let { password, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      await User.updateOne({ email: email }, { password: password })
        .then((result: any) => {
          return res.status(200).send({ message: string.update, data: result });
        })
        .catch((error: any) => {
          return res.status(200).send({ message: "Failed to updated" });
        });
      break;
    default:
      break;
  }
}
