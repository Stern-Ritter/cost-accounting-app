import { combineReducers } from "redux";
import { categoryFormReducer } from "./settings-from";
import { transactionFormReducer } from "./expenses-form";
import { expensesReducer } from "./expenses";
import { createUserReducer } from "./create-user-form";
import { authenticationReducer } from "./authentication-form";

export const rootReducer = combineReducers({
  categoryForm: categoryFormReducer,
  transactionForm: transactionFormReducer,
  createUserForm: createUserReducer,
  authenticationForm: authenticationReducer,
  expenses: expensesReducer,
});
