/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorRes } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorRes => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: err.message,
    },
  ];

  const statusCode = 409;

  return {
    statusCode,
    message: "Duplicate Entry",
    errorSources,
  };
};

export default handleDuplicateError;
