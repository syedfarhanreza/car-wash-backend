/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorSource = {
  path: string;
  message: string;
};

export type TErrorSources = TErrorSource[];

export type TGenericErrorRes = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type TAnyObject = {
  [key: string]: any;
};
