import { ICreateUser } from "../interface";

import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  static async signUp(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { email, password },
      } = req;
      const payload: ICreateUser = {
        email,
        password,
      };
      const { data, message } = await UserService.signUp(payload);

      return res.json({ data, message });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { email, password },
      } = req;
      const payload: ICreateUser = {
        email,
        password,
      };
      const { data, message } = await UserService.login(payload);
      return res.json({ data, message });
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const { data, message } = await UserService.getOne(id);
      return res.json({ data, message });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
