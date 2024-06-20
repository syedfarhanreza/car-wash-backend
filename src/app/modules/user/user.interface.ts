import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export default TUser;

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
