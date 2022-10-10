import prisma from "../../src/database";
import supertest from "supertest";
import { SignUpFactory } from "./authFactory";
import app from "../../src/app";

export const deleteAllData = async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`,
    prisma.$executeRaw`TRUNCATE TABLE petz RESTART IDENTITY CASCADE;`,
    prisma.$executeRaw`TRUNCATE TABLE vaccines RESTART IDENTITY;`,
  ]);
};

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const server = supertest(app);

export const userCreatedWithTokenScenario = async () => {
  const newUserbody = SignUpFactory();

  await server.post("/signup").send(newUserbody);

  const body = {
    email: newUserbody.email,
    password: newUserbody.password,
  };
  const result = await server.post("/signin").send(body);

  return result.body.token;
};


