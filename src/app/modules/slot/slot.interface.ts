import { Types } from "mongoose";

type TSlot = {
  service: Types.ObjectId | string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};

export default TSlot;
