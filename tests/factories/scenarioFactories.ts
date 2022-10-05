import prisma from "../../src/database";

export const deleteAllData = async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`,
    prisma.$executeRaw`TRUNCATE TABLE petz RESTART IDENTITY CASCADE;`,
    prisma.$executeRaw`TRUNCATE TABLE vaccines RESTART IDENTITY CASCADE;`,
  ]);
};

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};
