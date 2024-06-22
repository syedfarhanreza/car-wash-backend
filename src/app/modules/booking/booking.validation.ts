import { z } from "zod";

const VehicleType = z.enum([
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
]);

const BookingValidationSchema = z.object({
  customer: z.string(),
  service: z.string(),
  slot: z.date(),
  vehicleType: VehicleType,
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.number().int().positive(),
  registrationPlate: z.string(),
});

export default BookingValidationSchema;
