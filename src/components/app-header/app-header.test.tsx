import React from "react";
import { StaticRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppHeader from "./app-header";

describe("AppHeader", () => {
  beforeEach(() => {
    render(
      <StaticRouter>
        <AppHeader />
      </StaticRouter>
    );
  });
  it("renders component", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  it("renders component with correct count of links", () => {
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });
  it("renders component with home page link", () => {
    expect(screen.getByText("Учет расходов")).toHaveAttribute("href", "/");
  });
  it("renders component with expenses page link", () => {
    expect(screen.getByText("Расходы")).toHaveAttribute("href", "/expenses");
  });
  it("renders component with analytics page link", () => {
    expect(screen.getByText("Аналитика")).toHaveAttribute("href", "/analytics");
  });
  it("renders component with settings page link", () => {
    expect(screen.getByText("Настройки")).toHaveAttribute("href", "/settings");
  });
  it("renders component with about page link", () => {
    expect(screen.getByText("О проекте")).toHaveAttribute("href", "/about");
  });
});
