var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken, verifyToken, } from "../utils/jwt.js";
import HttpError from "../models/HttpError.js";
export function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            let existingUser;
            try {
                existingUser = yield User.findOne({ email });
            }
            catch (err) {
                const error = new HttpError("Login failed", 500);
                return next(error);
            }
            if (!existingUser) {
                const error = new HttpError("Wrong credentials, please try again", 401);
                return next(error);
            }
            let isValidPassword = false;
            try {
                isValidPassword = yield bcrypt.compare(password, existingUser.password);
            }
            catch (err) {
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
        }
        catch (error) {
            next(error);
        }
    });
}
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed, please check your data", 422));
    }
    const { name, password, email } = req.body;
    let existingUser;
    try {
        existingUser = yield User.findOne({ name });
    }
    catch (err) {
        const error = new HttpError("Registration failed", 500);
        return next(error);
    }
    if (existingUser) {
        res.status(400).send({ error: "User already exists, please login" });
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcrypt.hash(password, 12);
    }
    catch (err) {
        const error = new HttpError("Registration failed", 500);
        return next(error);
    }
    const createdUser = new User({
        name,
        password: hashedPassword,
        email,
    });
    try {
        yield createdUser.save();
        res.status(201).send({ message: "User created successfully" });
    }
    catch (err) {
        const error = new HttpError("User creation failed failed", 500);
        return next(error);
    }
});
export function refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            const error = new HttpError("No refresh token provided", 400);
            return next(error);
        }
        let userId;
        try {
            userId = verifyToken(refreshToken);
        }
        catch (error) {
            return next(error);
        }
        const newToken = generateToken(userId);
        res.status(200).json({ accessToken: newToken });
    });
}
