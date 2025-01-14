import AppProvider from "@/components/provider/app-provider";
import LandingPage from "@/pages/root/landing-page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";

describe("Landing page", () => {
  const renderComponent = () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </AppProvider>,
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  it("should render the landing page correctly", () => {
    const title = screen.getByRole("heading", { name: /EveryVote Todo/i });
    const description = screen.getByText(/organize, prioritize, and accomplish/i);
    const loginLink = screen.getByRole("link", { name: /login/i });
    const registerLink = screen.getByRole("link", { name: /register/i });

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("should redirect to login page if login link is clicked", async () => {
    const user = userEvent.setup();

    const loginLink = screen.getByRole("link", { name: /login/i });

    await user.click(loginLink);

    expect(window.location.pathname).toBe("/login");
  });

  it("should redirect to register page if register link is clicked", async () => {
    const user = userEvent.setup();

    const registerLink = screen.getByRole("link", { name: /register/i });

    await user.click(registerLink);

    expect(window.location.pathname).toBe("/register");
  });

  it("should toggle theme between light and dark theme when theme buttoon is toggled", async () => {
    const themeToggleButton = screen.getByTestId("theme-toggle-button");

    await userEvent.click(themeToggleButton);

    const darkButton = await screen.findByTestId("dark-theme-button");

    await userEvent.click(darkButton);

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await userEvent.click(themeToggleButton);

    const lightButton = await screen.findByTestId("light-theme-button");

    await userEvent.click(lightButton);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
