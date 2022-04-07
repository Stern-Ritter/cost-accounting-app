import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as auth from "react-firebase-hooks/auth";
import About from "./about";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

describe("About", () => {
  beforeAll(() => {
    useAuthStateSpy.mockReturnValue([{ uid: userUID }, false, undefined] as any);
  });

  it("render component", () => {
    render(<About />);
    expect(screen.getByText("О приложении")).toBeInTheDocument();
    expect(screen.getByText(/приложение.*позволяет.*/i)).toBeInTheDocument();
  });
});
