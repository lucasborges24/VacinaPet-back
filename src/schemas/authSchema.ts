import joi from "joi";
import { fullNameRegExp, passwordRegExp } from "../utils/regexUtils";

export const signUpSchema = joi.object({
  fullName: joi.string().pattern(fullNameRegExp).trim().required(),
  email: joi.string().email().required().trim(),
  password: joi.string().pattern(passwordRegExp).required(),
  confirmPassword: joi.ref("password"),
});
