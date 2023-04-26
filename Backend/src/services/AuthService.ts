import { Request, Response } from "express";
import { isEmpty, isEmail } from "class-validator";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import User from "../entities/User";
import { AppDataSource } from "../app-data-source";

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

  if (!isEmail(email)) errors.email = "A valid email is required";

  isEmailAvailable = await AppDataSource.getRepository(User).findOne({
    where: {
      email,
    },
  });

  if (isEmailAvailable) errors.email = "Email already taken";

  if (password !== confirmPassword)
    errors.confirmPassword = "Password and ConfirmPassword must match!";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const user = AppDataSource.getRepository(User).create({
      email,
      password,
      firstName: firstName,
      lastName: lastName,
    });

    const result = await user.save();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { register };
