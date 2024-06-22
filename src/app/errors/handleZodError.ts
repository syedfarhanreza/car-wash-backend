import { ZodError } from "zod";
import { TErrorSources, TGenericErrorRes } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorRes => {
  const errorSources: TErrorSources = err.errors.map((error) => {
    return { path: error.path.join("."), message: error.message };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
