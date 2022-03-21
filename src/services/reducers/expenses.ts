import Category from "../../model/category/Category";
import Transaction from "../../model/transaction/Transaction";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  GET_EXPENSES,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILED,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  CREATE_CATEGORY_CLEAR_STATUS,
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILED,
  CREATE_TRANSACTION_CLEAR_STATUS,
} from "../actions";

type IGET_CATEGORIES = {
  type: "GET_CATEGORIES";
};

type IGET_CATEGORIES_SUCCESS = {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Category[];
};

type IGET_CATEGORIES_FAILED = {
  type: "GET_CATEGORIES_FAILED";
};

type IGET_EXPENSES = {
  type: "GET_EXPENSES";
};

type IGET_EXPENSES_SUCCESS = {
  type: "GET_EXPENSES_SUCCESS";
  payload: Transaction[];
};

type IGET_EXPENSES_FAILED = {
  type: "GET_EXPENSES_FAILED";
};

type ICREATE_CATEGORY = {
  type: "CREATE_CATEGORY";
};

type ICREATE_CATEGORY_SUCCESS = {
  type: "CREATE_CATEGORY_SUCCESS";
  payload: Category;
};

type ICREATE_CATEGORY_FAILED = {
  type: "CREATE_CATEGORY_FAILED";
};

type ICREATE_CATEGORY_CLEAR_STATUS = {
  type: "CREATE_CATEGORY_CLEAR_STATUS";
};

type ICREATE_TRANSACTION = {
  type: "CREATE_TRANSACTION";
};

type ICREATE_TRANSACTION_SUCCESS = {
  type: "CREATE_TRANSACTION_SUCCESS";
  payload: Transaction;
};

type ICREATE_TRANSACTION_FAILED = {
  type: "CREATE_TRANSACTION_FAILED";
};

type ICREATE_TRANSACTION_CLEAR_STATUS = {
  type: "CREATE_TRANSACTION_CLEAR_STATUS";
};

type EXPENSES_ACTION =
  | IGET_CATEGORIES
  | IGET_CATEGORIES_SUCCESS
  | IGET_CATEGORIES_FAILED
  | IGET_EXPENSES
  | IGET_EXPENSES_SUCCESS
  | IGET_EXPENSES_FAILED
  | ICREATE_CATEGORY
  | ICREATE_CATEGORY_SUCCESS
  | ICREATE_CATEGORY_FAILED
  | ICREATE_CATEGORY_CLEAR_STATUS
  | ICREATE_TRANSACTION
  | ICREATE_TRANSACTION_SUCCESS
  | ICREATE_TRANSACTION_FAILED
  | ICREATE_TRANSACTION_CLEAR_STATUS;

const expensesInitialState = {
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
  createCategoryRequest: false,
  createCategoryFailed: false,
  createTransactionRequest: false,
  createTransactionFailed: false,
};

const expensesReducer = (
  state = expensesInitialState,
  action: EXPENSES_ACTION
) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          hasError: false,
        },
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          data: action.payload.reverse(),
        },
      };
    }
    case GET_CATEGORIES_FAILED: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          hasError: true,
        },
      };
    }
    case GET_EXPENSES: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          loading: true,
          hasError: false,
        },
      };
    }
    case GET_EXPENSES_SUCCESS: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          loading: false,
          data: action.payload.reverse(),
        },
      };
    }
    case GET_EXPENSES_FAILED: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          loading: false,
          hasError: true,
        },
      };
    }
    case CREATE_CATEGORY: {
      return {
        ...state,
        createCategoryRequest: true,
        createCategoryFailed: false,
      };
    }
    case CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        createCategoryRequest: true,
        categories: {
          ...state.categories,
          data: [...state.categories.data, action.payload],
        },
      };
    }
    case CREATE_CATEGORY_FAILED: {
      return {
        ...state,
        createCategoryRequest: false,
        createCategoryFailed: true,
      };
    }
    case CREATE_CATEGORY_CLEAR_STATUS: {
      return {
        ...state,
        createCategoryRequest: false,
        createCategoryFailed: false,
      };
    }
    case CREATE_TRANSACTION: {
      return {
        ...state,
        createTransactionRequest: true,
        createTransactionFailed: false,
      };
    }
    case CREATE_TRANSACTION_SUCCESS: {
      return {
        ...state,
        createTransactionRequest: false,
        transactions: {
          ...state.transactions,
          data: [...state.transactions.data, action.payload],
        },
      };
    }
    case CREATE_TRANSACTION_FAILED: {
      return {
        ...state,
        createTransactionRequest: false,
        createTransactionFailed: true,
      };
    }
    case CREATE_TRANSACTION_CLEAR_STATUS: {
      return {
        ...state,
        createTransactionRequest: false,
        createTransactionFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { expensesInitialState, expensesReducer };
