/* eslint-disable dot-notation */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable quotes */
const request = require("supertest");
const db = require("../models/index");
const app = require("../app");

let server, agent;

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo and responds with json at /todos", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.id).toBeDefined();
  });

  test("Marks a todo as complete", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponse = JSON.parse(response.text);
    const todoID = parsedResponse.id;

    expect(parsedResponse.completed).toBe(false);

    const markCompleteResponse = await agent
      .put(`/todos/${todoID}/markASCompleted`)
      .send();
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });

 
  test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
    // FILL IN YOUR CODE HERE
    const todo = await agent.post("/todos").send({
      title: "delete",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponse = JSON.parse(todo.text);
    const todoID = parsedResponse.id;
    expect(parsedResponse.title).toBe("delete");
    const deleteTodoResponse = await agent.delete(`/todos/${todoID}`);
    const parsedDeleteResponse = JSON.parse(response.text);
    expect(parsedDeleteResponse).toStrictEqual({});
  });
});
