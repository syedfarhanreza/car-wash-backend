import TService from "./service.interface";
import { Service } from "./service.model";

const createService = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleService = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const getAllServices = async () => {
  const result = await Service.find({ isDeleted: false });
  return result;
};

const updateSingleService = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteSingleService = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const servicesService = {
  createService,
  getSingleService,
  getAllServices,
  updateSingleService,
  deleteSingleService,
};

export default servicesService;
