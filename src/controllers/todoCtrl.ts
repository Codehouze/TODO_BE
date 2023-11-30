import { NextFunction, Request, Response } from "express";
import TodoService from "../services/todoService";

class TodoController {
  // Handle creating a new todo
  static async createTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract title from the request body 
      const  { title } = req.body;
      // Call the createTodo method in the TodoService to create a new todo
      const { savedTodo, message } = await TodoService.createTodo({ title });
      res.json({ savedTodo, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle updating a todo by ID
  static async updateTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract title from the request body and todo ID from the request parameters
      const {
        body: { title },
        params: { id },
      } = req;

      // Call the updateTodo method in the TodoService to update the todo
      const { updatedTodo, message } = await TodoService.updateTodo(id, { title });
      return res.json({ updatedTodo, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle retrieving all todos for a user
  static async getAllTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract user ID from the request user
     

      // Call the getAllTodo method in the TodoService to retrieve all todos
      const { todo, message } = await TodoService.getAllTodo();

      res.json({ todo, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle retrieving a single todo by ID
  static async getOneTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract todo ID from the request parameters
      const {
        params: { id },
      } = req;

      // Call the getOneTodo method in the TodoService to retrieve a single todo
      const { todo, message } = await TodoService.getOneTodo(id);
      return res.json({ todo, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle deleting a todo by ID (soft delete)
  static async deleteTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract todo ID from the request parameters
      const {
        params: { id },
      } = req;

      // Call the deleteTodo method in the TodoService to delete the todo
      const { softDelete, message } = await TodoService.deleteTodo(id);
      return res.json({ softDelete, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }

  // Handle marking a todo as completed
  static async completeTodo(req: any, res: Response, next: NextFunction) {
    try {
      // Extract todo ID and completion status from the request parameters and body
      const {
        params: { id },
        body: { completed },
      } = req;

      // Call the completeTodo method in the TodoService to mark the todo as completed
      const { completeTodo, message } = await TodoService.completeTodo(id, completed);
      return res.json({ completeTodo, message });
    } catch (err) {
      // Pass the error to the error-handling middleware
      next(err);
    }
  }
}

export default TodoController;
