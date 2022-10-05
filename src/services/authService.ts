import { CreateDataUsers, ISignUpBody, SignInType } from "../types/authTypes";
import { conflictError, unauthorizedError } from "../utils/errorUtils";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authRepository } from "../repositories";
import { Users } from "@prisma/client";
import { JWT_EXPIRE_TIME_SECONDS } from "../utils/constantsUtils";

dotenv.config();

export const signUp = async (data: ISignUpBody) => {
  passwordIsEqualConfirmPassword(data.password, data.confirmPassword);
  await checkEmailisAlreadyRegistered(data.email);
  const encryptedPassword = encryptPasswordBcrypt(data.password);
  const dataEncrypted: CreateDataUsers = {
    fullName: data.fullName,
    email: data.email,
    password: encryptedPassword,
  };
  await authRepository.insertUser(dataEncrypted);
  return;
};

export const signIn = async (data: SignInType) => {
  const user: Users = await getUserThatExistsByEmail(data.email);
  checkPasswordsMatch(data.password, user.password);
  const token: string = createTokenByJwt(user);
  return { token };
};

const createTokenByJwt = (data: Users) => {
  try {
    const { JWT_SECRETKEY } = process.env;
    const jwtExpire = {
      expiresIn: JWT_EXPIRE_TIME_SECONDS,
    };
    const token = jwt.sign(data, JWT_SECRETKEY!, jwtExpire);
    return token;
  } catch (error) {
    throw error;
  }
};

const checkPasswordsMatch = (password: string, encryptedPassword: string) => {
  const passwordIsValid = bcrypt.compareSync(password, encryptedPassword);
  if (!passwordIsValid) throw unauthorizedError("invalid data!");
  return true;
};

const getUserThatExistsByEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw unauthorizedError("invalid data!");
  return user;
};

const checkEmailisAlreadyRegistered = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user) throw conflictError("Email is already registered!");
  return false;
};

const getUserByEmail = async (email: string) => {
  const user = await authRepository.getUserByEmail(email);
  return user;
};

const encryptPasswordBcrypt = (password: string) => {
  const { BCRYPT_SALT } = process.env;
  try {
    const hash = bcrypt.hashSync(password, +BCRYPT_SALT!);
    return hash;
  } catch (error) {
    throw error;
  }
};

const passwordIsEqualConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword)
    throw unauthorizedError("password is not equal confirmPassword!");
  return true;
};
