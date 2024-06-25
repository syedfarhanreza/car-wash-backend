import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRes } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorRes => {
  const errorSources: TErrorSources = Object.values(err.errors).map((el) => {
    return { path: el.path, message: el.message };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
