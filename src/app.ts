import express, {json} from "express";
import "express-async-errors";
import cors from "cors";

import "./config/setup.js";

import userRouter from "./routes/userRouter.js";
import credentialRouter from "./routes/credentialRouter.js";
import noteRouter from "./routes/noteRouter.js";
import cardRouter from "./routes/cardRouter.js";
import internetRouter from "./routes/internetRepository.js";
import handleErrors from "./middlewares/handleErrorMiddleware.js";

const app = express();
app.use(cors());
app.use(json());

app.use(userRouter);
app.use(credentialRouter);
app.use(noteRouter);
app.use(cardRouter);
app.use(internetRouter);
app.use(handleErrors);

export default app;