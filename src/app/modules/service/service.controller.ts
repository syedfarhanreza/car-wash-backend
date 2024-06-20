/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValidObjectId } from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Service } from "./service.model";
import servicesService from "./service.service";

export const createServiceIntoDB = catchAsync(async (req, res, next) => {
  const { body } = req;
  const result = await servicesService.createService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const getServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }

  const result = await servicesService.getSingleService(id);
  if (!result) {
    sendResponse(res, {
      message: "No data found",
      data: null,
      success: false,
      statusCode: 404,
    });
  }

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
  });
});

export const getAllServiceFromDB = catchAsync(async (req, res, next) => {
  const result = await servicesService.getAllServices();
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});

export const updateServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await servicesService.updateSingleService(id, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
export const deleteServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await servicesService.deleteSingleService(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
