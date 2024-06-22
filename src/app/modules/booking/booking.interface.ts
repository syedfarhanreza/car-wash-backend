import { Types } from "mongoose";

enum VehicleType {
  Car = "car",
  Truck = "truck",
  SUV = "SUV",
  Van = "van",
  Motorcycle = "motorcycle",
  Bus = "bus",
  ElectricVehicle = "electricVehicle",
  HybridVehicle = "hybridVehicle",
  Bicycle = "bicycle",
  Tractor = "tractor",
}

export type TBooking = {
  customer: Types.ObjectId | string;
  slot: Types.ObjectId | string;
  service: Types.ObjectId | string;
  vehicleType: VehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
