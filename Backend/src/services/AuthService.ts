import { Request, Response } from "express";
import { isEmpty, isEmail } from "class-validator";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import User from "../entities/User";
import { AppDataSource } from "../app-data-source";
import cookie from "cookie";
import Cart from "../entities/Cart";
require("dotenv").config();

export const register = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  let errors: any = {};

  let isEmailAvailable: User;

  if (!email) errors.email = "Email can not be empty!";
  if (!password) errors.password = "Password can not be empty!";
  if (!confirmPassword)
    errors.confirmPassword = "Confirm paswword can not be empty!";
  if (!firstName) errors.firstName = "Firstname can not be empty!";
  if (!lastName) errors.lastName = "Lastname can not be empty!";

  if (!isEmail(email)) errors.email = "A valid email is required!";

  isEmailAvailable = await AppDataSource.getRepository(User).findOne({
    where: {
      email,
    },
  });

  if (isEmailAvailable) errors.email = "Email already taken";

  if (password !== confirmPassword)
    errors.confirmPassword = "Password and ConfirmPassword must match!";

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  try {
    const user = AppDataSource.getRepository(User).create({
      email,
      password,
      firstName: firstName,
      lastName: lastName,
    });
    await user.save();
    const cart = Cart.create({
      user: user,
    });
    await cart.save(); // when a user is created we also need to create a cart for it
    user.cartId = cart.id;

    const result = await user.save();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let errors: any = {};
  if (isEmpty(email)) errors.email = "Email can not be empty!";
  if (isEmpty(password)) errors.password = "Password can not be empty!";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (!user) return res.status(404).json({ email: "User not found" });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return res.status(401).json({ password: "Password is incorrect" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600 * 24 * 30,
      path: "/",
    });
    return res.json({ user, token });
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const me = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  // take the user from the database and send it back to the client in the response body (without the password)
  try {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    const response = {
      id: user?.id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      isAdmin: user?.isAdmin,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      city: user?.city,
      country: user?.country,
      cartId: user?.cartId,
    };
    return res.json(response);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = (_: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    maxAge: new Date(0),
    path: "/",
  });
  return res.status(200).json({ success: true });
};

module.exports = { register, login, me, logout };
