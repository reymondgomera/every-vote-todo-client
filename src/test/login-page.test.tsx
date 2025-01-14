import { render, screen } from "@testing-library/react";

import AppProvider from "@/components/provider/app-provider";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/pages/login/login-page";
import { BrowserRouter } from "react-router";

describe("Login Page", () => {
  const renderComponent = () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AppProvider>,
    );

    return {
      formTitle: screen.getByRole("heading", { name: /login/i }),
      formDescription: screen.getByText(/access your everyvote todo account/i),
      emailInput: screen.getByPlaceholderText(/email/i),
      passwordInput: screen.getByPlaceholderText(/password/i),
      loginButton: screen.getByRole("button", { name: /login/i }),
      registerlink: screen.getByRole("link", { name: /register/i }),
      homeLink: screen.getByRole("link", { name: /home/i }),
    };
  };

  it("should render the login form correctly", async () => {
    const elements = renderComponent();
    Object.values(elements).forEach((element) => expect(element).toBeInTheDocument());
  });

  it("should show error message if fields are empty", async () => {
    const { loginButton } = renderComponent();

    const user = userEvent.setup();

    await user.click(loginButton);

    for (const field of ["email", "password"]) {
      const regex = new RegExp(`${field}.*required`, "i");
      expect(screen.getByText(regex)).toBeInTheDocument();
    }
  });

  it("should login user when all fields are filled and login buttons is clicked", async () => {
    const { emailInput, passwordInput, loginButton } = renderComponent();

    const user = userEvent.setup();

    await user.type(emailInput, "test-user-1@example.com");
    await user.type(passwordInput, "12345");

    await user.click(loginButton);

    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });

  it("should show error message if user enter non-existing email or incorrect password", async () => {
    const { emailInput, passwordInput, loginButton } = renderComponent();

    const user = userEvent.setup();

    await user.type(emailInput, "test-user-0@example.com"); //* enter  non-existing email
    await user.type(passwordInput, "12345"); //* enter correct password

    await user.click(loginButton);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();

    await user.clear(emailInput);
    await user.type(emailInput, "test-user-1@example.com");
    await user.type(passwordInput, "123456");

    await user.click(loginButton);

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("should redirect to register page if register link is clicked", async () => {
    const { registerlink } = renderComponent();

    const user = userEvent.setup();

    await user.click(registerlink);

    expect(window.location.pathname).toBe("/register");
  });

  it("should redirect to home page if home link is clicked", async () => {
    const { homeLink } = renderComponent();

    const user = userEvent.setup();

    await user.click(homeLink);

    expect(window.location.pathname).toBe("/");
  });
});
