import prisma from "../database";
import { CreatePetData, PetType } from "../types/petTypes";

export const insertPet = async (data: CreatePetData) => {
  
  const newPet = await prisma.petz.create({
    data,
  });
  return newPet;
};
