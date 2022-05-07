import {
  TRANSACTION_FORM_SET_VALUE,
  TRANSACTION_FORM_CLEAR_STATE,
} from "../actions";

import { ITRANSACTION_FORM_SET_VALUE } from "../actions/expenses-form";

type ITRANSACTION_FORM_CLEAR_STATE = {
  type: "TRANSACTION_FORM_CLEAR_STATE";
};

type TRANSACTION_FORM_ACTION =
  | ITRANSACTION_FORM_SET_VALUE
  | ITRANSACTION_FORM_CLEAR_STATE;

const transactionFormInitialState = {
  data: {
    id: "",
    eventDate: Date.now(),
    category: "",
    subcategory: "",
    amount: 0,
  },
};

const transactionFormReducer = (
  state = transactionFormInitialState,
  action: TRANSACTION_FORM_ACTION
) => {
  switch (action.type) {
    case TRANSACTION_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case TRANSACTION_FORM_CLEAR_STATE: {
      return {
        ...transactionFormInitialState,
      };
    }
    default: {
      return state;
    }
  }
};

export { transactionFormInitialState, transactionFormReducer };
