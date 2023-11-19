import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICreateUser } from "../interface/index";
import User from "../database/entity/User";
import { DB } from "../database/config";
import { generateToken } from "../helpers/generateToken";


class UserService {
  // Create a new user with email and password
  static async signUp(data: ICreateUser): Promise<any> {
    const { email, password } = data;

    // Get the user repository from the database connection
    const userRepository = DB.getRepository(User);

    // Check if the user already exists
    const userExist = await userRepository.findOne({ where: { email } });

    if (userExist) {
      return { message: "User already exists" };
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance and save it to the database
    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    const newUser = await user.save();
    const payload = { email };
    return { payload, message: "User created successfully" };
  }

  // Authenticate a user and generate an authentication token
  static async login(payload: ICreateUser): Promise<any> {
    const { email, password } = payload;

    // Get the user repository from the database connection
    const userRepository = DB.getRepository(User);

    // Find the user by email in the database
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { message: "Invalid username or password" };
      }

      // Generate an authentication token
      const token = generateToken(user.id, email);
      const data = { email, token };
      return { data, message: "User login successful" };
    }
  }

  // Get a user by ID
  static async getOne(id: number): Promise<any> {
    // Find the user by ID in the database
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return { message: "User not found" };
    }

    return { user: user.email, message: "User found" };
  }
}

export default UserService;
