import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppProvider from "@/components/provider/app-provider";
import AppRoutesProvider from "@/components/provider/app-routes-provider";
import { MemoryRouter } from "react-router";
import Cookies from "universal-cookie";
import { apiUrl } from "@/mocks/utils";
import { Todo } from "@/types";
import { format } from "date-fns";
import { mockData } from "@/mocks/data";
import TodoForm from "@/pages/dashboard/Todo/todo-form";
import { vi } from "vitest";

const getLoginPageElements = async () => {
  return {
    formTitle: await screen.findByRole("heading", { name: /login/i }),
    formDescription: await screen.findByText(/access your everyvote todo account/i),
    emailInput: await screen.findByPlaceholderText(/email/i),
    passwordInput: await screen.findByPlaceholderText(/password/i),
    loginButton: await screen.findByRole("button", { name: /login/i }),
    registerlink: await screen.findByRole("link", { name: /register/i }),
    homeLink: await screen.findByRole("link", { name: /home/i }),
  };
};

const renderDashboard = () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppRoutesProvider />
      </MemoryRouter>
    </AppProvider>,
  );
};

const loginUser = async () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutesProvider />
      </MemoryRouter>
    </AppProvider>,
  );

  const user = userEvent.setup();

  const loginLink = await screen.findByRole("link", { name: /login/i });

  await user.click(loginLink);

  const { emailInput, passwordInput, loginButton } = await getLoginPageElements();

  await user.type(emailInput, "test-user-1@example.com");
  await user.type(passwordInput, "12345");
  await user.click(loginButton);
};

const logoutUser = async () => {
  renderDashboard();

  const user = userEvent.setup();

  const userAvatarButton = await screen.findByTestId("user-avatar-button");

  await user.click(userAvatarButton);

  const logoutButton = await screen.findByText(/logout/i);

  await user.click(logoutButton);
};

