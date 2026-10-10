
import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";

// Group all Todo List test cases
test.describe("Todo List", () => {
  let todoPage: TodoPage;

  // Open the website before each test
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  // TC01: Add a new todo
  test("TC01 - Add a new todo", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.expectTodoVisible("Buy milk");
    await todoPage.expectActiveCount(1);
  });

  // TC02: Add multiple todos
  test("TC02 - Add multiple todos", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.addTodo("Go to gym");

    await todoPage.expectTodoVisible("Buy milk");
    await todoPage.expectTodoVisible("Go to gym");
    await todoPage.expectActiveCount(2);
  });

  // TC03: Complete a todo
  test("TC03 - Complete a todo", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.completeTodo("Buy milk");

    await todoPage.expectTodoCompleted("Buy milk");
    await todoPage.expectActiveCount(0);
  });

  // TC04: Mark a completed todo as active again
  test("TC04 - Uncomplete a todo", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.completeTodo("Buy milk");
    await todoPage.uncompleteTodo("Buy milk");

    await todoPage.expectTodoActive("Buy milk");
    await todoPage.expectActiveCount(1);
  });

  // TC05: Delete a todo and verify the list is empty
  test("TC05 - Delete a todo", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.deleteTodo("Buy milk");

    // Check the item count because the count label may disappear when empty
    await todoPage.expectTodoNotVisible("Buy milk");
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  // TC06: Edit an existing todo
  test("TC06 - Edit an existing todo", async () => {
    await todoPage.addTodo("Buy milk");
    await todoPage.editTodo("Buy milk", "Buy coffee");

    await todoPage.expectTodoNotVisible("Buy milk");
    await todoPage.expectTodoVisible("Buy coffee");
  });

  // TC07: Prevent adding an empty todo
  test("TC07 - Do not add an empty todo", async () => {
    await todoPage.todoInput.press("Enter");

    await expect(todoPage.todoItems).toHaveCount(0);
  });

  // TC08: Show active todos only
  test("TC08 - Filter active todos", async () => {
    await todoPage.addTodo("Active task");
    await todoPage.addTodo("Completed task");
    await todoPage.completeTodo("Completed task");

    await todoPage.filterActive();

    await todoPage.expectTodoVisible("Active task");
    await expect(todoPage.findTodo("Completed task")).toBeHidden();
  });

  // TC09: Show completed todos only
  test("TC09 - Filter completed todos", async () => {
    await todoPage.addTodo("Active task");
    await todoPage.addTodo("Completed task");
    await todoPage.completeTodo("Completed task");

    await todoPage.filterCompleted();

    await todoPage.expectTodoVisible("Completed task");
    await expect(todoPage.findTodo("Active task")).toBeHidden();
  });

  // TC10: Remove completed todos but keep active ones
  test("TC10 - Clear completed todos", async () => {
    await todoPage.addTodo("Active task");
    await todoPage.addTodo("Completed task");
    await todoPage.completeTodo("Completed task");

    await todoPage.clearCompleted();

    await todoPage.expectTodoVisible("Active task");
    await todoPage.expectTodoNotVisible("Completed task");
    await todoPage.expectActiveCount(1);
  });

  // TC11: Verify todo persists after refresh
  test("TC11 - Todo persists after refresh", async ({ page }) => {
    await todoPage.addTodo("Buy milk");

    await page.reload();

    await todoPage.expectTodoVisible("Buy milk");
  });

  // TC12: Return to All and show both active and completed todos
  test("TC12 - Return to All filter", async () => {
    await todoPage.addTodo("Active task");
    await todoPage.addTodo("Completed task");
    await todoPage.completeTodo("Completed task");

    await todoPage.filterActive();
    await todoPage.filterAll();

    await todoPage.expectTodoVisible("Active task");
    await todoPage.expectTodoVisible("Completed task");
  });
});
