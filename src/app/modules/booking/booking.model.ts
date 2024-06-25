import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { vehicleTypes } from "./booking.utils";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Slot",
    },
    vehicleType: {
      type: String,
      enum: vehicleTypes,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model("Booking", bookingSchema);

export default Booking;
