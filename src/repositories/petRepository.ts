import prisma from "../database";
import {
  CreatePetData,
  IUpdatePetBody,
  PetType,
} from "../types/petTypes";

export const insertPet = async (data: CreatePetData) => {
  const newPet = await prisma.petz.create({
    data,
  });
  return newPet;
};

export const updatePet = async (data: IUpdatePetBody, petId: number) => {
  const updatedPet = await prisma.petz.update({
    where: {
      id: petId,
    },
    data: data,
  });
  return updatedPet;
};

export const deletePet = async (petId: number) => {
  const deletedPet = await prisma.petz.delete({
    where: {
      id: petId,
    },
  });
  return deletedPet;
};

export const searchPetById = async (id: number) => {
  const pet = await prisma.petz.findUnique({
    where: {
      id,
    },
  });
  return pet;
};

export const searchPetByNameAndUserId = async (
  petName: string,
  userId: number,
  type: PetType
) => {
  const pet = await prisma.petz.findFirst({
    where: {
      userId,
      name: petName,
      type,
    },
  });
  return pet;
};

export const searchPetByAllFieldsExceptId = async (data: CreatePetData) => {
  const pet = await prisma.petz.findFirst({
    where: data,
  });
  return pet;
};
