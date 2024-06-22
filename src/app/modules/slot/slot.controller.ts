import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Service } from "../service/service.model";
import { slotService } from "./slot.service";

const { createSlot, getAllAvailableSlotsService } = slotService;

export const createSlotsIntoDB = catchAsync(async (req, res) => {
  const { body } = req;

  const isServiceExist = await Service.findById(body.service);

  if (!isServiceExist) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "There is no available Service on this id. invalid service id",
      data: null,
    });
  }

  const result = await createSlot(body, isServiceExist.duration);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slots created successfully",
    data: result,
  });
});

export const getAllAvailableSlots = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await getAllAvailableSlotsService(query);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    message: "No data found",
    success: false,
    statusCode: 404,
    data: [],
  });
});
