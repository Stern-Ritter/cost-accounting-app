import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createHashHistory } from "history";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import * as auth from "react-firebase-hooks/auth";
import Category from "../../model/category/Category";
import Transaction from "../../model/transaction/Transaction";
import App from "./app";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";
const userEmail = "test@mail.ru";

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockStore = configureMockStore([thunk]);
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

const state = () => ({
  categoryForm: {
    data: {
      id: "",
      name: "",
      subcategories: [] as string[],
      description: "",
    },
  },
  transactionForm: {
    data: {
      id: "",
      eventDate: Date.now(),
      category: "",
      subcategory: "",
      amount: 0,
    },
  },
  createUserForm: {
    data: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    error: "",
  },
  authenticationForm: {
    data: {
      email: "",
      password: "",
    },
    error: "",
  },
  expenses: {
    categories: {
      loading: false,
      hasError: false,
      data: [] as Category[],
    },
    transactions: {
      loading: false,
      hasError: false,
      data: [] as Transaction[],
    },
    filters: {
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
    },
    createCategoryRequest: false,
    createCategoryFailed: false,
    createTransactionRequest: false,
    createTransactionFailed: false,
  },
});

describe("App", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it("render component MainPage component for path '/'", () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(
      screen.getByText(/добро пожаловать.*test@mail.ru/i)
    ).toBeInTheDocument();
  });

  it("render component ExpensesForm component for path '/expenses'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/expenses");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Создать транзакцию:"
    );
  });

  it("render component Analytics component for path '/analytics/table'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/analytics/table");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "Расходы:" })
    ).toBeInTheDocument();
  });

  it("render component SettingsForm component for path '/settings'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/settings");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Создать категорию:");
  });

  it("render component About component for path '/about'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/about");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("О приложении")).toBeInTheDocument();
    expect(screen.getByText(/приложение.*позволяет.*/i)).toBeInTheDocument();
  });

  it("render component AuthenticationForm component for path '/auth'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/auth");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Войти:");
  });

  it("render component CreateUserForm component for path '/reg'", async () => {
    useAuthStateSpy.mockReturnValue([
      { uid: userUID, email: userEmail },
      false,
      undefined,
    ] as any);
    const store = mockStore(state());
    const history = createHashHistory({ basename: "/" });
    history.push("/reg");

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Регистрация:");
  });
});
