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
      let { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      newUser
        .save()
        .then((response: any) => {
          return res
            .status(200)
            .send({ message: string.registered, data: response });
        })
        .catch((error: any) => {
          return res.status(200).send({ message: string.userExists });
        });
      break;
    case "GET":
      await User.find(
        {},
        { _id: 1, name: 1, email: 1, updatedAt: 1, createdAt: 1 }
      )
        .then((response: any) => {
          return res
            .status(200)
            .send({ message: string.success, data: response });
        })
        .catch((error: any) => {
          return res.status(200).send({ error: error, message: "error" });
        });
      break;
    default:
      break;
  }
}
