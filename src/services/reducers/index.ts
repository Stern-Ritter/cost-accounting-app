import { combineReducers } from "redux";
import { categoryFormReducer } from "./settings-from";
import { transactionFormReducer } from "./expenses-form";
import { expensesReducer } from "./expenses";

export const rootReducer = combineReducers({
  categoryForm: categoryFormReducer,
  trasnactionForm: transactionFormReducer,
  expenses: expensesReducer,
});
