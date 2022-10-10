import { Request, Response } from "express";
import { petService } from "../services";

export const postPet = async (req: Request, res: Response) => {
  await petService.postPet(res.locals.user, res.locals.body);
  res.status(201).send("Pet Criado!");
};

export const editPet = async (req: Request, res: Response) => {
  await petService.editPet(res.locals.petId, res.locals.user, res.locals.body);
  res.status(201).send("Pet editado!");
};
