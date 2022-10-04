import express from "express";
import "express-async-errors";
import cors from "cors";
import handleErrorMiddleware from "./middlewares/handleErrorsMiddleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(handleErrorMiddleware);

export default app;
