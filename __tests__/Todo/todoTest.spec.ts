import sinon from "sinon";
import TodoService from "../../src/services/todoService";
import { DB } from "../../src/database/config/index";
import { expect } from "chai";
import User from "../../src/database/entity/User";
import Todo from "../../src/database/entity/Todo";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

let authToken;
let userId;
describe("TODO Application Unit test", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("User Token", function () {
    it("should return a valid authentication token", () => {
      const user = new User();

      user.id = faker.datatype.number();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.createdAt = faker.date.past();
      user.updatedAt = faker.date.past();

      userId = user.id;
      const email = user.email;
      authToken = jwt.sign({ userId, email }, "dev_Prodigy");
      expect(authToken).to.be.a("string");
      expect(authToken).to.be.a("string");
    });
  });
  describe("TodoService", () => {
    describe("Create A Todo", () => {
      it("should create a todo successfully", async () => {
        const todoRepoStub = sinon.stub();
        todoRepoStub.resolves(new Todo());
        const todoRepo = {
          save: sinon.stub().resolves({
            id: 1,
            title: "Test Todo",
            completed: "false",
            user: userId,
          }),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.createTodo(
          { title: "Test Todo" },
          userId
        );

        expect(result.savedTodo).to.deep.equal({
          id: 1,
          title: "Test Todo",
          completed: "false",
          user: userId,
        });
        expect(result.message).to.equal("Todo created successfully!");
      });
    });

    describe("Update Todo", () => {
      it("should update a todo successfully", async () => {
        const todo = {
          id: 1,
          title: "Test Todo",
          completed: false,
          user: userId,
        };
        const updatedTodo = {
          id: 1,
          title: "Updated Todo",
          completed: false,
          user: userId,
        };

        const getTodoStub = sinon.stub(TodoService, "getTodo").resolves(todo);

        const updateStub = sinon.stub(Todo, "update").resolves(updatedTodo);

        const result = await TodoService.updateTodo(1, {
          title: "Updated Todo",
        });

        sinon.assert.calledWith(getTodoStub, 1);

        sinon.assert.calledWith(updateStub, 1, updatedTodo);

        expect(result).to.deep.equal({
          updatedTodo: updatedTodo,
          message: "Todo was updated successfully",
        });
      });

      it("should return an error message when the todo is not found", async () => {
        const getTodoStub = sinon.stub(TodoService, "getTodo").resolves(null);

        const result = await TodoService.updateTodo(1, {
          title: "Updated Todo",
        });

        expect(result).to.deep.equal({ message: "Todo was not found" });

        getTodoStub.restore();
      });
    });

    describe("Get All Todo", () => {
      it("should return an array of todo's", async () => {
        const todoRepo = {
          find: sinon.stub().resolves([
            { id: 1, title: "Todo 1", completed: false },
            { id: 2, title: "Todo 2", completed: true },
          ]),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.getAllTodo(1);

        expect(result.todo).to.deep.equal([
          { id: 1, title: "Todo 1", completed: false },
          { id: 2, title: "Todo 2", completed: true },
        ]);
        expect(result.message).to.equal("Todo Found");

        sinon.restore();
      });

      it("should return an empty array and an error message if no todo's are found", async () => {
        const todoRepo = {
          find: sinon.stub().resolves([]),
        };
        sinon.stub(DB, "getRepository").returns(todoRepo);

        const result = await TodoService.getAllTodo(2);
        expect(result.data).to.deep.equal([]);
        expect(result.message).to.equal("Todo Not Found");
      });
    });
  });
  describe("Get One Todo", () => {
    it("should return the todo when a valid id is provided", async () => {
      const todo = {
        id: 1,
        title: "Test Todo",
        completed: false,
        user: userId,
      };

      sinon.stub(TodoService, "getOneTodo").resolves(todo);

      const result = await TodoService.getOneTodo(1);
      expect(result).to.deep.equal({
        id: 1,
        title: "Test Todo",
        completed: false,
        user: userId,
      });
    });
  });

  describe("Complete A Todo", () => {
    it("should complete a todo successfully", async () => {
      const todo = {
        id: 1,
        title: "Test Todo",
        completed: false,
        user: userId,
      };
      const updateStub = sinon.stub(Todo, "update").resolves(todo);

      const result = await TodoService.completeTodo(1, true);
      sinon.assert.calledWith(updateStub, 1, { completed: true }); // assert that update was called with the correct arguments
      expect(result.message).to.equal("Todo completed");
    });
  });
  describe ('Delete A Todo',()=>{
    it("should delete a todo successfully", async () => {
      const todoRepository = DB.getRepository(Todo);
    const todo = {
      id: 1,
      title: "Test Todo",
      completed: false,
      user: userId,
      isDeleted: false
    };
    const findOneStub = sinon.stub(todoRepository, "findOne").resolves(todo);
    const updateStub = sinon.stub(todoRepository, "update").resolves(true);
  
    const result = await TodoService.deleteTodo(1);
    sinon.assert.calledWith(findOneStub, { where: { id: 1, isDeleted: false } });
    sinon.assert.calledWith(updateStub, 1, { isDeleted: true });
    expect(result).to.deep.equal({
      softDelete: true,
      message: "Todo deleted successfully"
    });
  });
  
  it("should return 'Todo not found' if todo is not found", async () => {
    const todoRepository = DB.getRepository(Todo);
    const findOneStub = sinon.stub(todoRepository, "findOne").resolves(undefined);
  
    const result = await TodoService.deleteTodo(1);
    sinon.assert.calledWith(findOneStub, { where: { id: 1, isDeleted: false } });
    expect(result).to.deep.equal({ message: "Todo not found" });
  });})
});


