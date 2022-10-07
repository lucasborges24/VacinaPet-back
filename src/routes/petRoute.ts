import { Router } from "express";
import { petController } from "../controllers";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { petSchema } from "../schemas/petSchema";

const petRouter = Router();

petRouter.post(
  "/pet",
  validateSchemaMiddleware(petSchema),
  petController.postPet
);

export default petRouter;
