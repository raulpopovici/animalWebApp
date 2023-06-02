import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import User from "../entities/User";
import jwt = require("jsonwebtoken");

export const updateUserInfo = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });

  const { firstName, lastName, phoneNumber, address, city, country } = req.body;

  try {
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.city = city;
    user.country = country;

    const result = await user.save();
    return res.status(200).json(result);
  } catch {
    console.log("error updating user info");
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });

  const pageNumber = req.query.pageNumber > 0 ? req.query.pageNumber : 1;

  console.log(pageNumber);
  if (user.isAdmin === false)
    return res.status(401).json({ error: "Not an admin, not permited" });

  try {
    const result = await AppDataSource.getRepository(User).find({
      skip: (pageNumber - 1) * 5,
      take: 5,
    });

    result.forEach((user) => {
      delete user.password;
      delete user.cartId;
    });
    return res.status(200).json(result);
  } catch {
    console.log("error updating user info");
  }
};

module.exports = { updateUserInfo, getAllUsers };
