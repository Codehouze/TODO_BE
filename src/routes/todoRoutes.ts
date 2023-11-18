/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo managing API
 * paths:
 *   /todo:
 *     get:
 *       summary: Get all todos
 *       tags: [Todo]
 *       responses:
 *         200:
 *           description: Successful response. Returns a list of todos.
 *       security:
 *         - bearerAuth: []
 *     post:
 *       summary: Create a todo
 *       tags: [Todo]
 *       responses:
 *         201:
 *           description: Todo created successfully. Returns the created todo.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: title
 *           required: true
 *           schema:
 *             type: string
 *           description: The title of the todo
 *         - in: header
 *           name: Authorization
 *           required: true
 *           schema:
 *             type: string
 *           description: Bearer token for user authentication
 *   /todo/{id}:
 *     get:
 *       summary: Get a todo by ID
 *       tags: [Todo]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the todo
 *       responses:
 *         200:
 *           description: Successful response. Returns the requested todo.
 *         404:
 *           description: Todo not found.
 *       security:
 *         - bearerAuth: []
 *     patch:
 *       summary: Update a todo by ID
 *       tags: [Todo]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the todo
 *       responses:
 *         200:
 *           description: Successful response. Returns the updated todo.
 *         404:
 *           description: Todo not found.
 *       security:
 *         - bearerAuth: []
 *     delete:
 *       summary: Delete a todo by ID
 *       tags: [Todo]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the todo
 *       responses:
 *         200:
 *           description: Successful response. Returns a confirmation message.
 *         404:
 *           description: Todo not found.
 *       security:
 *         - bearerAuth: []
 *   /todo/complete/{id}:
 *     patch:
 *       summary: Complete a todo by ID
 *       tags: [Todo]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the todo to complete
 *         - in: query
 *           name: completed
 *           required: true
 *           schema:
 *             type: boolean
 *           description: Set to true to mark the todo as completed
 *       responses:
 *         200:
 *           description: Successful response. Returns the completed todo.
 *         404:
 *           description: Todo not found.
 *       security:
 *         - bearerAuth: []
 */

import express from "express";
import validator from "../middlewares/validate";
import TodoController from "../controllers/todoCtrl";
import verifyJwToken from "../middlewares/authenticate";

const router = express.Router();

// Define the routes
router.post(
  "/",
  verifyJwToken,
  validator.todoValidator,
  TodoController.createTodo
); //Add a to-do

router.get("/", verifyJwToken, TodoController.getAllTodo); // List all todos

router.get("/:id", verifyJwToken, TodoController.getOneTodo); // Return a todo

router.patch(
  "/:id",
  verifyJwToken,
  validator.todoValidator,
  TodoController.updateTodo
); // Change a to-do

router.patch(
  "/complete/:id",
  verifyJwToken,
  validator.todoValidator,
  TodoController.completeTodo
);
router.delete("/:id", verifyJwToken, TodoController.deleteTodo);

export default router;