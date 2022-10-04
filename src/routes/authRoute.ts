import { Router } from "express";
import { authController } from "../controllers";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchemaMiddleware(signUpSchema),
  authController.signUp
);
export default authRouter;
