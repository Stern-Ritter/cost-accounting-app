import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import ExpensesForm from "../expenses-form/expenses-form";
import * as expensesFormActions from "../../services/actions/expenses-form";
import * as expensesActions from "../../services/actions/expenses";
import {
  TRANSACTION_FORM_CLEAR_STATE,
  CREATE_TRANSACTION_CLEAR_STATUS,
} from "../../services/actions";
import Transaction from "../../model/transaction/Transaction";

const transaction = {
  id: "",
  eventDate: 1648870661924,
  category: "Category name",
  subcategory: "First subcategory",
  amount: 1000,
};

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockStore = configureMockStore([thunk]);

const setTrasnactionFormSpy = jest.spyOn(
  expensesFormActions,
  "setTrasnactionFormValue"
);
const createTransactionSpy = jest.spyOn(expensesActions, "createTransaction");

describe("ExpensesForm", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it("renders component", () => {
    const store = mockStore({
      transactionForm: {
        data: {
          id: "",
          eventDate: Date.now(),
          category: "",
          subcategory: "",
          amount: 0,
        },
      },
      expenses: {
        categories: {
          data: [],
        },
        createTransactionRequest: false,
        createTransactionFailed: false,
      },
    });
    render(
      <Provider store={store}>
        <ExpensesForm />
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it(`renders component with correct values in edit form inputs,
  correct buttons and handlers`, () => {
    const store = mockStore({
      transactionForm: {
        data: transaction,
      },
      expenses: {
        categories: {
          data: [],
        },
        createTransactionRequest: false,
        createTransactionFailed: false,
      },
    });

    render(
      <Provider store={store}>
        <ExpensesForm />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Создать транзакцию:"
    );

    expect(screen.getByRole("combobox", { name: "Категория:" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Подкатегория:" })).toBeInTheDocument();
    expect(screen.getByTestId("date")).toHaveAttribute(
      "value",
      String(transaction.eventDate)
    );
    expect(screen.getByRole("spinbutton", { name: "Сумма:" }))
    .toHaveAttribute('value', "1000");

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("Очистить форму")).toHaveAttribute(
      "type",
      "button"
    );
    expect(screen.getByText("Создать")).toHaveAttribute("type", "submit");

    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, { type: TRANSACTION_FORM_CLEAR_STATE });
    expect(mockDispatchFn).toHaveBeenNthCalledWith(2, { type: CREATE_TRANSACTION_CLEAR_STATUS });

    const submitButton = screen.getByRole("button", { name: "Создать" });
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
    expect(createTransactionSpy).toHaveBeenCalledTimes(1);
    expect(createTransactionSpy).toHaveBeenLastCalledWith(new Transaction(transaction));

    const resetButton = screen.getByRole("button", { name: "Очистить форму" });
    expect(resetButton).not.toBeDisabled();
    userEvent.click(resetButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(4);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      type: TRANSACTION_FORM_CLEAR_STATE,
    });

    const input = screen.getByRole("spinbutton", { name: "Сумма:" });
    userEvent.paste(input, "00");
    expect(mockDispatchFn).toHaveBeenCalledTimes(5);
    expect(setTrasnactionFormSpy).toHaveBeenCalledTimes(1);
    expect(setTrasnactionFormSpy).toHaveBeenLastCalledWith({
      field: "amount",
      value: `${transaction.amount}00`,
    });
  });
});
