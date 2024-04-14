import jwt from "jsonwebtoken";
import HttpError from "../models/HttpError.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY || null;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_KEY || null;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || null;
export const generateToken = (userId) => {
    let token;
    try {
        if (!JWT_SECRET || !JWT_REFRESH_EXPIRATION) {
            throw new HttpError("JWT secret key or refresh expiration not found", 500);
        }
        token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRATION,
        });
    }
    catch (err) {
        throw new HttpError("Failed to generate token", 500);
    }
    return token;
};
export const generateRefreshToken = (userId) => {
    let token;
    if (!JWT_REFRESH_SECRET || !JWT_REFRESH_EXPIRATION) {
        console.error("JWT refresh token key not found " + JWT_REFRESH_SECRET);
        console.error("JWT refresh expiration not found " + JWT_REFRESH_EXPIRATION);
        throw new HttpError("JWT refresh token key not found", 500);
    }
    try {
        token = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRATION,
        });
    }
    catch (err) {
        console.error(err);
        throw new HttpError("Failed to generate token", 500);
    }
    return token;
};
export const verifyToken = (token) => {
    let payload;
    try {
        if (JWT_REFRESH_SECRET)
            payload = jwt.verify(token, JWT_REFRESH_SECRET);
        else
            throw new HttpError("JWT secret key not found", 500);
    }
    catch (err) {
        return false;
    }
    return payload;
};
