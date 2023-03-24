// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../models/User";
import connectDB from "../../../../../middleware/mongoose";
import { string } from "../../../../../strings/strings";
import jwt from "jsonwebtoken";
import config from "@/appconfig/config";
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
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
          return res.status(200).send({ message: string.userNotExists });
        }
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          userExists.password
        );
        if (!passwordMatch) {
          return res.status(200).send({ message: string.passwordNotMatch });
        } else {
          const token = jwt.sign(
            { email: userExists.email, id: userExists._id },
            config.JWT_SECRET_KEY,
            {
              expiresIn: "24h",
            }
          );
          const data = {
            token: token,
            username: userExists.name,
            email: userExists.email,
          };
          return res.status(200).json({ message: string.login, data: data });
        }
      } catch (error) {
        return res.status(400).send({ error: error });
      }
    default:
      break;
  }
}
