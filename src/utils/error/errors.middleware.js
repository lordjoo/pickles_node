import createHttpError from "http-errors";

// ------------------------------------------------------------------

const catchNotFound = (_, __, next) => next(createHttpError(404));

// ------------------------------------------------------------------

const errorHandler = (err, req, res, _) => {
  console.log("error", err);

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const error = { error: err };

  console.log("error keda ", error);

  res.status(err.status || 500).json({ error: err });
};

// ------------------------------------------------------------------

export default { catchNotFound, errorHandler };
