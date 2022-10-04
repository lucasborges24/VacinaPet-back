import { Users } from "@prisma/client";

export interface ISignUpBody {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type CreateDataUsers = Omit<Users, "id">;
