import { CustomErrorHandler } from "../services/index.js";
import pkg from "joi";
import { MODE } from "../utils/env.js";
const { ValidationError } = pkg;

export const errorHandler = (err, req, res, next) => {
  // default error
  let statusCode = 500;
  let error = {
    error: true,
    message: `${MODE === "dev" ? err.message : "Internal server error"}`,
  };

  // if Joi validation error
  if (err instanceof ValidationError) {
    statusCode = 422;
    error = { ...error, message: err.message };
  }

  // if custom error
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    error = { ...error, message: err.message };
  }

  return res.status(statusCode).json(error);
};
