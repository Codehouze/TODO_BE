import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICreateUser } from "../interface/index";
import User from "../database/entity/User";
import { DB } from "../database/config";
import { generateToken } from "../helpers/generateToken";

class UserService {
  static async signUp(data: ICreateUser): Promise<any> {
    const { email, password } = data;

    const userRepository = DB.getRepository(User);

    const userExist = await userRepository.findOne({ where: { email } });

    if (userExist) {
      return { message: "User already exist" };
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    const newUser = await user.save();
    const payload = { email };
    return { payload, message: "user created successfully" };
  }

  static async login(payload: ICreateUser): Promise<any> {
    const { email, password } = payload;

    const userRepository = DB.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { message: "Invalid username or password" };
      }
      const token = generateToken(user.id, email);
      const data = { email, token };
      return { data, message: "user login successfully" };
    }
  }
  static async getOne(id: number): Promise<any> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return { message: "User not found" };
    }

    return { data: user.email, message: "User found" };
  }
}

export default UserService;
