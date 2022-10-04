import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { wrongSchemaError } from "../utils/errorUtils";

export const validateSchemaMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      throw wrongSchemaError(validation.error.message);
    }
    res.locals.body = validation.value
    next();
  };
};