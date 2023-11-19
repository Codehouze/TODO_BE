import { ICreateUser } from "../interface";

import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";


class UserController {
  // Handle user registration
  static async signUp(req: any, res: Response, next: NextFunction) {
    try {
      // Extract email and password from the request body
      const {
        body: { email, password },
      } = req;

      // Create a payload object for user creation
      const payload: ICreateUser = {
        email,
        password,
      };

      // Call the signUp method in the UserService to register the user
      const { data, message } = await UserService.signUp(payload);

      // Return a JSON response with the result
      return res.json({ data, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle user login
  static async login(req: any, res: Response, next: NextFunction) {
    try {
      // Extract email and password from the request body
      const {
        body: { email, password },
      } = req;

      // Create a payload object for user login
      const payload: ICreateUser = {
        email,
        password,
      };

      // Call the login method in the UserService to authenticate the user
      const { data, message } = await UserService.login(payload);

      // Return a JSON response with the result
      return res.json({ data, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle retrieving a single user by ID
  static async getOne(req: any, res: Response, next: NextFunction) {
    try {
      // Extract user ID from the request parameters
      const {
        params: { id },
      } = req;

      // Call the getOne method in the UserService to retrieve the user
      const { user, message } = await UserService.getOne(id);

      // Return a JSON response with the result
      return res.json({ user, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }
}

export default UserController;
