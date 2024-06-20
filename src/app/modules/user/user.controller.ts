import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { User } from "./user.model";
import userService from "./user.service";

const { createUserService, logInUserService } = userService;
export const createUserIntoDB = catchAsync(async (req, res) => {
  const { body } = req;
  const isExist = await User.isUserExistsByEmail(body.email);
  if (isExist) {
    return sendResponse(res, {
      success: false,
      message: "User already exist in this email",
      data: null,
      statusCode: 400,
    });
  }

  const result = await createUserService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});

export const logInUser = catchAsync(async (req, res) => {
  const { body } = req;
  const { matched, token, notfound, user } = await logInUserService(body);
  if (notfound === true) {
    return sendResponse(res, {
      message: "user not found for this email",
      success: false,
      data: null,
      statusCode: 404,
    });
  }

  if (matched === false) {
    return sendResponse(res, {
      message: "Password didn't matched",
      success: false,
      data: null,
      statusCode: 401,
    });
  }

  res.json({
    success: true,
    statusCode: 200,
    token,
    message: "User logged in successfully",
    data: user,
  });
});
