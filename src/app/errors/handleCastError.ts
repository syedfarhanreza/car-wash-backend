import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRes } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorRes => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Cast Error",
    errorSources,
  };
};

export default handleCastError;
