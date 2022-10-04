import { Request, Response } from "express";
import { authService } from "../services";

export const signUp = async (req: Request, res: Response) => {
  await authService.signUp(res.locals.body);
  res.status(201).send("cadastro feito");
};
