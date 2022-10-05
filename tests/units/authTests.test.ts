import { expect, jest } from "@jest/globals";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authRepository } from "../../src/repositories";
import { authService } from "../../src/services";
import { conflictError, unauthorizedError } from "../../src/utils/errorUtils";
import {
  createdUserFactory,
  signInFactory,
  SignUpFactory,
} from "../factories/authFactory";

dotenv.config();

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Test signUp function", () => {
  it("should return an unauthorized error when password is not equal confirmPassword", async () => {
    const body = SignUpFactory();
    const wrongBody = { ...body, confirmPassword: "123" };

    jest.spyOn(authRepository, "getUserByEmail");

    const promise = authService.signUp(wrongBody);

    expect(promise).rejects.toEqual(
      unauthorizedError("password is not equal confirmPassword!")
    );
    expect(authRepository.getUserByEmail).not.toBeCalled();
  });

  it("Should return an conflict error when email is duplicated", async () => {
    const body = SignUpFactory();
    const createdUser = createdUserFactory();

    jest.spyOn(bcrypt, "hashSync").mockImplementationOnce(() => "hash_bolado");
    jest
      .spyOn(authRepository, "getUserByEmail")
      .mockResolvedValueOnce(createdUser);

    const promise = authService.signUp(body);

    expect(promise).rejects.toEqual(
      conflictError("Email is already registered!")
    );
    expect(bcrypt.hashSync).not.toBeCalled();
  });

  it("Should create a new user", async () => {
    const body = SignUpFactory();
    const createdUser = createdUserFactory();

    jest.spyOn(bcrypt, "hashSync").mockImplementationOnce(() => "hash_bolado");
    jest.spyOn(authRepository, "getUserByEmail").mockResolvedValueOnce(null);
    jest.spyOn(authRepository, "insertUser").mockResolvedValueOnce(createdUser);

    await authService.signUp(body);

    expect(authRepository.insertUser).toBeCalledTimes(1);
    expect(authRepository.getUserByEmail).toBeCalledTimes(1);
  });
});
