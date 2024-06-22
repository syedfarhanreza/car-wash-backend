import QueryBuilder from "../../builder/QueryBuilder";
import { TAnyObject } from "../../interface/error";
import TSlot from "./slot.interface";
import { Slot } from "./slot.model";
import { minutesToTime, timeToMinutes } from "./slot.utils";

const createSlot = async (payload: TSlot, duration: number) => {
  const startMinutes = timeToMinutes(payload.startTime);
  const endMinutes = timeToMinutes(payload.endTime);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  const slots = [];
  let start = startMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const end = start + duration;
    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: minutesToTime(start),
      endTime: minutesToTime(end),
      isBooked: "available",
    });
    start = end;
  }

  const result = await Slot.create(slots);
  return result;
};

const getAllAvailableSlotsService = async (query: TAnyObject) => {
  const find = Slot.find({ isBooked: "available" }).populate("service");
  const queryBuilder = new QueryBuilder(find, query).filter();
  const result = await queryBuilder.modelQuery;
  return result;
};

export const slotService = {
  createSlot,
  getAllAvailableSlotsService,
};
