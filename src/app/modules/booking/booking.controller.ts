import { isValidObjectId } from "mongoose";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { TBooking } from "./booking.interface";
import { Service } from "../service/service.model";
import { bookingService } from "./booking.service";
import { Slot } from "../slot/slot.model";

const { createBookingService, getAllBookingService, getUserBookingsService } =
  bookingService;

export const createBookingIntoDB = catchAsync(async (req, res) => {
  //   const vehicle = {
  //     serviceId: "60d9c4e4f3b4b544b8b8d1c5",
  //     slotId: "60d9c4e4f3b4b544b8b8d1c6",
  //     vehicleType: "car",
  //     vehicleBrand: "Toyota",
  //     vehicleModel: "Camry",
  //     manufacturingYear: 2020,
  //     registrationPlate: "ABC123",
  //   };

  const { body } = req;

  const user = req.user;
  const isValidObjId = isValidObjectId(body.serviceId);
  if (!isValidObjId) {
    return sendResponse(res, {
      data: null,
      message: "invalid object id format",
      success: false,
      statusCode: 400,
    });
  }

  const isExist = await Service.findById(body.serviceId);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }
  const slot = await Slot.findById(body.slotId);
  if (!slot) {
    return sendResponse(res, {
      message: "slot not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  if (slot.isBooked !== "available") {
    sendResponse(res, {
      message: "this slot is not available for booking",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const data: TBooking = {
    customer: user._id,
    service: body.serviceId,
    slot: body.slotId,
    ...body,
  };

  const result = await createBookingService(data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: result,
  });
});

export const getAllBookings = catchAsync(async (req, res) => {
  const result = await getAllBookingService();

  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
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

export const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await getUserBookingsService(user._id);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
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
