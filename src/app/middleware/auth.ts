/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import Config from "../config";
import { catchAsync } from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { User } from "../modules/user/user.model";

export const isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const getToken = req.header("Authorization");

  if (!getToken) {
    return sendResponse(res, {
      data: null,
      message: "Invalid authentication",
      success: false,
      statusCode: 401,
    });
  }

  const token = getToken.split(" ")[1];
  const decoded: any = jwt.verify(token, Config.jwt_access_secret as string);

  if (!decoded) {
    return sendResponse(res, {
      data: null,
      message: "Invalid authentication",
      success: false,
      statusCode: 401,
    });
  }

  const user = await User.findOne({ email: decoded?.email }).select(
    "-password",
  );
  if (!user) {
    return sendResponse(res, {
      data: null,
      message: "User not found",
      success: false,
      statusCode: 404,
    });
  }
  req.user = user;

  next();
});

export const authorizedRoles = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    next();
  };
};
