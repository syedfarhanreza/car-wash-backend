import { Slot } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingService = async (payload: TBooking) => {
  const create = await Booking.create(payload);

  const update = await Slot.findByIdAndUpdate(payload.slot, {
    isBooked: "booked",
  });

  const result = await Booking.findById(create._id)
    .populate("service")
    .populate("slot")
    .populate("customer");

  return result;
};

const getAllBookingService = async () => {
  const result = await Booking.find()
    .populate("service")
    .populate("slot")
    .populate("customer");
  return result;
};

const getUserBookingsService = async (userId: string) => {
  const result = await Booking.find({ customer: userId })
    .populate("service")
    .populate("slot")
    .populate("customer");
  return result;
};

export const bookingService = {
  createBookingService,
  getAllBookingService,
  getUserBookingsService,
};
