import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MultipleInput from "./multiple-input";

const mockOnValueChangeFn = jest.fn();

describe("MultipleInput", () => {
  it("renders component", () => {
    render(
      <MultipleInput
        name="field"
        value={["first", "second"]}
        placeholder="Placeholder text"
        onValueChange={mockOnValueChangeFn}
      />
    );
    expect(screen.getByTestId("value-input")).toBeInTheDocument();
  });
  it("renders component with value", () => {
    render(
      <MultipleInput
        name="field"
        value={["first", "second"]}
        placeholder="Placeholder text"
        onValueChange={mockOnValueChangeFn}
      />
    );
    expect(screen.getAllByTestId("value")).toHaveLength(2);
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });
  it("renders component with value delete button", () => {
    render(
      <MultipleInput
        name="field"
        value={["first"]}
        placeholder="Placeholder text"
        onValueChange={mockOnValueChangeFn}
      />
    );
    const button = screen.getByText("x");
    userEvent.click(button);
    expect(mockOnValueChangeFn).toHaveBeenCalledTimes(1);
    expect(mockOnValueChangeFn).toHaveBeenCalledWith({
      field: "field",
      value: [],
    });
  });
  it("renders component with value input", () => {
    render(
      <MultipleInput
        name="field"
        value={["first"]}
        placeholder="Placeholder text"
        onValueChange={mockOnValueChangeFn}
      />
    );
    const input = screen.getByPlaceholderText("Placeholder text");
    userEvent.type(input, "third");
    userEvent.keyboard("{enter}");
    expect(mockOnValueChangeFn).toHaveBeenCalledTimes(1);
    expect(mockOnValueChangeFn).toHaveBeenCalledWith({
      field: "field",
      value: ["first", "third"],
    });
  });
});
