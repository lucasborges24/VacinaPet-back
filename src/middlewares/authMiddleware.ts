import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "../utils/errorUtils";

dotenv.config();

export const ensureAuthenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw unauthorizedError("Missing authorization header.");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw unauthorizedError("Missing token!");

  try {
    const { JWT_SECRETKEY } = process.env;
    const userData = jwt.verify(token, JWT_SECRETKEY!);
    res.locals.user = userData;
    next();
  } catch (error) {
    throw unauthorizedError("Invalid Token!");
  }
};
