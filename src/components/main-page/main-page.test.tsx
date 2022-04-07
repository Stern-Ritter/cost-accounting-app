import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as auth from "react-firebase-hooks/auth";
import MainPage from "./main-page";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";
const userEmail = "test@mail.ru";
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

describe("Main page", () => {
  beforeAll(() => {
    useAuthStateSpy
        .mockReturnValue([{ uid: userUID, email: userEmail }, false, undefined] as any);
  });

  it("render component", () => {
    render(<MainPage />);
    expect(screen.getByText(/приложение учета ваших расходов/i))
        .toBeInTheDocument();
    expect(screen.getByText(/добро пожаловать.*test@mail.ru/i))
        .toBeInTheDocument();
  });
});