describe("Dashboard", () => {
  let token = "";

  beforeEach(async () => {
    await loginUser();
    const cookies = new Cookies();
    token = cookies.get("auth-token");
  });

  afterAll(async () => {
    await logoutUser();
    token = "";
  });

  it("should render todo list header component correctly", async () => {
    const response = await fetch(apiUrl("/todos"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const todos = ((await response.json()) as { todos: Todo[] }).todos;
    const total = todos.length;
    const completed = todos.filter((todo) => todo.status).length;
    const uncompleted = total - completed;

    const createTodoButton = await screen.findByRole("button", { name: /create todo/i });
    const totalTodo = await screen.findByLabelText("total-todo");
    const totalTodoLabel = await screen.findByLabelText("total-todo-label");
    const completedTodo = await screen.findByLabelText("completed-todo");
    const completedTodoLabel = await screen.findByLabelText("completed-todo-label");
    const unCompletedTodo = await screen.findByLabelText("uncompleted-todo");
    const unCompletedTodoLabel = await screen.findByLabelText("uncompleted-todo-label");

    expect(createTodoButton).toBeInTheDocument();
    expect(totalTodo).toBeInTheDocument();
    expect(totalTodoLabel).toBeInTheDocument();
    expect(completedTodo).toBeInTheDocument();
    expect(completedTodoLabel).toBeInTheDocument();
    expect(unCompletedTodo).toBeInTheDocument();
    expect(unCompletedTodoLabel).toBeInTheDocument();

    expect(totalTodo).toHaveTextContent(total.toString());
    expect(totalTodoLabel).toHaveTextContent(/total/i);
    expect(completedTodo).toHaveTextContent(completed.toString());
    expect(completedTodoLabel).toHaveTextContent(/completed/i);
    expect(unCompletedTodo).toHaveTextContent(uncompleted.toString());
    expect(unCompletedTodoLabel).toHaveTextContent(/uncompleted/i);
  });

  it("should render todo list component correctly", async () => {
    const response = await fetch(apiUrl("/todos"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const todos = ((await response.json()) as { todos: typeof mockData.todos }).todos.map(
      ({ uuid, updatedAt, deletedAt, user_uuid, ...todo }) => ({
        ...todo,
        status: todo.status ? "Completed" : "Uncompleted",
        dueDate: format(new Date(todo.dueDate), "PP"),
        createdAt: format(new Date(todo.createdAt), "PPp"),
      }),
    );

    const sortedTodos = todos.sort((a, b) =>   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // prettier-ignore

    const todoTable = await screen.findByRole("table");
    const headerTitles = ["Title", "Status", "Due Date", "Created At"];

    const tableRows = within(todoTable).getAllByRole("row");
    const tableHeader = tableRows[0];
    const tableData = tableRows.slice(1);

    headerTitles.forEach((title) => {
      const header = within(tableHeader).getByRole("columnheader", { name: new RegExp(title, "i") });
      expect(header).toBeInTheDocument();
    });

    sortedTodos.forEach((todo, rowIndex) => {
      Object.values(todo).forEach((value, colIndex) => {
        const cells = within(tableData[rowIndex]).getAllByRole("cell");
        cells.pop(); //* include actions column

        expect(cells[colIndex]).toHaveTextContent(new RegExp(String(value), "i"));
      });
    });
  });

  describe("Todo ", () => {
    const getTodoFromFields = async (
      container: HTMLElement,
      headingTitle: string,
      fromDescription: string,
    ) => {
      return {
        formTitle: await within(container).findByRole("heading", { name: new RegExp(headingTitle, "i") }),
        formDescription: await within(container).findByText(new RegExp(fromDescription, "i")),
        titleInput: await within(container).findByPlaceholderText(/title/i),
        descriptionInput: await within(container).findByPlaceholderText(/description/i),
        dataInput : await within(container).findByText(new RegExp(format(new Date(), 'PPP'), 'i')), // prettier-ignore
        cancelButton: await within(container).findByRole("button", { name: /cancel/i }),
        submitButton: await within(container).findByRole("button", { name: /submit/i }),
      };
    };

    it("should render the todo form correctly", async () => {
      const user = userEvent.setup();

      const createTodoButton = await screen.findByRole("button", { name: /create todo/i });

      await user.click(createTodoButton);

      const createTodoDialog = await screen.findByTestId("create-todo-dialog");
      const elements = await getTodoFromFields(createTodoDialog, "create todo", "new todo");

      Object.values(elements).forEach((element) => expect(element).toBeInTheDocument());
    });

    it("should show error message if fields are empty", async () => {
      const user = userEvent.setup();

      const createTodoButton = await screen.findByRole("button", { name: /create todo/i });

      await user.click(createTodoButton);

      const createTodoDialog = await screen.findByTestId("create-todo-dialog");
      const { submitButton } = await getTodoFromFields(createTodoDialog, "create todo", "new todo");

      await user.click(submitButton);

      for (const field of ["title", "description"]) {
        const regex = new RegExp(`${field}.*required`, "i");
        expect(screen.getByText(regex)).toBeInTheDocument();
      }
    });

    it("should create a todo when all fields are filled and submit button is clicked", async () => {
      const user = userEvent.setup();

      const createTodoButton = await screen.findByRole("button", { name: /create todo/i });

      await user.click(createTodoButton);

      const createTodoDialog = await screen.findByTestId("create-todo-dialog");
      const { titleInput, descriptionInput, submitButton } = await getTodoFromFields(
        createTodoDialog,
        "create todo",
        "new todo",
      );

      await user.type(titleInput, "test-title");
      await user.type(descriptionInput, "test-description");
      await user.click(submitButton);

      expect(await screen.findByText(/todo created/i)).toBeInTheDocument();
    });

    it("should update todo when all fields filled and submit button is clicked", async () => {
      //** update props seems like props data is passing through the component
      const { unmount } = render(
        <AppProvider>
          <MemoryRouter initialEntries={["/dashboard"]}>
            <TodoForm data={mockData.todos[0] as any} handleClose={vi.fn} />
          </MemoryRouter>
        </AppProvider>,
      );

      const user = userEvent.setup();

      const todoTable = await screen.findByRole("table");

      const firstRow = within(todoTable).getAllByRole("row").slice(1)[0];
      const cells = within(firstRow).getAllByRole("cell");
      const actionCell = cells[cells.length - 1];
      const actionButton = within(actionCell).getByRole("button");

      user.click(actionButton);

      const editButton = await screen.findByText(/edit/i);

      user.click(editButton);

      const editTodoDialog = await screen.findByTestId("edit-todo-dialog");

      const { titleInput, descriptionInput, submitButton } = await getTodoFromFields(
        editTodoDialog,
        "update todo",
        "update the todo",
      );

      await user.clear(titleInput);
      await user.clear(descriptionInput);

      await user.type(titleInput, "test-title updated");
      await user.type(descriptionInput, "test-description updated");
      await user.click(submitButton);

      unmount();

      expect(await screen.findByText(/todo updated/i)).toBeInTheDocument();
    });

    it('should toggle todo status from "COMPLETED to UNCOMPLETE and vice versa"', async () => {
      const user = userEvent.setup();

      const todoTable = await screen.findByRole("table");

      const firstRow = within(todoTable).getAllByRole("row").slice(1)[1];
      const cells = within(firstRow).getAllByRole("cell");
      const actionCell = cells[cells.length - 1];
      const actionButton = within(actionCell).getByRole("button");

      user.click(actionButton);

      const markAsCompletedButton = await screen.findByText(/mark as "completed"/i);

      await user.click(markAsCompletedButton);

      expect(await screen.findByText(/marked as "completed"/i)).toBeInTheDocument();

      user.click(actionButton);

      const markAsUnCompletedButton = await screen.findByText(/mark as "uncompleted"/i);

      await user.click(markAsUnCompletedButton);

      expect(await screen.findByText(/marked as "uncompleted"/i)).toBeInTheDocument();
    });

    it("should delete todo when delete button is clicked", async () => {
      const user = userEvent.setup();

      const todoTable = await screen.findByRole("table");

      const firstRow = within(todoTable).getAllByRole("row").slice(1)[1];
      const cells = within(firstRow).getAllByRole("cell");
      const actionCell = cells[cells.length - 1];
      const actionButton = within(actionCell).getByRole("button");

      user.click(actionButton);

      const deleteButton = await screen.findByText(/delete/i);

      await user.click(deleteButton);

      const deleleteConfirmationDialog = await screen.findByTestId("delete-todo-dialog");
      const continueButton = within(deleleteConfirmationDialog).getByRole("button", {
        name: /continue/i,
      });

      await user.click(continueButton);

      expect(await screen.findByText(/deleted todo/i)).toBeInTheDocument();
    });
  });
});
