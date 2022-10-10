import { NextFunction, Request, Response } from "express";

const validateParamsId = (enteredId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params[enteredId]);
    const NotANumber: boolean = isNaN(id);
    const isInteger: boolean = Number.isInteger(id);
    if (NotANumber || !isInteger) {
      const error: object = {
        type: "Not_Found",
        message: "id sent is not a integer number.",
      };
      throw error;
    }
    res.locals[enteredId] = id;
    next();
  };
};



export { validateParamsId };