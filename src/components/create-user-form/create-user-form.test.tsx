import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import * as auth from "react-firebase-hooks/auth";
import {
    CREATE_USER_FORM_CLEAR_STATE,
} from "../../services/actions";
import * as createUserActions from "../../services/actions/create-user-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CreateUserForm from "./create-user-form";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockStore = configureMockStore([thunk]);
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");
const setCreateUserFormValueSpy = jest
    .spyOn(createUserActions, 'setCreateUserFormValue');

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn().mockReturnValue('mock'),
    createUserWithEmailAndPassword: jest.fn().mockReturnValue(Promise.resolve()),
}));

const state = (
    email: string,
    password: string,
    repeatPassword: string,
    error: string
) => ({
  createUserForm: {
    data: {
      email,
      password,
      repeatPassword,
    },
    error,
  },
});

describe("CreateUserFrom", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useAuthStateSpy.mockReturnValue([{ uid: userUID }, false, undefined] as any);
  });

  it("renders component", () => {
    const store = mockStore(state('', '', '', ''));

    render(
      <Provider store={store}>
        <StaticRouter>
          <CreateUserForm />
        </StaticRouter>
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it(`renders component with correct values in edit form inputs,
  correct buttons and handlers`, () => {
    const name = 'userName';
    const password = 'password';
    const repeatPassword = password;
    const store = mockStore(state(name, password, repeatPassword, ''));

    render(
      <Provider store={store}>
        <StaticRouter>
          <CreateUserForm />
        </StaticRouter>
      </Provider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Регистрация:");

    expect(screen.getByLabelText("E-mail:")).toHaveValue(name);
    expect(screen.getByLabelText("E-mail:")).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText("E-mail:")).toHaveAttribute('minLength', "3");

    expect(screen.getByLabelText("Пароль:")).toHaveValue(password);
    expect(screen.getByLabelText("Пароль:")).toBeRequired();
    expect(screen.getByLabelText("Пароль:")).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText("Пароль:")).toHaveAttribute('minLength', "6");

    expect(screen.getByLabelText("Повторите пароль:")).toHaveValue(repeatPassword); 
    expect(screen.getByLabelText("Повторите пароль:")).toBeRequired();
    expect(screen.getByLabelText("Повторите пароль:")).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText("Повторите пароль:")).toHaveAttribute('minLength', "6"); 

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("Очистить форму")).toHaveAttribute(
        "type",
        "button"
      );
    expect(screen.getByText("Создать")).toHaveAttribute("type", "submit");

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
      type: CREATE_USER_FORM_CLEAR_STATE,
    });

    const submitButton = screen.getByRole("button", { name: "Создать" });
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenLastCalledWith('mock', name, password);

    const resetButton = screen.getByRole("button", { name: "Очистить форму" });
    userEvent.click(resetButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      type: CREATE_USER_FORM_CLEAR_STATE,
    });

    const passwordInput = screen.getByLabelText("Пароль:");
    userEvent.paste(passwordInput, "edited");
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
    expect(setCreateUserFormValueSpy).toHaveBeenCalledTimes(1);
    expect(setCreateUserFormValueSpy).toHaveBeenLastCalledWith({
      field: "password",
      value: `${password}edited`,
    });
  });


  it(`renders component with disabled submit button and error message
  if repeat password not match`, () => {
    const name = 'userName';
    const password = 'password';
    const repeatPassword = `diff${password}`;
    const store = mockStore(state(name, password, repeatPassword, ''));

    render(
      <Provider store={store}>
        <StaticRouter>
          <CreateUserForm />
        </StaticRouter>
      </Provider>
    );

    expect(screen.getByRole("button", { name: "Создать" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Очистить форму" }))
        .not.toBeDisabled();
    expect(
        screen.getByText(/Пароли не совпадают/i)
        ).toBeInTheDocument();
  });

  it(`renders component with error message 
  if variable error is true`, () => {
    const name = 'userName';
    const password = 'password';
    const repeatPassword = password;
    const errorMessage = 'error message';
    const store = mockStore(state(name, password, repeatPassword, errorMessage));

    render(
      <Provider store={store}>
        <StaticRouter>
            <CreateUserForm />
        </StaticRouter>
      </Provider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
