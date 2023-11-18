import { NextFunction, Request, Response } from "express";
import TodoService from "../services/todoService";

class TodoController {
  static async createTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { title },
        user: id,
      } = req;

      const { savedTodo, message } = await TodoService.createTodo(
        { title },
        id
      );
      res.json({ savedTodo, message });
    } catch (err) {
      next(err);
    }
  }

  static async updateTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { title },
        params: { id },
      } = req;

      const { updateTodo, message } = await TodoService.updateTodo(id, {
        title,
      });
      return res.json({ updateTodo, message });
    } catch (err) {
      next(err);
    }
  }

  static async getAllTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        user: { id },
      } = req;
      const { todo, message } = await TodoService.getAllTodo(id);

      res.json({ todo, message });
    } catch (err) {
      next(err);
    }
  }

  static async getOneTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const { todo, message } = await TodoService.getOneTodo(id);
      return res.json({ todo, message });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const { softDelete, message } = await TodoService.deleteTodo(id);
      return res.json({ softDelete, message });
    } catch (err) {
      next(err);
    }
  }

  static async completeTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        body: { completed },
      } = req;

      const { completeTodo, message } = await TodoService.completeTodo(id, completed);
      return res.json({ completeTodo, message });
    } catch (err) {
      next(err);
    }
  }
}

export default TodoController;