import { RouteComponentProps } from "react-router-dom";
import { categoryStorage, transactionStorage } from "../../model/storage";

import Category from "../../model/category/Category";
import Transaction from "../../model/transaction/Transaction";
import { CATEGORY_FORM_CLEAR_STATE } from "./settings-form";
import { TRANSACTION_FORM_CLEAR_STATE } from "./expenses-form";
import { AppDispatch } from "../store/store";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";

export const GET_EXPENSES = "GET_EXPENSES";
export const GET_EXPENSES_SUCCESS = "GET_EXPENSES_SUCCESS";
export const GET_EXPENSES_FAILED = "GET_EXPENSES_FAILED";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILED = "CREATE_CATEGORY_FAILED";

export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const CREATE_TRANSACTION_FAILED = "CREATE_TRANSACTION_FAILED";

export function getCategories() {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_CATEGORIES });
    try {
      const categories: Category[] | null = await categoryStorage.getAll();
      if (categories !== null) {
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: categories });
      } else {
        dispatch({ type: GET_CATEGORIES_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_CATEGORIES_FAILED });
    }
  };
}

export function getExpenses() {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_EXPENSES });
    try {
      const expenses: Transaction[] | null = await transactionStorage.getAll();
      if (expenses !== null) {
        dispatch({ type: GET_EXPENSES_SUCCESS, payload: expenses });
      } else {
        dispatch({ type: GET_EXPENSES_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_EXPENSES_FAILED });
    }
  };
}

export function createCategory(
  category: Category,
  history: RouteComponentProps["history"]
) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: CREATE_CATEGORY });
    try {
      const id = await categoryStorage.create(category);
      if (id !== null) {
        category.id = id;
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: category });
        dispatch({ type: CATEGORY_FORM_CLEAR_STATE });
        history.push({ pathname: "/" });
      } else {
        dispatch({ type: CREATE_CATEGORY_FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_CATEGORY_FAILED });
    }
  };
}

export function createTransaction(
  transaction: Transaction,
  history: RouteComponentProps["history"]
) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: CREATE_TRANSACTION });
    try {
      const id = await transactionStorage.create(transaction);
      if (id !== null) {
        transaction.id = id;
        dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: transaction });
        dispatch({ type: TRANSACTION_FORM_CLEAR_STATE });
        history.push({ pathname: "/" });
      } else {
        dispatch({ type: CREATE_TRANSACTION_FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_TRANSACTION_FAILED });
    }
  };
}
