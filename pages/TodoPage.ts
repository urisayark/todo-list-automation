
import { expect, Locator, Page } from "@playwright/test";

export class TodoPage {
  // Store the page and reusable element locators
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locate elements used by the tests
    this.todoInput = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.locator(".todo-list li");
    this.todoCount = page.locator(".todo-count");
  }

  // Open the TodoMVC website
  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc");
  }

  // Add a todo by entering text and pressing Enter
  async addTodo(todo: string) {
    await this.todoInput.fill(todo);
    await this.todoInput.press("Enter");
  }

  // Mark a todo as completed
  async completeTodo(todo: string) {
    const item = this.findTodo(todo);
    await item.getByRole("checkbox").check();
  }

  // Mark a completed todo as active again
  async uncompleteTodo(todo: string) {
    const item = this.findTodo(todo);
    await item.getByRole("checkbox").uncheck();
  }

  // Delete a todo (hover to reveal the delete button)
  async deleteTodo(todo: string) {
    const item = this.findTodo(todo);
    await item.hover();
    await item.locator("button.destroy").click();
  }

  // Edit a todo by replacing its existing text
  async editTodo(oldTodo: string, newTodo: string) {
    const item = this.findTodo(oldTodo);

    // Double-click the text to enter edit mode
    await item.locator("label").dblclick();

    const editInput = item.locator("input.edit");
    await editInput.fill(newTodo);
    await editInput.press("Enter");
  }

  // Show only active todos
  async filterActive() {
    await this.page.getByRole("link", { name: "Active" }).click();
  }

  // Show only completed todos
  async filterCompleted() {
    await this.page.getByRole("link", { name: "Completed" }).click();
  }

  // Show all todos
  async filterAll() {
    await this.page.getByRole("link", { name: "All" }).click();
  }

  // Remove all completed todos
  async clearCompleted() {
    await this.page
      .getByRole("button", {
        name: "Clear completed",
      })
      .click();
  }

  // Find a todo by its exact text inside the todo list
  findTodo(todo: string): Locator {
    return this.todoItems.filter({
      has: this.page.locator("label").getByText(todo, { exact: true }),
    });
  }


  // Verify that a todo is visible
  async expectTodoVisible(todo: string) {
    await expect(this.findTodo(todo)).toBeVisible();
  }

  // Verify that a todo no longer exists in the list
  async expectTodoNotVisible(todo: string) {
    await expect(this.findTodo(todo)).toHaveCount(0);
  }

  // Verify that a todo is completed
  async expectTodoCompleted(todo: string) {
    const item = this.findTodo(todo);

    await expect(item).toHaveClass(/completed/);
    await expect(item.getByRole("checkbox")).toBeChecked();
  }

  // Verify that a todo is active and not completed
  async expectTodoActive(todo: string) {
    const item = this.findTodo(todo);

    await expect(item).not.toHaveClass(/completed/);
    await expect(item.getByRole("checkbox")).not.toBeChecked();
  }

  // Verify the number of remaining active todos
  async expectActiveCount(count: number) {
    const label = count === 1 ? "item" : "items";

    await expect(this.todoCount).toContainText(`${count} ${label} left`);
  }
}
