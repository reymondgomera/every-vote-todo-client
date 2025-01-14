import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import AppProvider from "@/components/provider/app-provider";
import RegisterPage from "@/pages/register/register-page";
import { render, screen } from "@testing-library/react";

describe("Register Page", () => {
  const renderComponent = () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </AppProvider>,
    );

    return {
      formTitle: screen.getByRole("heading", { name: /register/i }),
      formDescription: screen.getByText(/Join EveryVote/i),
      nameInput: screen.getByPlaceholderText(/name/i),
      emailInput: screen.getByPlaceholderText(/email/i),
      passwordInput: screen.getByPlaceholderText(/^password$/i),
      confirmPasswordInput: screen.getByPlaceholderText(/^confirm password$/i),
      registerButton: screen.getByRole("button", { name: /register/i }),
      loginLink: screen.getByRole("link", { name: /login/i }),
      homeLink: screen.getByRole("link", { name: /home/i }),
    };
  };

  it("should render the register form correctly", () => {
    const elements = renderComponent();
    Object.values(elements).forEach((element) => expect(element).toBeInTheDocument());
  });

  it("should show error message if fields are empty and when passwords don't match", async () => {
    const { registerButton } = renderComponent();

    const user = userEvent.setup();

    await user.click(registerButton);

    for (const field of ["username", "email", "^password", "confirm password"]) {
      const regex = new RegExp(`${field}.*required`, "i");
      expect(screen.getByText(regex)).toBeInTheDocument();
    }

    await user.type(screen.getByPlaceholderText(/^password$/i), "12345");
    await user.type(screen.getByPlaceholderText(/confirm password$/i), "123456");

    expect(screen.getByText(/don't match/)).toBeInTheDocument();
  });

  it("should register user when all fields are filled and register buttons is clicked", async () => {
    const { nameInput, emailInput, passwordInput, confirmPasswordInput, registerButton } = renderComponent();

    const user = userEvent.setup();

    await user.type(nameInput, "test-name");
    await user.type(emailInput, "test-email@example.com");
    await user.type(passwordInput, "12345");
    await user.type(confirmPasswordInput, "12345");

    await user.click(registerButton);

    expect(screen.getByText(/register successful/i)).toBeInTheDocument();
  });

  it("should show error message if user already exists", async () => {
    const { nameInput, emailInput, passwordInput, confirmPasswordInput, registerButton } = renderComponent();

    const user = userEvent.setup();

    await user.type(nameInput, "test-user-1");
    await user.type(emailInput, "test-user-1@example.com");
    await user.type(passwordInput, "12345");
    await user.type(confirmPasswordInput, "12345");

    await user.click(registerButton);

    expect(screen.getByText(/already exists/i)).toBeInTheDocument();
  });

  it("should redirect to login page if login link is clicked", async () => {
    const { loginLink } = renderComponent();

    const user = userEvent.setup();

    await user.click(loginLink);

    expect(window.location.pathname).toBe("/login");
  });

  it("should redirect to home page if home link is clicked", async () => {
    const { homeLink } = renderComponent();

    const user = userEvent.setup();

    await user.click(homeLink);

    expect(window.location.pathname).toBe("/");
  });
});
