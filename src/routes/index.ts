import { Router } from "express";
import { ensureAuthenticateMiddleware } from "../middlewares/authMiddleware";
import authRouter from "./authRoute";
import petRouter from "./petRoute";

const router = Router();

router.use(authRouter);
router.use(ensureAuthenticateMiddleware);

// Authenticated Routes
router.use(petRouter);

export default router;
