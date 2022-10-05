import prisma from "../database";
import { CreateDataUsers } from "../types/authTypes";

export const insertUser = async (data: CreateDataUsers) => {
  const newUser = await prisma.users.create({
    data,
  });
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
};
