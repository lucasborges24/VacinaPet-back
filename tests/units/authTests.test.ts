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

describe("Test signIn function", () => {
  it("Should return an unauthorized error when email doesn't exist", async () => {
    const body = signInFactory();

    jest.spyOn(bcrypt, "compareSync");
    jest.spyOn(authRepository, "getUserByEmail").mockResolvedValueOnce(null);

    const promise = authService.signIn(body);

    expect(promise).rejects.toEqual(unauthorizedError("Invalid data!"));
    expect(bcrypt.compareSync).not.toBeCalled();
  });

  it("Should return an unauthorized error when body's password is not equal db password", async () => {
    const body = signInFactory();
    const user = createdUserFactory();

    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => false);
    jest.spyOn(authRepository, "getUserByEmail").mockResolvedValueOnce(user);
    jest.spyOn(jwt, "sign");

    const promise = authService.signIn(body);

    expect(promise).rejects.toEqual(unauthorizedError("Invalid data!"));
    expect(jwt.sign).not.toBeCalled();
  });

  it("should return a token", async () => {
    const body = signInFactory();
    const user = createdUserFactory();
    const token = "token charmoso";

    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => true);
    jest.spyOn(authRepository, "getUserByEmail").mockResolvedValueOnce(user);
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => token);

    const result = await authService.signIn(body);
    console.log(result);
    
    expect(result).toEqual({ token });
    expect(jwt.sign).toBeCalledTimes(1);
  });
});
