import { Router } from "express";
import { petController } from "../controllers";
import { validateParamsId } from "../middlewares/idMiddleware";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { petSchema } from "../schemas/petSchema";

const petRouter = Router();

petRouter.post(
  "/pet",
  validateSchemaMiddleware(petSchema),
  petController.postPet
);

petRouter.patch(
  "/pet/:petId",
  validateSchemaMiddleware(petSchema),
  validateParamsId("petId"),
  petController.editPet
);

export default petRouter;
