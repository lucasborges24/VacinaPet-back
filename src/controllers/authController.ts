import { Request, Response } from "express";
import { authService } from "../services";

export const signUp = async (req: Request, res: Response) => {
  await authService.signUp(res.locals.body);
  res.status(201).send("cadastro feito");
};

export const signIn = async (req: Request, res: Response) => {
  const token = await authService.signIn(res.locals.body);
  res.status(202).send(token);
};
