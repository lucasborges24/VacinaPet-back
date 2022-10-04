import { CreateDataUsers, ISignUpBody } from "../types/authTypes";
import { conflictError, unauthorizedError } from "../utils/errorUtils";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { authRepository } from "../repositories";

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
