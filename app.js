import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import pickles from './pickles/pickles'
// ------------------------------------------------------

import errors from "./src/utils/error/errors.middleware.js";

// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------

pickles.load(app);
pickles.reload();

// ------------------------------------------------------

// Error Handlers
//---------------------------------------------------
// catch 404 and forward to error handler
app.use(errors.catchNotFound);
// error handler
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
