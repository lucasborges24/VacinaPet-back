import { Users } from "@prisma/client";
import { petRepository } from "../repositories";
import { IPetBody, PetType } from "../types/petTypes";
import { conflictError } from "../utils/errorUtils";

export const postPet = async (userData: Users, bodyData: IPetBody) => {
  await checkPetIsNotVinculateToUserByNameAndUserId(bodyData.name, userData.id, bodyData.type);
  const newPet = await petRepository.insertPet({
    ...bodyData,
    userId: userData.id,
  });
  return newPet;
};

const checkPetIsNotVinculateToUserByNameAndUserId = async (
  petName: string,
  userId: number,
  type: PetType
) => {
  const pet = await petRepository.searchPetByNameAndUserId(petName, userId, type);
  if (pet) throw conflictError("Pet já está cadastrado!");
  return;
};
