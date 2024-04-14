import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User as UserType } from "../types/User.js";
import {
  generateRefreshToken,
  generateToken,
  verifyToken,
} from "../utils/jwt.js";
import HttpError from "../models/HttpError.js";
interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export async function login(
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    let existingUser: UserType | null;

    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      const error = new HttpError("Login failed", 500);
      return next(error);
    }

    if (!existingUser) {
      const error = new HttpError("Wrong credentials, please try again", 401);
      return next(error);
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError("Login failed", 500);
      return next(error);
    }

    if (!isValidPassword) {
      const error = new HttpError("Wrong credentials, please try again", 401);
      return next(error);
    }
    const refreshToken = generateRefreshToken(existingUser._id);
    const token = generateToken(existingUser._id);

    res.status(200).json({
      userId: existingUser._id,
      name: existingUser.name,
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { name, password, email } = req.body;

  let existingUser: UserType | null;
  try {
    existingUser = await User.findOne({ name });
  } catch (err) {
    const error = new HttpError("Registration failed", 500);
    return next(error);
  }

  if (existingUser) {
    res.status(400).send({ error: "User already exists, please login" });
  }

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Registration failed", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    password: hashedPassword,
    email,
  });

  try {
    await createdUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    const error = new HttpError("User creation failed failed", 500);
    return next(error);
  }
};

interface RefreshRequest {
  refreshToken: string;
}

export async function refresh(
  req: Request<{}, {}, RefreshRequest>,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    const error = new HttpError("No refresh token provided", 400);
    return next(error);
  }
  let userId;
  try {
    userId = verifyToken(refreshToken);
  } catch (error) {
    return next(error);
  }
  const newToken = generateToken(userId);
  res.status(200).json({ accessToken: newToken });
}
