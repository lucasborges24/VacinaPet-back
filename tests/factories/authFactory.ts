import { faker } from "@faker-js/faker";
import { CreateDataUsers } from "../../src/types/authTypes";

interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignInBody = Omit<SignUpBody, "fullName" | "confirmPassword">;

export const SignUpFactory = () => {
  const password = faker.internet.password(8, true, /^/, "@A4");
  const body: SignUpBody = {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
  return body;
};

export const signInFactory = () => {
  const body: SignInBody = {
    email: faker.internet.email(),
    password: faker.internet.password(8, true, /^/, "#A4"),
  };
  return body;
};

