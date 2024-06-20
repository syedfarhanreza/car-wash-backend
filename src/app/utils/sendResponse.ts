/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

type TResponse<T> = {
  statusCode?: number;
  success: boolean;
  message?: string;
  data: T;
  error?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode || 200).json({
    success: data.success,
    statusCode: data.statusCode || 200,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
