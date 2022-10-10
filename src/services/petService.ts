import { Petz, Users } from "@prisma/client";
import { petRepository } from "../repositories";
import { CreatePetData, IPetBody, PetType } from "../types/petTypes";
import { conflictError, wrongSchemaError } from "../utils/errorUtils";
import { checkParamsMatchs } from "../utils/ValidateUtils";

export const postPet = async (userData: Users, bodyData: IPetBody) => {
  await checkPetIsNotVinculateToUserByNameAndUserId(
    bodyData.name,
    userData.id,
    bodyData.type
  );
  const newPet = await petRepository.insertPet({
    ...bodyData,
    userId: userData.id,
  });
  return newPet;
};

export const editPet = async (
  petId: number,
  userData: Users,
  bodyData: IPetBody
) => {
  const pet = await checkUserIdsmatch(petId, userData.id);
  await checkPetInfoIsNotAllContainedInDatabase({
    ...bodyData,
    userId: userData.id,
  });
  await checkPetIsNotVinculateToUserByNameAndUserIdToAnotherPetId(
    bodyData.name,
    userData.id,
    bodyData.type,
    petId
  );
  const bodyUpdate = getObjectOnlyToDifferentValues(bodyData, pet);
  const updatedPet = await petRepository.updatePet(bodyUpdate, petId);
  return updatedPet;
};

const getObjectOnlyToDifferentValues = (body: IPetBody, pet: Petz) => {
  const arrToDelete: string[] = [];
  for (const prop in body) {
    if (body[prop as keyof IPetBody] === pet[prop as keyof Petz]) {
      arrToDelete.push(prop);
    }
  }
  arrToDelete.forEach((item) => delete body[item as keyof IPetBody]);
  return body;
};

const checkUserIdsmatch = async (petId: number, userIdToken: number) => {
  const pet = await petRepository.searchPetById(petId);
  if (!pet) throw wrongSchemaError("error!");
  checkParamsMatchs(pet?.userId, userIdToken);
  return pet;
};

const checkPetInfoIsNotAllContainedInDatabase = async (data: CreatePetData) => {
  const pet = await petRepository.searchPetByAllFieldsExceptId(data);
  if (pet) throw conflictError("Pet já existente com todos os dados enviados!");
  return;
};

const checkPetIsNotVinculateToUserByNameAndUserId = async (
  petName: string,
  userId: number,
  type: PetType
) => {
  const pet = await petRepository.searchPetByNameAndUserId(
    petName,
    userId,
    type
  );
  if (pet) throw conflictError("Pet já está cadastrado!");
  return;
};

const checkPetIsNotVinculateToUserByNameAndUserIdToAnotherPetId = async (
  petName: string,
  userId: number,
  type: PetType,
  petId: number
) => {
  const pet = await petRepository.searchPetByNameAndUserId(
    petName,
    userId,
    type
  );
  if (pet && pet.id !== petId) throw conflictError("Pet já está cadastrado!");
  return;
};
