import { faker } from "@faker-js/faker";
import { IPetBody, PetType } from "../../src/types/petTypes";

export const petBodyFactory = (type: PetType) => {
  const body: IPetBody = {
    name: faker.random.alpha(5),
    birthDate: faker.date.between(
      "2000-01-01T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z"
    ),
    type,
    genre: "female",
  };
  
  return body;
};
