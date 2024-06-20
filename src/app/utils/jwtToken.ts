import jwt from "jsonwebtoken";
import config from "../config";

const createToken = (user: object, expires: string) => {
  return jwt.sign(user, config.jwt_access_secret as string, {
    expiresIn: expires,
  });
};

export default createToken;
