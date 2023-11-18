import Todo from "../database/entity/Todo";
import { ITodo } from "../interface/index";
import { DB } from "../database/config/index";
import User from "../database/entity/User";

class TodoService {
  //TODO: create Todo
  static async createTodo(
    { title }: ITodo,
    id: User
  ): Promise<{ savedTodo: ITodo; message: string }> {
    const todoRepo = DB.getRepository(Todo);
    const todo = new Todo();
    todo.title = title;
    todo.user = id;
    const savedTodo = await todoRepo.save(todo);
    return { savedTodo, message: "Todo created successfully!" };
  }

  //TODO: Update TODO
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

  static async completeTodo(id: number, completed: boolean): Promise<any> {
    const completeTodo = await Todo.update(id, { completed: true });
    if (completeTodo) {
      return { completeTodo, message: "Todo completed" };
    }
  }

  //TODO: Update getTodo
  static async getAllTodo(id: any): Promise<any> {
    const todoRepository = DB.getRepository(Todo);
    const todo = await todoRepository.find({
      where: { user: id, isDeleted: false },
    });

    if (todo.length == 0) {
      return { data: [], message: "Todo Not Found" };
    }
    return { todo, message: "Todo Found" };
  }

  static async getTodo(id: number) {
    const todoRepository = DB.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, isDeleted: false },
    });
    return todo;
  }

  static async getOneTodo(id: number): Promise<any> {
    const todo = await this.getTodo(id);
    if (!todo) {
      return "Todo not found";
    }

    return { todo, message: "Todo found" };
  }

  // TODO: delete
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
