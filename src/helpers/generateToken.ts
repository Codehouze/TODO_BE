import * as jwt from "jsonwebtoken";
import config from "../config/index";

const { APP_SECRET } = config;
export const generateToken = (userId: number, email: string) => {
  const token = jwt.sign({ userId, email }, APP_SECRET, { expiresIn: "1d" });
  return token;
};
