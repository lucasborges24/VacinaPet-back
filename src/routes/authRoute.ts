import { Router } from "express";
import { authController } from "../controllers";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchemaMiddleware(signUpSchema),
  authController.signUp
);
authRouter.post(
  "/signin",
  validateSchemaMiddleware(signInSchema),
  authController.signIn
);

export default authRouter;
