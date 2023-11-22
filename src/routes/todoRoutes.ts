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
 *     
 *     post:
 *       summary: Create a new todo item.
 *       tags: [Todo]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *               required:
 *                 - title
 *       responses:
 *         201:
 *           description: Todo created successfully. Returns the created todo.  
 *        
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
 *      
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
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *       responses:
 *         200:
 *           description: Successful response. Returns the updated todo.
 *         404:
 *           description: Todo not found.
 *     
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
 *     
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
 */



import express from "express";
import validator from "../middleware/validate";
import TodoController from "../controllers/todoCtrl";


const router = express.Router();

// Define the routes
//Add a to-do
router.post(
  "/",
  // validator.todoValidator,
  TodoController.createTodo
); 

router.get("/",  TodoController.getAllTodo); // List all todos

router.get("/:id",  TodoController.getOneTodo); // Return a todo

router.patch(
  "/:id",
  validator.todoValidator,
  TodoController.updateTodo
); 

// Change a to-do
router.patch(
  "/complete/:id",
  validator.todoValidator,
  TodoController.completeTodo
);
router.delete("/:id", 
TodoController.deleteTodo);

export default router;