import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import * as auth from "react-firebase-hooks/auth";
import Analytics from "./analytics";
import Transaction from "../../model/transaction/Transaction";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockStore = configureMockStore([thunk]);
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

const firstDate = 1647898589153;
const secondDate = 1647998589153;
const thirdDate = 1648998589153;

const transaction = [
  {
    eventDate: firstDate,
    category: "Car",
    subcategory: "Benzine",
    amount: 1000,
  },
  {
    eventDate: secondDate,
    category: "Computer",
    subcategory: "Internet",
    amount: 600,
  },
  {
    eventDate: thirdDate,
    category: "Food",
    subcategory: "Fruit",
    amount: 400,
  },
];

const state = (data: Transaction[], startDate: Date, endDate: Date) => ({
  expenses: {
    transactions: {
      data,
    },
    filters: {
      startDate,
      endDate,
    },
  },
});

describe("Analytics", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useAuthStateSpy.mockReturnValue([
      { uid: userUID },
      false,
      undefined,
    ] as any);
  });

  it("renders component", () => {
    const store = mockStore(
      state(
        transaction.map((el) => new Transaction(el)),
        new Date(firstDate),
        new Date(thirdDate)
      )
    );

    render(
      <Provider store={store}>
        <StaticRouter>
          <Analytics />
        </StaticRouter>
      </Provider>
    );
    expect(
      screen.getByRole("heading", { name: "Расходы:" })
    ).toBeInTheDocument();
  });

  it("renders component with correct links", () => {
    const store = mockStore(
      state(
        transaction.map((el) => new Transaction(el)),
        new Date(firstDate),
        new Date(thirdDate)
      )
    );

    render(
      <Provider store={store}>
        <StaticRouter>
          <Analytics />
        </StaticRouter>
      </Provider>
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Таблица" })).toHaveAttribute(
      "href",
      "/analytics/table"
    );
    expect(
      screen.getByRole("link", { name: "Круговая диаграмма" })
    ).toHaveAttribute("href", "/analytics/chart");
  });
});
