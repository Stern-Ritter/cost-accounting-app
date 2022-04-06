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
import SettingsForm from "./settings-from";
import * as settingFormActions from "../../services/actions/settings-form";
import * as expensesActions from "../../services/actions/expenses";
import {
  CATEGORY_FORM_CLEAR_STATE,
  CREATE_CATEGORY_CLEAR_STATUS,
} from "../../services/actions";
import Category from "../../model/category/Category";

const userUID = "COmVnvWQZXNFr3bRNw0KPQGroGo2";
const category = {
  id: "",
  name: "Category name",
  subcategories: ["First subcategory", "Second subcategory"],
  description: "Category description",
};

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockStore = configureMockStore([thunk]);
const useAuthStateSpy = jest.spyOn(auth, "useAuthState");

const setCategoryFormSpy = jest.spyOn(
  settingFormActions,
  "setCategoryFormValue"
);
const createCategorySpy = jest.spyOn(expensesActions, "createCategory");

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

describe("SettingsForm", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useAuthStateSpy
      .mockReturnValue([{ uid: userUID }, false, undefined] as any);
  });

  it("renders component", () => {
    const store = mockStore({
      categoryForm: {
        data: {
          id: "",
          name: "",
          subcategories: [],
          description: "",
        },
      },
      expenses: {
        createCategoryRequest: false,
        createCategoryFailed: false,
      },
    });
    render(
      <Provider store={store}>
        <StaticRouter>
          <SettingsForm />
        </StaticRouter>
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it(`renders component with correct values in edit form inputs,
  correct buttons and handlers`, () => {
    const store = mockStore({
      categoryForm: {
        data: category,
      },
      expenses: {
        createCategoryRequest: false,
        createCategoryFailed: false,
      },
    });

    render(
      <Provider store={store}>
        <StaticRouter>
          <SettingsForm />
        </StaticRouter>
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Создать категорию:");
    expect(screen.getByRole("textbox", { name: "Категория:" })).toHaveValue(
      category.name
    );
    expect(screen.getByRole("textbox", { name: "Категория:" })).toBeRequired();
    expect(
      screen.getByRole("textbox", { name: "Подкатегории:" })
    ).toHaveAttribute("placeholder", "Нажмите Enter чтобы добавить");
    expect(screen.getAllByTestId("value")).toHaveLength(2);
    expect(screen.getByRole("textbox", { name: "Описание:" })).toHaveValue(
      category.description
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("Очистить форму")).toHaveAttribute(
      "type",
      "button"
    );
    expect(screen.getByText("Создать")).toHaveAttribute("type", "submit");

    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
      type: CATEGORY_FORM_CLEAR_STATE,
    });
    expect(mockDispatchFn).toHaveBeenNthCalledWith(2, {
      type: CREATE_CATEGORY_CLEAR_STATUS,
    });

    const submitButton = screen.getByRole("button", { name: "Создать" });
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
    expect(createCategorySpy).toHaveBeenCalledTimes(1);
    expect(createCategorySpy).toHaveBeenLastCalledWith(userUID, new Category(category));

    const resetButton = screen.getByRole("button", { name: "Очистить форму" });
    expect(resetButton).not.toBeDisabled();
    userEvent.click(resetButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(4);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      type: CATEGORY_FORM_CLEAR_STATE,
    });

    const input = screen.getByRole("textbox", { name: "Категория:" });
    userEvent.paste(input, "edited");
    expect(mockDispatchFn).toHaveBeenCalledTimes(5);
    expect(setCategoryFormSpy).toHaveBeenCalledTimes(1);
    expect(setCategoryFormSpy).toHaveBeenLastCalledWith({
      field: "name",
      value: `${category.name}edited`,
    });
  });

  it(`renders component with disabled buttons 
  if variable createCategoryRequest is true`, () => {
    const store = mockStore({
      categoryForm: {
        data: category,
      },
      expenses: {
        createCategoryRequest: true,
        createCategoryFailed: false,
      },
    });

    render(
      <Provider store={store}>
        <StaticRouter>
          <SettingsForm />
        </StaticRouter>
      </Provider>
    );

    expect(screen.getByRole("button", { name: "Создать" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Очистить форму" })
    ).toBeDisabled();
  });

  it(`renders component with error message 
  if variable createCategoryFailed is true`, () => {
    const store = mockStore({
      categoryForm: {
        data: category,
      },
      expenses: {
        createCategoryRequest: false,
        createCategoryFailed: true,
      },
    });

    render(
      <Provider store={store}>
        <StaticRouter>
          <SettingsForm />
        </StaticRouter>
      </Provider>
    );

    expect(
      screen.getByText("При создании возникла ошибка... Попробуйте позже.")
    ).toBeInTheDocument();
  });
});
