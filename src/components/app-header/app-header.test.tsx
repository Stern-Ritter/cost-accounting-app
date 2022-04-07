import React from "react";
import { StaticRouter } from "react-router";
import * as auth from "react-firebase-hooks/auth";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppHeader from "./app-header";

const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

describe("AppHeader", () => {
  it("renders component with logo link", () => {
    useAuthStateSpy.mockReturnValue([
      { uid: "COmVnvWQZXNFr3bRNw0KPQGroGo2" },
      false,
      undefined,
    ] as any);
    render(
      <StaticRouter>
        <AppHeader />
      </StaticRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Учет расходов")).toHaveAttribute("href", "/");
  });

  it("renders component with correct links for authorized users", () => {
    useAuthStateSpy.mockReturnValue([
      { uid: "COmVnvWQZXNFr3bRNw0KPQGroGo2" },
      false,
      undefined,
    ] as any);
    render(
      <StaticRouter>
        <AppHeader />
      </StaticRouter>
    );
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getByText("Учет расходов")).toHaveAttribute("href", "/");
    expect(screen.getByText("Расходы")).toHaveAttribute("href", "/expenses");
    expect(screen.getByText("Аналитика")).toHaveAttribute(
      "href",
      "/analytics/table"
    );
    expect(screen.getByText("Настройки")).toHaveAttribute("href", "/settings");
    expect(screen.getByText("О проекте")).toHaveAttribute("href", "/about");
  });

  it("renders component with correct logout button for authorized users", () => {
    useAuthStateSpy.mockReturnValue([
      { uid: "COmVnvWQZXNFr3bRNw0KPQGroGo2" },
      false,
      undefined,
    ] as any);
    render(
      <StaticRouter>
        <AppHeader />
      </StaticRouter>
    );

    const logoutButton = screen.getByRole("button", { name: "Выйти" });
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders component with correct links for unauthorized users", () => {
    useAuthStateSpy.mockReturnValue([null, false, undefined] as any);
    render(
      <StaticRouter>
        <AppHeader />
      </StaticRouter>
    );
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByText("Войти")).toHaveAttribute("href", "/auth");
    expect(screen.getByText("Регистрация")).toHaveAttribute("href", "/reg");
  });
});
