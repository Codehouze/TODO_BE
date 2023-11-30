import sinon from "sinon";
import TodoService from "../../src/services/todoService";
import { DB } from "../../src/database/config/index";
import { expect } from "chai";
import Todo from "../../src/database/entity/Todo";
import { faker } from "@faker-js/faker";

describe("TODO Application Unit test", () => {
  // Restore Sinon stubs before each test
  beforeEach(() => {
    sinon.restore();
  });


  // Section: TodoService
  describe("TodoService", () => {
    // Sub-section: Create A Todo
    describe("Create A Todo", () => {
      // Test creating a todo successfully
      it("should create a todo successfully", async () => {
        const todoRepoStub = sinon.stub();
        todoRepoStub.resolves(new Todo());
        const todoRepo = {
          save: sinon.stub().resolves({
            id: 1,
            title: "Test Todo",
            completed: "false",
 
          }),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.createTodo(
          { title: "Test Todo" },
        );
        // Assertions for the created todo
        expect(result.savedTodo).to.deep.equal({
          id: 1,
          title: "Test Todo",
          completed: "false",
  
        });
        expect(result.message).to.equal("Todo created successfully!");
      });
    });
    
    // Sub-section: Update Todo
    describe("Update Todo", () => {
      // Test updating a todo successfully
      it("should update a todo successfully", async () => {
        const todo = {
          id: 1,
          title: "Test Todo",
          completed: false,
      
        };
        const updatedTodo = {
          id: 1,
          title: "Updated Todo",
          completed: false,
        
        };

        const getTodoStub = sinon.stub(TodoService, "getTodo").resolves(todo);

        const updateStub = sinon.stub(Todo, "update").resolves(updatedTodo);

        const result = await TodoService.updateTodo(1, {
          title: "Updated Todo",
        });

        sinon.assert.calledWith(getTodoStub, 1);

        sinon.assert.calledWith(updateStub, 1, updatedTodo);
        // Assertions for the updated todo
        expect(result).to.deep.equal({
          updatedTodo: updatedTodo,
          message: "Todo was updated successfully",
        });
      });
       // Test updating a non-existent todo
      it("should return an error message when the todo is not found", async () => {
        const getTodoStub = sinon.stub(TodoService, "getTodo").resolves(null);

        const result = await TodoService.updateTodo(1, {
          title: "Updated Todo",
        });
        // Assertions for the non-existent todo update
        expect(result).to.deep.equal({ message: "Todo was not found" });

        getTodoStub.restore();
      });
    });

    // Sub-section: Get All Todo
    describe("Get All Todo", () => {
      // Test retrieving all todos successfully
      it("should return an array of todo's", async () => {
        const todoRepo = {
          find: sinon.stub().resolves([
            { id: 1, title: "Todo 1", completed: false },
            { id: 2, title: "Todo 2", completed: true },
          ]),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.getAllTodo();
      
        // Assertions for the retrieved todos
        expect(result.todo).to.deep.equal([
          { id: 1, title: "Todo 1", completed: false },
          { id: 2, title: "Todo 2", completed: true },
        ]);
        expect(result.message).to.equal("Todo Found");
        
        sinon.restore();
      });
      // Test retrieving no todos
      it("should return an empty array and an error message if no todo's are found", async () => {
        const todoRepo = {
          find: sinon.stub().resolves([]),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.getAllTodo();
        // Assertions for no retrieved todos
        expect(result.data).to.deep.equal([]);
        expect(result.message).to.equal("Todo Not Found");
      });
    });
  });
  // Sub-section: Get One Todo
  describe("Get One Todo", () => {
     // Test retrieving a single todo successfully
    it("should return the todo when a valid id is provided", async () => {
      const todo = {
        id: 1,
        title: "Test Todo",
        completed: false,
  
      };

      sinon.stub(TodoService, "getOneTodo").resolves(todo);

      const result = await TodoService.getOneTodo(1);
          
      // Assertions for the retrieved single todo
      expect(result).to.deep.equal({
        id: 1,
        title: "Test Todo",
        completed: false,

      });
    });
  });
// Sub-section: Complete A Todo
  describe("Complete A Todo", () => {
    // Test completing a todo successfully
    it("should complete a todo successfully", async () => {
      const todo = {
        id: 1,
        title: "Test Todo",
        completed: false,
   
      };
      const completeTodo = {
        id: 1,
        title: "Test Todo",
        completed: true,
   
      };
      const getTodoStub = sinon.stub(TodoService, "getTodo").resolves(todo);

      const updateStub = sinon.stub(Todo, "update").resolves(completeTodo);

      const result = await TodoService.completeTodo(1, true);
      // assert that update was called with the correct arguments
      sinon.assert.calledWith(updateStub, 1, { completed: true }); 
       // Assertions for the completed todo
      expect(result.message).to.equal("Todo completed");
    });
  });
  // Sub-section: Delete A Todo
  describe ('Delete A Todo',()=>{
    // Test deleting a todo successfully
    it("should delete a todo successfully", async () => {
      const todoRepository = DB.getRepository(Todo);
    const todo = {
      id: 1,
      title: "Test Todo",
      completed: false,
   
      isDeleted: false
    };
    const findOneStub = sinon.stub(todoRepository, "findOne").resolves(todo);
    const updateStub = sinon.stub(todoRepository, "update").resolves(true);
  
    const result = await TodoService.deleteTodo(1);
    sinon.assert.calledWith(findOneStub, { where: { id: 1, isDeleted: false } });
    sinon.assert.calledWith(updateStub, 1, { isDeleted: true });
    // Assertions for the deleted todo
    expect(result).to.deep.equal({
      softDelete: true,
      message: "Todo deleted successfully"
    });
  });
  // Test deleting a non-existent todo
  it("should return 'Todo not found' if todo is not found", async () => {
    const todoRepository = DB.getRepository(Todo);
    const findOneStub = sinon.stub(todoRepository, "findOne").resolves(undefined);
  
    const result = await TodoService.deleteTodo(1);
    sinon.assert.calledWith(findOneStub, { where: { id: 1, isDeleted: false } });
    // Assertions for the non-existent todo deletion
    expect(result).to.deep.equal({ message: "Todo not found" });
  });})
});


