import Todo from "../database/entity/Todo"; // todo model
import { ITodo } from "../interface/index"; // interface for todo data
import { DB } from "../database/config/index"; // Db connection object


class TodoService {
  // Create a new todo for a user
  static async createTodo(
    { title }: ITodo,
  
  ): Promise<{ savedTodo: ITodo; message: string }> {
    const todoRepo = DB.getRepository(Todo);
    const todo = new Todo();
    todo.title = title;

    const savedTodo = await todoRepo.save(todo);
    return { savedTodo, message: "Todo created successfully!" };
  }
  // Update the title of a todo
  static async updateTodo(id: number, { title }: ITodo): Promise<any> {
    const todo = await this.getTodo(id);

    if (todo) {
      todo.title = title;
      await Todo.update(id, todo);
      const updatedTodo = await this.getTodo(id);
      return { updatedTodo, message: "Todo was updated successfully" };
    }
    return { message: "Todo was not found" };
  }
  
  // Mark a todo as completed
  static async completeTodo(id: number, completed: boolean): Promise<any> {
    const getTodo = await this.getTodo(id)
    if(getTodo?.completed===false){
    const completeTodo = await Todo.update(id, { completed: true });
    return { completeTodo, message: "Todo completed" };
    }
    const unCompletedTodo = await Todo.update(id, { completed: false });
   
      return { unCompletedTodo, message: "Todo has not been uncompleted" };
    }

  
 // Get all todos 
  static async getAllTodo(): Promise<any> {
    const todoRepository = DB.getRepository(Todo);
    const todo = await todoRepository.find({
      where: {  isDeleted: false },
    });

    if (todo.length == 0) {
      return { data: [], message: "Todo Not Found" };
    }
    return { todo, message: "Todo Found" };
  }
 // Helper function to get a todo by ID
  private static async getTodo(id: number) {
    const todoRepository = DB.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, isDeleted: false },
    });
    return todo;
  }
 // Get a specific todo by ID
  static async getOneTodo(id: number): Promise<any> {
    const todo = await this.getTodo(id);
    if (!todo) {
      return "Todo not found";
    }

    return { todo, message: "Todo found" };
  }
 // Delete a todo (soft delete by marking as deleted)
  static async deleteTodo(id: number): Promise<any> {
    const todoRepository = DB.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!todo) {
      return { message: "Todo not found" };
    }
    const softDelete = await todoRepository.update(id, { isDeleted: true });

    return { softDelete, message: "Todo deleted successfully" };
  }
}
export default TodoService;
