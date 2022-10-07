import { Petz } from "@prisma/client";

export type Genre = "female" | "male";
export type PetType = "dog" | "cat";
export interface IPetBody {
  name: string;
  birthDate: Date;
  genre: Genre;
  type: PetType;
}

export type IUpdatePetBody = Partial<IPetBody>;

export type CreatePetData = Omit<Petz, "id">;
